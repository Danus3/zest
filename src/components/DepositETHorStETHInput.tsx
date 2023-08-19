import classNames from "classnames";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import InputWithMax from "./InputWithMax.tsx";
import { formatEther, parseEther } from "viem";
import { useState } from "react";
import useETHAndStETHBalance from "@utils/useETHAndStETHBalance.ts";

export type MintAsset = "ETH" | "stETH";

const DepositETHorStETHInput: React.FC<{
  value: bigint;
  setValue: (value: bigint) => void;
  setMintAsset?: (value: MintAsset) => void;
}> = ({ value, setValue: setValue, setMintAsset }) => {
  const [selected, setSelected] = useState<MintAsset>("ETH");

  const currentBalance = useETHAndStETHBalance()[selected === "ETH" ? 0 : 1];

  const toggleAsset = (selectedAsset: MintAsset) => {
    if (selectedAsset === selected) return;
    if (selected === "ETH") {
      setSelected("stETH");
      setValue(0n);
      setMintAsset?.("stETH");
    } else {
      setSelected("ETH");
      setValue(0n);
      setMintAsset?.("ETH");
    }
  };

  return (
    <>
      <p className={"flex flex-row justify-between"}>
        <span>
          Deposit&nbsp;
          <span
            className={classNames("cursor-pointer", {
              "text-amber-400": selected === "ETH"
            })}
            onClick={() => {
              toggleAsset("ETH");
            }}
          >
            <input
              type="checkbox"
              checked={selected === "ETH"}
              className={"bg-amber-400"}
              onChange={() => {
                toggleAsset("ETH");
              }}
            />
            &nbsp;ETH
          </span>{" "}
          or{" "}
          <span
            className={classNames("cursor-pointer", {
              "text-amber-400": selected === "stETH"
            })}
            onClick={() => {
              toggleAsset("stETH");
            }}
          >
            <input
              type="checkbox"
              checked={selected === "stETH"}
              className={"bg-amber-400"}
              onChange={() => {
                toggleAsset("stETH");
              }}
            />
            &nbsp;stETH
          </span>
        </span>
        <span
          className={"cursor-pointer"}
          onClick={() => {
            setValue(currentBalance);
          }}
        >
          Available: {formatEtherToFixed(currentBalance, 4)} {selected}
        </span>
      </p>
      <div className={"my-4"}></div>
      <InputWithMax
        setValue={value => setValue(parseEther(value))}
        maxValue={formatEther(currentBalance)}
        placeholder={`0 ${selected}`}
        value={formatEther(value)}
      />
    </>
  );
};

export default DepositETHorStETHInput;
