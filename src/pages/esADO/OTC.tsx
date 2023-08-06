import { useAtomValue } from "jotai";
import { esADOState } from "../../state";
import {
  formatEtherToFixed,
  formatEtherToNumber
} from "../../utils/number.tsx";
import useWrappedWriteContract from "../../hooks/useWrappedWriteContract.ts";
import { CONTRACT_ADDRESSES } from "../../constants.ts";
import esADOSwapABI from "../../utils/ABIs/esADOSwapABI.ts";
import { useState } from "react";
import RadixSlider from "../../components/RadixSlider.tsx";
import { parseEther } from "viem";

const EsADOOTC = () => {
  const { balance } = useAtomValue(esADOState);

  const [amount, setAmount] = useState(0n);

  const { write, isLoadingWrite } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.esADOOTC,
    abi: esADOSwapABI,
    functionName: "swap",
    args: [amount]
  });

  return (
    <div className={"card p-2 stack gap-2"}>
      <h3>OTC</h3>
      <p className={"flex justify-between"}>
        <span>OTC esADO rate</span>
        <span>10%</span>
      </p>

      <p className={"flex justify-between items-center"}>
        <span>OTC ADO available</span>
        <span>{formatEtherToFixed(balance)}&nbsp;</span>
      </p>
      <div className={"flex justify-between gap-4 items-center"}>
        <div className={"flex-1"}>
          <RadixSlider
            max={formatEtherToNumber(balance)}
            onValueChange={([value]) => {
              setAmount(parseEther(String(value)));
            }}
            prefix={`OTC esADO: ${formatEtherToFixed(amount, 2)}`}
          />
        </div>
        <button
          className={"emphasis"}
          disabled={!amount || isLoadingWrite}
          onClick={() => write?.()}
        >
          OTC esADO
        </button>
      </div>
    </div>
  );
};

export default EsADOOTC;
