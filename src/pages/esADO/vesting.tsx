import { useContractReads } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import { useEffect, useState } from "react";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import useWrappedWriteContract from "@src/hooks/useWrappedWriteContract.ts";
import RadixSlider from "@src/components/RadixSlider.tsx";
import { ADOState, esADOState } from "@src/state";
import { useAtomValue } from "jotai";
import esADOABI from "@src/utils/ABIs/esADOABI.ts";
import { formatSecondToDHMS } from "@src/utils/time.ts";
import TickleNumber from "@src/components/TickleNumber.tsx";
import Tooltip from "@components/Tooltip.tsx";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const esADOParams = {
  abi: esADOABI,
  address: CONTRACT_ADDRESSES.esADO
};

const ESADOVesting = () => {
  const { balance } = useAtomValue(ADOState);

  const { balance: esADOBalance } = useAtomValue(esADOState);

  const { data: vestingConfigData } = useContractReads({
    contracts: [
      {
        ...esADOParams,
        functionName: "minRedeemRatio"
      },
      {
        ...esADOParams,
        functionName: "maxRedeemRatio"
      },
      {
        ...esADOParams,
        functionName: "minRedeemDuration"
      },
      {
        ...esADOParams,
        functionName: "maxRedeemDuration"
      }
    ]
  });

  // const [amount, setAmount] = useState(0n);

  const [vestRatio, setVestRatio] = useState(25n);

  const [duration, setDuration] = useState(0n);

  const amount = (esADOBalance * vestRatio) / 100n;

  const { write, isLoadingWrite } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.esADO,
    abi: esADOABI,
    functionName: "redeem",
    args: [amount, duration],
    enabled: amount > 0n && duration > 0n
  });

  useEffect(() => {
    if (vestingConfigData) {
      const minDuration = vestingConfigData[2].result as bigint;
      setDuration(minDuration);
    }
  }, [vestingConfigData]);

  if (vestingConfigData) {
    const minRatio = Number(vestingConfigData[0].result as bigint);
    const maxRatio = Number(vestingConfigData[1].result as bigint);
    const minDuration = Number(vestingConfigData[2].result as bigint);
    const maxDuration = Number(vestingConfigData[3].result as bigint);
    const currentRatio =
      minRatio +
      ((Number(duration) - minDuration) / (maxDuration - minDuration)) *
        100 *
        ((maxRatio - minRatio) / maxRatio);

    return (
      <div className={"flexStack items-stretch gap-4"}>
        <div className={"shrink-0 text-left text-xl self-center"}>
          <p className={"text-neutral-500"}>Balance</p>
          <p>
            esADO:{" "}
            <TickleNumber
              numberString={String(formatEtherToFixed(esADOBalance, 4))}
              continuously
            ></TickleNumber>
          </p>
          <p>
            ADO{" "}
            <TickleNumber
              numberString={String(formatEtherToFixed(balance, 4))}
              continuously
            ></TickleNumber>
          </p>
        </div>
        <div className={"flex-1"}>
          <p>Boos duration</p>
          <RadixSlider
            min={minDuration}
            max={maxDuration}
            step={3600 * 24}
            onValueChange={([duration]) => {
              setDuration(BigInt(duration));
            }}
            sliderPrefix={<span>Conversion rate: {currentRatio}%</span>}
            sliderAffix={`${formatSecondToDHMS(Number(duration))}`}
          />
        </div>
        <div className={"self-stretch flex flex-col gap-2"}>
          <button
            className={"emphasis h-16"}
            disabled={amount === 0n || duration === 0n || isLoadingWrite}
            onClick={() => {
              write?.();
            }}
          >
            Vest
          </button>
          <div>
            <Tooltip text={"% of your balance"}>
              <button
                className={"emphasis px-8"}
                onClick={() => {
                  setVestRatio(vestRatio === 100n ? 25n : vestRatio + 25n);
                }}
              >
                {vestRatio.toString()}%&nbsp;
                <InfoCircledIcon className={"inline-block"} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1 className={"rounded-md bg-neutral-800 w-full"}>&nbsp;</h1>;
  }
};

export default ESADOVesting;
