import classNames from "classnames";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import InputWithMax from "./InputWithMax.tsx";
import { formatEther, parseEther } from "viem";
import { useState } from "react";
import useETHAndStETHBalance from "@utils/useETHAndStETHBalance.ts";

export type MintAsset = "ETH" | "stETH";

const DepositInput: React.FC<{
  value: bigint;
  setValue: (value: bigint) => void;
  setMintAsset?: (value: MintAsset) => void;
}> = ({ setValue: setMintValue, setMintAsset }) => {
  const [selected, setSelected] = useState<MintAsset>("ETH");

  // const [mintValue, setMintValue] = useState(0n);

  const currentBalance = useETHAndStETHBalance()[selected === "ETH" ? 0 : 1];

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
              if (selected === "ETH") return;
              setSelected("ETH");
              setMintValue(0n);
              setMintAsset?.("ETH");
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
              if (selected === "stETH") return;
              setSelected("stETH");
              setMintValue(0n);
              setMintAsset?.("stETH");
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
        setValue={value => setMintValue(parseEther(value))}
        maxValue={formatEther(currentBalance)}
      />
    </>
  );
};

export default DepositInput;
