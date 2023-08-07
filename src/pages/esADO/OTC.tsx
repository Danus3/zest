import { useAtomValue } from "jotai";
import { esADOState } from "../../state";
import { formatEtherToFixed } from "../../utils/number.tsx";
import useWrappedWriteContract from "../../hooks/useWrappedWriteContract.ts";
import { CONTRACT_ADDRESSES, OTC_RATE } from "../../constants.ts";
import esADOSwapABI from "../../utils/ABIs/esADOSwapABI.ts";
import { useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const EsADOOTC = () => {
  const { balance } = useAtomValue(esADOState);

  const [ratio, setRatio] = useState(25n);

  const { write, isLoadingWrite } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.esADOOTC,
    abi: esADOSwapABI,
    functionName: "swap",
    args: [(balance * ratio) / 100n]
  });

  return (
    <div className={"card p-2 stack gap-2"}>
      <div className={"flexStack justify-between items-center"}>
        <h3>OTC</h3>
        <p>
          Convert esADO into ADO at a rate of 1 esADO{" "}
          <ArrowRightIcon className={"inline"} /> 0.15 ADO
        </p>
      </div>

      <div className={"flex justify-between gap-4 items-center"}>
        <div className={"text-xl"}>
          <p className={"flex gap-4"}>
            <span>OTC esADO rate</span>
            <span>{OTC_RATE * 100}%</span>
          </p>

          <p className={"flex gap-4"}>
            <span>OTC ADO available</span>
            <span>{formatEtherToFixed(balance)}&nbsp;</span>
          </p>
        </div>
        <div className={"self-stretch flex flex-col gap-2"}>
          <button
            className={"emphasis h-16"}
            disabled={!ratio || isLoadingWrite}
            onClick={() => write?.()}
          >
            OTC esADO
          </button>
          <div>
            Amount&nbsp;&nbsp;
            <button
              className={"emphasis px-8"}
              onClick={() => {
                setRatio(ratio === 100n ? 25n : ratio + 25n);
              }}
            >
              {ratio.toString()}%
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsADOOTC;
