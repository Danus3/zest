import ApproveCheck from "@components/ApproveCheck.tsx";
import DepositETHorStETHInput, {
  MintAsset,
} from "@components/DepositETHorStETHInput.tsx";
import TickleNumber from "@components/TickleNumber.tsx";
import WrappedButton from "@components/WrappedButton.tsx";
import useGetPythUpdateData from "@hooks/useGetPythUpdateData";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CONTRACT_ADDRESSES, LIQ_PRICE } from "@src/constants";
import useWrappedWriteContract from "@src/hooks/useWrappedWriteContract.ts";
import { formatEtherToFixed } from "@src/utils/number.tsx";
import { AdscendoPoolABI } from "@utils/ABIs/AdscendoPoolABI.ts";
import { zESTABI } from "@utils/ABIs/ZestABI";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import { useState } from "react";
import { useAccount } from "wagmi";

const MintStETH: React.FC<{
  mintValue: bigint;
}> = ({ mintValue }) => {
  const {
    write: mintUsingEther,
    isLoadingWrite,
    isLoading,
  } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.adscendoPool,
    abi: AdscendoPoolABI,
    enabled: mintValue > 0n,
    functionName: "mint",
    args: [mintValue],
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

  const priceData = useGetPythUpdateData();

  const {
    write: mintUsingEther,
    isLoadingWrite,
    prepareContractError,
    isLoading,
  } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.zEST,
    abi: zESTABI,
    enabled: mintValue > 0n && !!priceData,
    functionName: "mint",
    args: [priceData],
    value: mintValue,
  });

  // console.log("%c~LOG~", "color: yellow; font-size: 16px;", mintUsingEther);

  // const { data: mintFee } = useContractRead({
  //   address: CONTRACT_ADDRESSES.adscendoPool,
  //   abi: AdscendoPoolABI,
  //   functionName: "mintFee",
  // });

  const mintFee = 0n;

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
          zUSD
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
          mirrorETH
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
