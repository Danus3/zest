import { useState } from "react";
import useETHorStETHBalance from "../../utils/useETHorStETHBalance.ts";
import classNames from "classnames";
import { formatEtherToFixed } from "../../utils/number.tsx";
import InputWithMax from "../../components/InputWithMax.tsx";
import { formatEther, parseEther } from "viem";
import { useAtomValue } from "jotai";
import { getSTETHPoolStats } from "../../state";

const Buy = () => {
  const [selected, setSelected] = useState<"ETH" | "stETH">("ETH");

  const [buyValue, setBuyValue] = useState(0n);

  const balance = useETHorStETHBalance(selected);

  const { lstETHPrice, ethPrice } = useAtomValue(getSTETHPoolStats);

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
              setBuyValue(0n);
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
              setBuyValue(0n);
            }}
          >
            stETH
          </span>
        </span>
        <span>
          Available: {formatEtherToFixed(balance, 4)} {selected}
        </span>
      </p>
      <div className={"my-2"}></div>
      <InputWithMax
        value={formatEther(buyValue)}
        setValue={value => setBuyValue(parseEther(value))}
        onMaxClick={() => {
          setBuyValue(balance);
        }}
      />
      <div className={"my-8"}></div>
      <p>lstETH Amount</p>
      <div className={"my-2"}></div>

      <div
        className={"text-center border-amber-400 border-[1px] py-1 rounded-md"}
      >
        {(ethPrice / lstETHPrice) * Number(formatEther(buyValue))} lstETH
      </div>
      <div className={"my-8"}></div>
      <button className={"bg-amber-400 text-black w-full"}>Buy</button>
    </div>
  );
};

export default Buy;
