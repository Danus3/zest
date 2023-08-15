import React from "react";
import { Address, useAccount, useContractRead } from "wagmi";
import { Abi } from "viem";
import { twMerge } from "tailwind-merge";
import useWrappedWriteContract from "@hooks/useWrappedWriteContract.ts";
import useTabFocused from "@hooks/utils/useTabFocused.ts";
import WrappedButton from "@components/WrappedButton.tsx";

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
  const focused = useTabFocused();

  const {
    data: allowanceData,
    isLoading: isLoadingAllowance
  } = useContractRead<typeof tokenABI, string, bigint>({
    address: token,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, spender],
    enabled: !!address,
    watch: focused
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

  // if (isLoadingAllowance || isLoading) {
  //   return (
  //     <WrappedButton className={twMerge("emphasis", className)} isLoading>
  //       {isLoadingAllowance ? "Loading..." : "Approving..."}
  //     </WrappedButton>
  //   );
  // }
  if (needsIncreaseAllowance) {
    return (
      <WrappedButton
        className={twMerge("emphasis", className)}
        disabled={spendingAmount === 0n}
        isLoading={isLoadingAllowance || isLoading || isLoadingWrite}
        onClick={() => {
          write?.();
        }}
      >
        Approve{tokenName ? ` ${tokenName}` : ""}
      </WrappedButton>
    );
  }
  if (currentAllowance >= spendingAmount) {
    return <>{children}</>;
  }
};

export default ApproveCheck;
