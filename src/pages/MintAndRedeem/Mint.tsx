import { useState } from "react";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import DepositInput from "@src/components/DepositInput.tsx";
import useWrappedWriteContract from "@src/hooks/useWrappedWriteContract.ts";
import { CONTRACT_ADDRESSES } from "@src/constants";
import { AdscendoPoolABI } from "@utils/ABIs/AdscendoPoolABI.ts";

const Mint = () => {
  const [mintValue, setMintValue] = useState(0n);

  const mintAUSDAmount = mintValue * 1300n;

  const { write: mintUsingEther } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.adscendoPool,
    abi: AdscendoPoolABI,
    functionName: "mintWithEth",
    args: ["0x259B259E3D05338495d23984eDDe3Dc07dE5a8a5"],
    // overrides: {
    //   value: mintValue
    // },
    enabled: mintValue > 0n
  });

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
      <button
        className={"w-full bg-amber-400 text-black emphasis"}
        onClick={() => {
          mintUsingEther?.();
        }}
      >
        Mint
      </button>
    </div>
  );
};

export default Mint;
