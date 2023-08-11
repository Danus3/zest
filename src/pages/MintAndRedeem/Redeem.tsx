import InputWithMax from "@src/components/InputWithMax.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { aUSDState, lstETHState } from "@state";
import { formatEtherToNumber } from "@utils/number.tsx";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { CONTRACT_ADDRESSES, LIQ_PRICE } from "@src/constants.ts";
import ApproveCheck from "@components/ApproveCheck.tsx";
import AUSDABI from "@utils/ABIs/aUSDABI.ts";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import useWrappedWriteContract from "@hooks/useWrappedWriteContract.ts";
import { AdscendoPoolABI } from "@utils/ABIs/AdscendoPoolABI.ts";
import TickleNumber from "@components/TickleNumber.tsx";

const RedeemButton: React.FC<{
  disabled: boolean;
  lstETHAmount: bigint;
}> = ({ disabled, lstETHAmount }) => {
  const { write } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.adscendoPool,
    abi: AdscendoPoolABI,
    enabled: !disabled,
    functionName: "redeem",
    args: [lstETHAmount]
  });

  return (
    <button
      className={"bg-amber-400 text-black w-full emphasis"}
      disabled={disabled}
      onClick={() => {
        write?.();
      }}
    >
      Redeem
    </button>
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
          <span>aUSD: {formatEtherToNumber(AUSDBalance)}</span>
          <span>lstETH: {formatEtherToNumber(lstETHBalance)}</span>
        </div>
      </div>
      {/*<div className={"my-4"}></div>*/}
      <div className={"flex flex-row justify-between items-center gap-2"}>
        <InputWithMax
          setValue={value => {
            const parsedValue = parseEther(value);
            setAUSDAmount(parsedValue);
            setLstETHAmount(parsedValue / BigInt(LIQ_PRICE));
          }}
          maxValue={formatEther(AUSDBalance)}
          value={formatEther(aUSDAmount)}
        />
        <PlusCircledIcon />
        <InputWithMax
          setValue={value => {
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
        stETH
      </div>
      <div className={"my-8"}></div>
      <ApproveCheck
        spender={CONTRACT_ADDRESSES.adscendoPool}
        token={CONTRACT_ADDRESSES.aUSD}
        tokenABI={AUSDABI}
        spendingAmount={aUSDAmount}
        className={"w-full"}
        tokenName={"aUSD"}
      >
        <ApproveCheck
          spender={CONTRACT_ADDRESSES.adscendoPool}
          token={CONTRACT_ADDRESSES.lstETH}
          tokenABI={lstETHABI}
          spendingAmount={lstETHAmount}
          className={"w-full"}
          tokenName={"lstETH"}
        >
          <RedeemButton
            disabled={
              aUSDAmount === 0n ||
              lstETHAmount === 0n ||
              aUSDAmount > AUSDBalance ||
              lstETHAmount > lstETHBalance
            }
            lstETHAmount={lstETHAmount}
          />
        </ApproveCheck>
      </ApproveCheck>
    </div>
  );
};

export default Redeem;
