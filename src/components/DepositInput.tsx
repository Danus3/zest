import classNames from "classnames";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import InputWithMax from "./InputWithMax.tsx";
import { formatEther, parseEther } from "viem";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";

const DepositInput: React.FC<{
  value: bigint;
  setValue: (value: bigint) => void;
}> = ({ value: mintValue, setValue: setMintValue }) => {
  const [selected, setSelected] = useState("ETH");

  // const [mintValue, setMintValue] = useState(0n);

  const { address } = useAccount();

  const { data: ETHBalanceData } = useBalance({
    address
  });

  const { data: stETHBalanceData } = useBalance({
    address,
    token: CONTRACT_ADDRESSES.stETH
  });

  const currentBalance: bigint =
    selected === "ETH"
      ? ETHBalanceData?.value || 0n
      : stETHBalanceData?.value || 0n;

  return (
    <>
      <p className={"flex flex-row justify-between"}>
        <span>
          Deposit{" "}
          <span
            className={classNames("cursor-pointer underline", {
              "text-amber-400": selected === "ETH"
            })}
            onClick={() => {
              setSelected("ETH");
              setMintValue(0n);
            }}
          >
            ETH
          </span>{" "}
          or{" "}
          <span
            className={classNames("cursor-pointer underline", {
              "text-amber-400": selected === "stETH"
            })}
            onClick={() => {
              setSelected("stETH");
              setMintValue(0n);
            }}
          >
            stETH
          </span>
        </span>
        <span
          className={"cursor-pointer"}
          onClick={() => {
            setMintValue(currentBalance);
          }}
        >
          Available: {formatEtherToFixed(currentBalance, 4)} {selected}
        </span>
      </p>
      <div className={"my-4"}></div>
      <InputWithMax
        value={formatEther(mintValue)}
        setValue={value => setMintValue(parseEther(value))}
        onMaxClick={() => {
          setMintValue(currentBalance);
        }}
      />
    </>
  );
};

export default DepositInput;
