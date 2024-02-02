import ApproveCheck from "@components/ApproveCheck.tsx";
import TickleNumber from "@components/TickleNumber.tsx";
import WrappedButton from "@components/WrappedButton.tsx";
import useGetPythUpdateData from "@hooks/useGetPythUpdateData";
import useWrappedWriteContract from "@hooks/useWrappedWriteContract.ts";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import InputWithMax from "@src/components/InputWithMax.tsx";
import { CONTRACT_ADDRESSES, LIQ_PRICE } from "@src/constants.ts";
import { aUSDState, lstETHState } from "@state";
import { zESTABI } from "@utils/ABIs/ZestABI";
import AUSDABI from "@utils/ABIs/aUSDABI.ts";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import { formatEtherToNumber } from "@utils/number.tsx";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { formatEther, parseEther } from "viem";

const RedeemButton: React.FC<{
  disabled: boolean;
  lstETHAmount: bigint;
  onRedeem: () => void;
}> = ({ disabled, lstETHAmount, onRedeem }) => {
  const {
    data: priceData,
    isFetching,
    isLoading: isPriceDataLoading,
  } = useGetPythUpdateData(lstETHAmount);
  const { write, isLoading } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.zEST,
    abi: zESTABI,
    enabled: !disabled && !!priceData,
    functionName: "redeem",
    args: [lstETHAmount, priceData],
    onTransactionComplete: onRedeem,
  });

  return (
    <WrappedButton
      className={"bg-amber-400 text-black w-full emphasis"}
      isLoading={isLoading || isFetching || isPriceDataLoading}
      disabled={disabled}
      onClick={() => {
        if (write) {
          write();
        }
      }}
    >
      Redeem
    </WrappedButton>
  );
};

const Redeem = () => {
  const { balance: AUSDBalance } = useAtomValue(aUSDState);
  const { balance: lstETHBalance } = useAtomValue(lstETHState);

  const [aUSDAmount, setAUSDAmount] = useState(0n);
  const [lstETHAmount, setLstETHAmount] = useState(0n);

  return (
    <div>
      {/*<p>Burn aUSD and lstETH to get stETH.</p>*/}
      <div>
        <p>Balance</p>
        <div className={"flex flex-row justify-between"}>
          <span>zUSD: {formatEtherToNumber(AUSDBalance)}</span>
          <span>mirrorETH: {formatEtherToNumber(lstETHBalance)}</span>
        </div>
      </div>
      {/*<div className={"my-4"}></div>*/}
      <div className={"flex flex-row justify-between items-center gap-2"}>
        <InputWithMax
          setValue={(value) => {
            const parsedValue = parseEther(value);
            setAUSDAmount(parsedValue);
            setLstETHAmount(parsedValue / BigInt(LIQ_PRICE));
          }}
          maxValue={formatEther(AUSDBalance)}
          value={formatEther(aUSDAmount)}
        />
        <PlusCircledIcon />
        <InputWithMax
          setValue={(value) => {
            const parsedValue = parseEther(value);
            setLstETHAmount(parsedValue);
            setAUSDAmount(parsedValue * BigInt(LIQ_PRICE));
          }}
          maxValue={formatEther(lstETHBalance)}
          value={formatEther(lstETHAmount)}
        />
      </div>
      <div className={"my-8"}></div>
      <p>Redeem</p>
      <div className={"my-2"}></div>
      <div
        className={
          "border-amber-400 border-[1px] rounded-md w-full text-center py-1"
        }
      >
        <TickleNumber
          numberString={String(formatEtherToNumber(lstETHAmount))}
        />{" "}
        ETH
      </div>
      <div className={"my-8"}></div>
      <ApproveCheck
        spender={CONTRACT_ADDRESSES.zEST}
        token={CONTRACT_ADDRESSES.zUSD}
        tokenABI={AUSDABI}
        spendingAmount={aUSDAmount}
        className={"w-full"}
        tokenName={"zUSD"}
      >
        <ApproveCheck
          spender={CONTRACT_ADDRESSES.zEST}
          token={CONTRACT_ADDRESSES.mirrorETH}
          tokenABI={lstETHABI}
          spendingAmount={lstETHAmount}
          className={"w-full"}
          tokenName={"mirrorETH"}
        >
          <RedeemButton
            disabled={
              aUSDAmount === 0n ||
              lstETHAmount === 0n ||
              aUSDAmount > AUSDBalance ||
              lstETHAmount > lstETHBalance
            }
            lstETHAmount={lstETHAmount}
            onRedeem={() => {
              setAUSDAmount(0n);
              setLstETHAmount(0n);
            }}
          />
        </ApproveCheck>
      </ApproveCheck>
    </div>
  );
};

export default Redeem;
