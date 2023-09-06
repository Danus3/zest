import { useAtomValue } from "jotai";
import { esADOState } from "@src/state";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import useWrappedWriteContract from "@src/hooks/useWrappedWriteContract.ts";
import { CONTRACT_ADDRESSES, ESADO_OTC_RATE } from "@src/constants.ts";
import esADOSwapABI from "@src/utils/ABIs/esADOSwapABI.ts";
import { useState } from "react";
import { ArrowRightIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import Tooltip from "@components/Tooltip.tsx";

const EsADOOTC = () => {
  const { balance } = useAtomValue(esADOState);

  const [ratio, setRatio] = useState(100n);

  const { write, isLoadingWrite } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.esADOOTC,
    abi: esADOSwapABI,
    functionName: "swap",
    args: [(balance * ratio) / 100n]
  });

  return (
    <div className={"card stack gap-2"}>
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
            <span>{ESADO_OTC_RATE * 100}%</span>
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
          <Tooltip text={"% of your balance"}>
            <button
              className={"emphasis px-8"}
              onClick={() => {
                setRatio(ratio === 100n ? 25n : ratio + 25n);
              }}
            >
              {ratio.toString()}%&nbsp;
              <InfoCircledIcon className={"inline-block"} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default EsADOOTC;
