import { useState } from "react";
import classNames from "classnames";
import { useAccount, useBalance } from "wagmi";
import { formatEther, parseEther } from "viem";
import { formatEtherToFixed } from "../../utils/number.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import InputWithMax from "../../components/InputWithMax.tsx";

const Mint = () => {
  const [selected, setSelected] = useState("ETH");

  const [mintValue, setMintValue] = useState(0n);

  const { address } = useAccount();

  const { data: ETHBalanceData } = useBalance({
    address
  });

  const { data: stETHBalanceData } = useBalance({
    address,
    token: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
  });

  const currentBalance: bigint =
    selected === "ETH"
      ? ETHBalanceData?.value || 0n
      : stETHBalanceData?.value || 0n;

  const mintAUSDAmount = mintValue * 1300n;

  return (
    <div>
      <p className={"flex flex-row justify-between"}>
        <span>
          Deposit{" "}
          <span
            className={classNames("cursor-pointer", {
              "text-amber-400 underline": selected === "stETH"
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
            className={classNames("cursor-pointer", {
              "text-amber-400 underline": selected === "ETH"
            })}
            onClick={() => {
              setSelected("stETH");
              setMintValue(0n);
            }}
          >
            stETH
          </span>
        </span>
        <span>
          Available: {Number(formatEtherToFixed(currentBalance, 4))} {selected}
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

      <div className={"my-12"}></div>
      <p>Mint</p>
      <div className={"my-4"}></div>
      <div className={"flex flex-row justify-between items-center gap-2"}>
        <div
          className={
            "rounded-md border-amber-400 border-[1px] w-full text-center py-1"
          }
        >
          ~{formatEtherToFixed(mintAUSDAmount)} aUSD
        </div>
        <div>
          <PlusCircledIcon />
        </div>
        <div
          className={
            "rounded-md border-amber-400 border-[1px] w-full text-center py-1"
          }
        >
          ~{formatEtherToFixed(mintValue, 4)} lstETH
        </div>
      </div>
      <div className={"my-8"}></div>
      <button className={"w-full bg-amber-400 text-black"}>Mint</button>
    </div>
  );
};

export default Mint;
