import { useContractReads } from "wagmi";
import { CONTRACT_ADDRESSES } from "../../constants.ts";
import { useEffect, useState } from "react";
import { formatEtherToNumber, normalizeNumber } from "../../utils/number.tsx";
import { parseEther } from "viem";
import useWrappedWriteContract from "../../hooks/useWrappedWriteContract.ts";
import RadixSlider from "../../components/RadixSlider.tsx";
import { esADOState } from "../../state";
import { useAtomValue } from "jotai";
import esADOABI from "../../utils/ABIs/esADOABI.ts";
import { formatSecondToDHMS } from "../../utils/time.ts";

const esADOParams = {
  address: CONTRACT_ADDRESSES.esADO,
  abi: esADOABI
};

const ESADOVesting = () => {
  const { balance } = useAtomValue(esADOState);

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

  const [amount, setAmount] = useState(0n);

  const [duration, setDuration] = useState(0n);

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
        <p className={"self-center"}>Boost</p>
        <div className={"flex-1"}>
          <div>
            <RadixSlider
              min={minDuration}
              max={maxDuration}
              step={3600 * 12}
              onValueChange={([duration]) => {
                setDuration(BigInt(duration));
              }}
              prefix={"Stake duration:"}
              affix={`${formatSecondToDHMS(
                Number(duration)
              )}(${currentRatio}% boost)`}
            />
            <div className={"my-4"}></div>
            <RadixSlider
              min={0}
              max={formatEtherToNumber(balance)}
              onValueChange={([amount]) => {
                setAmount(parseEther(String(amount)));
              }}
              prefix={`Vest ${normalizeNumber(
                (Number(amount) / Number(balance || 1n)) * 100,
                2
              )}%(${normalizeNumber(formatEtherToNumber(amount), 4)}) esADO`}
              affix={`Output ${normalizeNumber(
                (formatEtherToNumber(amount) * currentRatio) / 100,
                4
              )} ADO`}
            />
          </div>
        </div>
        <button
          className={"emphasis self-stretch"}
          disabled={amount === 0n || duration === 0n || isLoadingWrite}
          onClick={() => {
            write?.();
          }}
        >
          Vest
        </button>
      </div>
    );
  } else {
    return <h1 className={"rounded-md bg-neutral-800 w-full"}>&nbsp;</h1>;
  }
};

export default ESADOVesting;
