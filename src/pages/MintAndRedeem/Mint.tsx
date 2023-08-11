import { useState } from "react";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import DepositInput, { MintAsset } from "@src/components/DepositInput.tsx";
import useWrappedWriteContract from "@src/hooks/useWrappedWriteContract.ts";
import { CONTRACT_ADDRESSES, LIQ_PRICE, MINT_REF_ADDR } from "@src/constants";
import { AdscendoPoolABI } from "@utils/ABIs/AdscendoPoolABI.ts";
import { useContractRead } from "wagmi";
import ApproveCheck from "@components/ApproveCheck.tsx";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import TickleNumber from "@components/TickleNumber.tsx";

const MintStETH: React.FC<{
  mintValue: bigint;
}> = ({ mintValue }) => {
  const {
    write: mintUsingEther,
    isLoadingWrite,
    isLoading
  } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.adscendoPool,
    abi: AdscendoPoolABI,
    enabled: mintValue > 0n,
    functionName: "mint",
    args: [mintValue]
  });

  return (
    <button
      className={"w-full emphasis"}
      onClick={() => {
        mintUsingEther?.();
      }}
      disabled={isLoadingWrite || isLoading}
    >
      Mint
    </button>
  );
};

const Mint = () => {
  const [mintValue, setMintValue] = useState(0n);

  const [mintAsset, setMintAsset] = useState<MintAsset>("ETH");

  const mintAUSDAmount = mintValue * BigInt(LIQ_PRICE);

  const { write: mintUsingEther, isLoadingWrite } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.adscendoPool,
    abi: AdscendoPoolABI,
    enabled: mintValue > 0n,
    functionName: "mintWithEth",
    args: [MINT_REF_ADDR],
    value: mintValue
  });

  const { data: mintFee } = useContractRead({
    address: CONTRACT_ADDRESSES.adscendoPool,
    abi: AdscendoPoolABI,
    functionName: "mintFee"
  });

  return (
    <div>
      <DepositInput
        value={mintValue}
        setValue={setMintValue}
        setMintAsset={setMintAsset}
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
          <TickleNumber
            numberString={String(
              formatEtherToFixed(
                mintAUSDAmount - ((mintFee ?? 0n) * mintAUSDAmount) / 1000n
              )
            )}
          />
          aUSD
        </div>
        <div>
          <PlusCircledIcon />
        </div>
        <div
          className={
            "rounded-md border-amber-400 border-[1px] w-full text-center py-1"
          }
        >
          <TickleNumber
            numberString={String(
              formatEtherToFixed(
                mintValue - ((mintFee ?? 0n) * mintValue) / 1000n,
                4
              )
            )}
          />
          lstETH
        </div>
      </div>
      <div className={"my-8"}></div>
      {mintAsset === "ETH" ? (
        <button
          className={"w-full emphasis"}
          onClick={() => {
            mintUsingEther?.();
          }}
          disabled={isLoadingWrite || mintValue === 0n}
        >
          Mint
        </button>
      ) : (
        <ApproveCheck
          spender={CONTRACT_ADDRESSES.adscendoPool}
          token={CONTRACT_ADDRESSES.stETH}
          spendingAmount={mintValue}
          tokenABI={lstETHABI}
          className={"w-full"}
          tokenName={"stETH"}
        >
          <MintStETH mintValue={mintValue} />
        </ApproveCheck>
      )}
    </div>
  );
};

export default Mint;
