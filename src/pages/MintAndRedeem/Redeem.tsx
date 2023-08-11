import InputWithMax from "@src/components/InputWithMax.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { aUSDState, lstETHState } from "@state";
import { formatEtherToNumber } from "@utils/number.tsx";
import { useState } from "react";
import { parseEther } from "viem";
import { CONTRACT_ADDRESSES, LIQ_PRICE } from "@src/constants.ts";
import ApproveCheck from "@components/ApproveCheck.tsx";
import AUSDABI from "@utils/ABIs/aUSDABI.ts";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import useWrappedWriteContract from "@hooks/useWrappedWriteContract.ts";
import { AdscendoPoolABI } from "@utils/ABIs/AdscendoPoolABI.ts";

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
      <p>Burn aUSD and lstETH to get stETH.</p>
      <p>
        AUSD balance: {formatEtherToNumber(AUSDBalance)}, lstETHBalance:{" "}
        {formatEtherToNumber(lstETHBalance)}
      </p>
      <div className={"my-4"}></div>
      <div className={"flex flex-row justify-between items-center gap-2"}>
        <InputWithMax
          value={String(formatEtherToNumber(aUSDAmount))}
          setValue={value => {
            const parsedValue = parseEther(value);
            setAUSDAmount(parsedValue);
            setLstETHAmount(parsedValue / BigInt(LIQ_PRICE));
          }}
          onMaxClick={() => {
            setAUSDAmount(AUSDBalance);
            setLstETHAmount(AUSDBalance / BigInt(LIQ_PRICE));
          }}
        />
        <PlusCircledIcon />
        <InputWithMax
          value={String(formatEtherToNumber(lstETHAmount))}
          setValue={value => {
            const parsedValue = parseEther(value);
            setLstETHAmount(parsedValue);
            setAUSDAmount(parsedValue * BigInt(LIQ_PRICE));
          }}
          onMaxClick={() => {
            setLstETHAmount(lstETHBalance);
            setAUSDAmount(lstETHBalance * BigInt(LIQ_PRICE));
          }}
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
        {formatEtherToNumber(lstETHAmount)} stETH
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
