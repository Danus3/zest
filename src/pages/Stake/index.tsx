import ParallelBanner from "@components/ParallelBanner";
import homepageBg from "@assets/homepage-bg.webp";
import WrappedButton from "@components/WrappedButton";
import { twMerge } from "tailwind-merge";
import Tabs from "@components/Tabs";
import { useEffect, useState } from "react";
import DepositETHorStETHInput from "@components/DepositETHorStETHInput";
import useWrappedWriteContract from "@hooks/useWrappedWriteContract";

import zestStakingABI from "@utils/ABIs/zestStakingABI";

import { CONTRACT_ADDRESSES } from "../../constants";
import { useAccount, useBalance, useContractReads } from "wagmi";
import { formatEther } from "viem";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";

const usdcPricePath = "https://api.scattering.io/api/v1/getTokenInUsdcPrice";

const Stake = () => {
  const [tab, setTab] = useState<number>(0);
  const [mintValue, setMintValue] = useState(0n);

  const { address } = useAccount();

  const result = useBalance({
    address: CONTRACT_ADDRESSES.zestStaking,
  });

  const { data, refetch } = useContractReads({
    contracts: [
      {
        address: CONTRACT_ADDRESSES.zestStaking,
        abi: zestStakingABI as any,
        functionName: "balancesOf",
        args: [address as `0x${string}`],
      },
      {
        address: CONTRACT_ADDRESSES.zestStaking,
        abi: zestStakingABI as any,
        functionName: "points",
        args: [address as `0x${string}`],
      },
    ],
    enabled: !!address,
    watch: true,
  });

  const ethPrice = useQuery({
    queryKey: ["getAmount"],
    queryFn: async () => {
      const res: any = await handleGetPrice();
      return res;
    },
  });

  const points = data?.[1]?.result?.toString() as any;
  const lockedETH = result?.data?.formatted;
  const stakedETH = data?.[0]?.result?.toString() as any;

  const tvl =
    lockedETH && ethPrice?.data
      ? `$ ${new BigNumber(ethPrice?.data).multipliedBy(lockedETH)?.toFixed(4)}`
      : "--";

  const {
    write: newStake,
    isLoadingWrite: newIsLoadingWrite,
    isLoading: newIsLoading,
  } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.zestStaking,
    abi: zestStakingABI as any,
    functionName: "join",
    args: [],
    value: mintValue,
    enabled: mintValue > 0n && tab === 0,
    onTransactionComplete() {
      setMintValue(0n);
      refetch();
    },
  });

  const {
    write: unstake,
    isLoadingWrite: isLoadingWriteUnstake,
    isLoading: isLoadingUnstake,
  } = useWrappedWriteContract({
    address: CONTRACT_ADDRESSES.zestStaking,
    abi: zestStakingABI as any,
    functionName: "exit",
    args: [mintValue],
    enabled: mintValue > 0n && tab === 1,
    onTransactionComplete() {
      setMintValue(0n);
      setTab(0);
      refetch();
    },
  });

  const handleGetPrice = async () => {
    try {
      const res = await axios.post(usdcPricePath, {});
      console.log("res", res?.data?.data?.eth);
      return res?.data?.data?.eth;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleGetPrice();
  }, []);

  console.log("mintValue", mintValue?.toString());

  console.log("data?.[0].result", data?.[0].result);

  return (
    <div className="mt-36 max-w-[960px] m-auto">
      <ParallelBanner
        src={homepageBg}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: -1,
        }}
      />
      <h1>
        🏆 <span className="text-amber-400">Blast BigBang</span> Honorable
        Mentions
      </h1>
      <h3 className="mt-20">Empowering users with freedom to choose:</h3>
      <p className="flex gap-4 items-center justify-center mt-6">
        <WrappedButton className="w-[120px]">Yield</WrappedButton>
        or
        <WrappedButton className="w-[120px]">Volatility</WrappedButton>
      </p>
      <h2 className="mt-20">Genesis Pool</h2>
      <div className="mt-8 flex gap-2 justify-center">
        <div className={twMerge("bg-transition p-4 px-16 rounded-2xl grow")}>
          <h2 className="text-amber-400 mb-2">{lockedETH || "--"} ETH</h2>
          <p className="text-gray-300">ETH Locked</p>
        </div>
        <div className={twMerge("bg-transition p-4 px-16 rounded-2xl grow")}>
          <h2 className="text-amber-400 mb-2">{tvl} </h2>
          <p className="text-gray-300">TVL</p>
        </div>
      </div>
      <div className="mt-16 flex gap-2 justify-center flex-wrap">
        <div className={twMerge("bg-transition p-4 px-16 rounded-2xl grow")}>
          <p className="text-gray-300">Staked</p>
          <h3>{stakedETH ? formatEther(stakedETH).slice(0, 6) : "--"} ETH</h3>
        </div>
        <div className={twMerge("bg-transition p-4 px-16 rounded-2xl grow")}>
          <p className="text-gray-300">Zest points</p>
          <h3> {points ? formatEther(points).slice(0, 6) : "--"}</h3>
        </div>
        <div className={twMerge("bg-transition p-4 px-16 rounded-2xl grow")}>
          <p className="text-gray-300">Blast points</p>
          <h3>Coming soon</h3>
        </div>
        <div className={twMerge("bg-transition p-4 px-16 rounded-2xl grow")}>
          <p className="text-gray-300">APY</p>
          <h3>💥💥💥</h3>
        </div>
      </div>
      {/* <h2 className="mt-32 mb-16">Stake</h2> */}
      <div className="max-w-[480px] m-auto mt-20 mb-16">
        <Tabs
          labels={["Stake", "UnStake"]}
          currentTab={tab}
          onChange={(_, value) => {
            setTab(value);
            setMintValue(0n);
          }}
          name={"tab"}
          disabled={[false, false]}
        />
        <div className="my-8"></div>
        <DepositETHorStETHInput
          value={mintValue}
          setValue={setMintValue}
          customeBalance={tab === 1 ? data?.[0].result || null : undefined}
        />
        <WrappedButton
          className="w-full mt-6"
          disabled={!Number(mintValue?.toString())}
          isLoading={
            newIsLoadingWrite ||
            newIsLoading ||
            isLoadingWriteUnstake ||
            isLoadingUnstake
          }
          // disabled={!mintValue}
          onClick={() => {
            tab === 1 ? unstake?.() : newStake?.();
          }}
        >
          {tab === 0 ? "Stake" : "UnStake"}
        </WrappedButton>
      </div>
    </div>
  );
};

export default Stake;
