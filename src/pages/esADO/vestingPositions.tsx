import { useAccount, useContractRead } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import esADOABI from "@src/utils/ABIs/esADOABI.ts";
import { formatEtherToNumber } from "@src/utils/number.tsx";
import { prettyDate } from "@src/utils/time.ts";
import useWrappedWriteContract from "@src/hooks/useWrappedWriteContract.ts";
import useTabFocused from "@hooks/utils/useTabFocused.ts";

const VestingPositionBlock: React.FC<{
  index: number;
}> = ({ index }) => {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: CONTRACT_ADDRESSES.esADO,
    abi: esADOABI,
    functionName: "getUserRedeem",
    args: address ? [address, BigInt(index)] : ["0x1", BigInt(index)],
    enabled: !!address
  });

  const { write } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.esADO,
    abi: esADOABI,
    functionName: "cancelRedeem",
    args: [BigInt(index)]
  });

  const { write: finalizeRedeen } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.esADO,
    abi: esADOABI,
    functionName: "finalizeRedeem",
    args: [BigInt(index)],
    enabled: !data ? false : Number(data[2]) * 1e3 < Date.now()
  });

  if (!data) {
    return null;
  }
  const [adoAmount, esADOAmount, endTime] = data;
  const endTimeStamp = Number(endTime) * 1e3;
  return (
    <div
      className={
        "bg-neutral-900 rounded-md p-2 grid grid-rows-[auto_auto] grid-cols-2 md:grid-rows-1 md:grid-cols-[auto_auto_auto_auto] gap-2 justify-between relative items-center"
      }
    >
      <div className={"absolute text-xl -left-3 -top-3 text-neutral-500 z-[0]"}>
        #{index + 1}
      </div>
      <div className={"relative z-10"}>
        <p>esADO in</p>
        <p>{formatEtherToNumber(esADOAmount)}</p>
      </div>
      <div>
        <p>ADO out</p>
        <p>{formatEtherToNumber(adoAmount)}</p>
      </div>
      <div className={"col-span-2 md:col-span-1"}>
        <p>End time</p>
        <p>{prettyDate(endTimeStamp)}</p>
      </div>
      <div className={"col-span-2 md:col-span-1"}>
        <p>Operations</p>
        <p className={"mt-1"}>
          <button
            className={"emphasis sm"}
            onClick={() => {
              if (write) {
                write();
              }
            }}
          >
            Cancel
          </button>
          &nbsp;
          <button
            className={"emphasis sm"}
            onClick={() => {
              if (finalizeRedeen) {
                finalizeRedeen();
              }
            }}
            disabled={endTimeStamp > Date.now()}
          >
            Claim
          </button>
        </p>
      </div>
    </div>
  );
};

const VestingPositions = () => {
  const { address } = useAccount();

  const focused = useTabFocused();
  const { data, isLoading } = useContractRead({
    address: CONTRACT_ADDRESSES.esADO,
    abi: esADOABI,
    functionName: "getUserRedeemsLength",
    args: address ? [address] : ["0x1"],
    enabled: !!address,
    watch: focused,
    cacheOnBlock: false
  });

  let PositionBlock: React.ReactNode;

  if (isLoading) {
    PositionBlock = <h3 className={"text-neutral-600"}>Loading...</h3>;
  } else if (data !== undefined) {
    const dataNumber = Number(data);
    if (dataNumber === 0) {
      PositionBlock = <h3 className={"text-neutral-600"}>No vest positions</h3>;
    } else {
      PositionBlock = (
        /**
         * reconstruct the array of vesting positions every time the data changes
         */
        <div key={dataNumber} className={"flex flex-col gap-2"}>
          {Array.from({ length: dataNumber })
            .fill(1)
            .map((_, idx) => {
              return (
                <VestingPositionBlock
                  key={idx}
                  index={idx}
                ></VestingPositionBlock>
              );
            })}
        </div>
      );
    }
  } else if (!address) {
    PositionBlock = (
      <h3 className={"text-neutral-600"}>Please connect wallet first</h3>
    );
  }

  return (
    <div className={"card gap-2 stack"}>
      <h3>Your esADO vest positions</h3>
      {PositionBlock}
    </div>
  );
};

export default VestingPositions;
