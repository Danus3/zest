import useETHAndStETHBalance from "@utils/useETHAndStETHBalance.ts";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import InputWithMax from "./InputWithMax.tsx";

export type MintAsset = "ETH" | "stETH";

const DepositETHorStETHInput: React.FC<{
  value: bigint;
  setValue: (value: bigint) => void;
  setMintAsset?: (value: MintAsset) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customeBalance?: any;
}> = ({ value, setValue, customeBalance }) => {
  const [selected] = useState<MintAsset>("ETH");

  const currentBalance = useETHAndStETHBalance()[selected === "ETH" ? 0 : 1];

  const usedBalance =
    customeBalance !== undefined ? customeBalance || 0 : currentBalance;

  return (
    <>
      <p className={"flex flex-row justify-end"}>
        <span
          className={"cursor-pointer"}
          onClick={() => {
            setValue(usedBalance);
          }}
        >
          Available: {formatEther(usedBalance)} {selected}
        </span>
      </p>
      <div className={"my-4"}></div>
      <InputWithMax
        setValue={(value) => setValue(parseEther(value))}
        maxValue={formatEther(usedBalance)}
        placeholder={`0 ${selected}`}
        value={formatEther(value)}
      />
    </>
  );
};

export default DepositETHorStETHInput;
