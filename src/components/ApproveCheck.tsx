import React from "react";
import { Address, useAccount, useContractRead } from "wagmi";
import { Abi } from "viem";
import { twMerge } from "tailwind-merge";
import useWrappedWriteContract from "@hooks/useWrappedWriteContract.ts";

const ApproveCheck: React.FC<{
  spender: Address;
  token: Address;
  tokenABI: Abi;
  spendingAmount: bigint;
  children: React.ReactNode;
  className?: string;
  tokenName?: string;
}> = ({
  spender,
  token,
  spendingAmount,
  children,
  tokenABI,
  className,
  tokenName
}) => {
  const { address } = useAccount();
  const {
    data: allowanceData,
    isLoading: isLoadingAllowance
  } = useContractRead<typeof tokenABI, string, bigint>({
    address: token,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, spender],
    enabled: !!address,
    watch: true
  });

  const currentAllowance = allowanceData ?? 0n;

  const needsIncreaseAllowance =
    currentAllowance < spendingAmount || currentAllowance === 0n;

  const { write, isLoadingWrite, isLoading } = useWrappedWriteContract({
    address: token,
    abi: tokenABI,
    functionName: "increaseAllowance",
    args: [spender, spendingAmount - currentAllowance],
    enabled: needsIncreaseAllowance && !!address && spendingAmount > 0n
  });

  if (isLoadingAllowance || isLoading) {
    return (
      <button className={twMerge("emphasis", className)} disabled>
        {isLoadingAllowance ? "Loading..." : "Approving..."}
      </button>
    );
  }
  if (needsIncreaseAllowance) {
    return (
      <button
        className={twMerge("emphasis", className)}
        disabled={isLoadingWrite || spendingAmount === 0n}
        onClick={() => {
          write?.();
        }}
      >
        Approve{tokenName ? ` ${tokenName}` : ""}
      </button>
    );
  }
  if (currentAllowance >= spendingAmount) {
    return <>{children}</>;
  }
};

export default ApproveCheck;
