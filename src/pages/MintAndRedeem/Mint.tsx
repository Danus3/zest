import { useState } from "react";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import DepositETHorStETHInput, {
  MintAsset
} from "@components/DepositETHorStETHInput.tsx";
import useWrappedWriteContract from "@src/hooks/useWrappedWriteContract.ts";
import { CONTRACT_ADDRESSES, LIQ_PRICE, MINT_REF_ADDR } from "@src/constants";
import { AdscendoPoolABI } from "@utils/ABIs/AdscendoPoolABI.ts";
import { useAccount, useContractRead } from "wagmi";
import ApproveCheck from "@components/ApproveCheck.tsx";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import TickleNumber from "@components/TickleNumber.tsx";
import WrappedButton from "@components/WrappedButton.tsx";

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
    <WrappedButton
      className={"w-full emphasis"}
      onClick={() => {
        mintUsingEther?.();
      }}
      isLoading={isLoadingWrite || isLoading}
    >
      Mint
    </WrappedButton>
  );
};

const Mint = () => {
  const [mintValue, setMintValue] = useState(0n);

  const { isConnected } = useAccount();

  const [mintAsset, setMintAsset] = useState<MintAsset>("ETH");

  const mintAUSDAmount = mintValue * BigInt(LIQ_PRICE);

  const {
    write: mintUsingEther,
    isLoadingWrite,
    prepareContractError,
    isLoading
  } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.adscendoPool,
    abi: AdscendoPoolABI,
    enabled: mintValue > 0n && mintAsset === "ETH",
    functionName: "mintWithETH",
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
      <DepositETHorStETHInput
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
        <WrappedButton
          className={"w-full"}
          onClick={() => {
            mintUsingEther?.();
          }}
          disabled={
            isLoadingWrite ||
            mintValue === 0n ||
            !!prepareContractError ||
            !isConnected ||
            isLoading
          }
          isLoading={isLoadingWrite || isLoading}
        >
          {isLoading ? "Minting..." : "Mint"}
        </WrappedButton>
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
