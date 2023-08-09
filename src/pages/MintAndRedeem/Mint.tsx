import { useState } from "react";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import DepositInput from "@src/components/DepositInput.tsx";

const Mint = () => {
  const [mintValue, setMintValue] = useState(0n);

  const mintAUSDAmount = mintValue * 1300n;

  return (
    <div>
      <DepositInput value={mintValue} setValue={setMintValue} />
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
