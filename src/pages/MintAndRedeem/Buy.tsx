import { useState } from "react";
import { formatEther } from "viem";
import { useAtomValue } from "jotai";
import { getSTETHPoolStats } from "../../state";
import DepositInput from "../../components/DepositInput.tsx";

const Buy = () => {
  const [buyValue, setBuyValue] = useState(0n);

  const { lstETHPrice, ethPrice } = useAtomValue(getSTETHPoolStats);

  return (
    <div>
      <DepositInput value={buyValue} setValue={setBuyValue} />
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
