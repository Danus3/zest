import { useAtomValue } from "jotai";
import {
  aUSDState,
  getAllPrices,
  getSTETHPoolStats,
  lstETHState
} from "@src/state";
import {
  commas,
  formatEtherToFixed,
  formatEtherToNumber,
  normalizeNumber
} from "@src/utils/number.tsx";

import "./index.css";
import RatioChart from "@src/components/RatioChart.tsx";
import { formatEther } from "viem";
import { useState } from "react";
import Tabs from "@src/components/Tabs.tsx";
import Mint from "./Mint.tsx";
import Redeem from "./Redeem.tsx";
import Buy from "./Buy.tsx";
import { LIQ_PRICE } from "@src/constants.ts";
import WrappedButton from "@components/WrappedButton.tsx";
// import { computePoolAddress, FeeAmount } from "@uniswap/v3-sdk";
// import { ChainId, QUOTER_ADDRESSES, Token } from "@uniswap/sdk-core";
// import { useContractRead, useContractReads } from "wagmi";
//
// import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
// import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";

const MintAndRedeem = () => {
  const {
    stETHLocked,
    liquidityPrice,
    lstETHPrice,
    lstETHLeverageRatio
  } = useAtomValue(getSTETHPoolStats);

  const { totalSupply: aUSDCirculatingSupply } = useAtomValue(aUSDState);

  const { totalSupply: lstETHCirculatingSupply } = useAtomValue(lstETHState);

  const { aUSDPrice, stETHPrice } = useAtomValue(getAllPrices);

  const [tab, setTab] = useState<number>(0);

  // const { data, isError, isLoading } = useContractRead({
  //   address: '0xFC4816F8D4dac18d4ddA9058B6f711460818180a',
  //   abi: wagmigotchiABI,
  //   functionName: 'getHunger',
  // })

  // const USDC_TOKEN = new Token(
  //   ChainId.MAINNET,
  //   "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  //   6,
  //   "USDC",
  //   "USD//C"
  // );
  // const AUSD_TOKEN = new Token(
  //   ChainId.MAINNET,
  //   "0x258bB9E4b6AB36FeCa231f95aC7632B8470726f5",
  //   18,
  //   "AUSD",
  //   "Adscendo USD"
  // );
  // const currentPoolAddress = computePoolAddress({
  //   factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  //   tokenA: USDC_TOKEN,
  //   tokenB: AUSD_TOKEN,
  //   fee: FeeAmount.LOW
  // });
  //
  // const data = useContractReads({
  //   contracts: [
  //     {
  //       address: currentPoolAddress,
  //       abi: IUniswapV3PoolABI.abi,
  //       functionName: "token0"
  //     },
  //     {
  //       address: currentPoolAddress,
  //       abi: IUniswapV3PoolABI.abi,
  //       functionName: "token1"
  //     },
  //     {
  //       address: currentPoolAddress,
  //       abi: IUniswapV3PoolABI.abi,
  //       functionName: "fee"
  //     }
  //   ]
  // });
  //
  // const data2 = useContractRead({
  //   address: QUOTER_ADDRESSES[ChainId.MAINNET],
  //   abi: Quoter.abi,
  //   functionName: "quoteExactInputSingle",
  //   args: [
  //     USDC_TOKEN.address,
  //     AUSD_TOKEN.address,
  //     FeeAmount.LOW,
  //     parseEther("100"),
  //     0
  //   ]
  // });
  //
  // console.log(data2.data ? formatEther(data2.data) : 0);

  // useEffect(async () => {
  //
  //
  //
  // }, []);

  return (
    <div className={"page-content flex-col flex gap-4 mint-redeem"}>
      <div className={"flex flex-col gap-2 md:flex-row  justify-between"}>
        <h1 className={"text-left"}>Overview</h1>
        <div className={"flex gap-4 md:gap-8 text-[1.1em]"}>
          <div className={"stack gap-0 text-right"}>
            <span>ETH/USD</span>
            <span>${normalizeNumber(stETHPrice, 2)}</span>
          </div>
          <div className={"stack gap-0 text-right"}>
            <span>aUSD/USDC</span>
            <span>${aUSDPrice.toFixed(4)}</span>
          </div>
          <div className={"stack gap-0 text-right"}>
            <span>TVL</span>
            <span>
              ${(formatEtherToNumber(stETHLocked) * stETHPrice).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className={"flex gap-4 justify-start md:justify-end"}>
        <WrappedButton className={"self-center"}>
          <a
            target={"_blank"}
            href={
              "https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x258bB9E4b6AB36FeCa231f95aC7632B8470726f5"
            }
            className={"text-black hover:no-underline"}
          >
            aUSD Swap
          </a>
        </WrappedButton>
        <WrappedButton className={"self-center"}>
          <a
            className={"text-black hover:no-underline"}
            target={"_blank"}
            href={
              "https://app.uniswap.org/add/0x258bB9E4b6AB36FeCa231f95aC7632B8470726f5/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/500?minPrice=0.998903&maxPrice=1.000903"
            }
          >
            Add Liquidity
          </a>
        </WrappedButton>
      </div>
      <div className={"card p-4 rounded-2xl md:pb-0"}>
        <h3 className={"mb-8"}>stETH Genesis Pool</h3>
        <div
          className={
            "grid md:grid-cols-4 md:grid-rows-2 grid-cols-2 grid-rows-4 gap-x-8 gap-y-2"
          }
        >
          <div className={"stack"}>
            <p>stETH Locked</p>
            <h3>Ξ{formatEtherToFixed(stETHLocked, 4)}</h3>
            <div className="divider"></div>
          </div>
          <div className={"stack"}>
            <p>Collateral Ratio</p>
            <h3>{(stETHPrice / LIQ_PRICE).toFixed(4)}</h3>
            <div className="divider"></div>
          </div>
          <div className={"stack"}>
            <p>aUSD Minted</p>
            <h3>{commas(formatEther(aUSDCirculatingSupply))}</h3>
            <div className="divider"></div>
          </div>
          <div className={"stack"}>
            <p>lstETH Minted</p>
            <h3>{commas(formatEther(lstETHCirculatingSupply))}</h3>
            <div className="divider"></div>
          </div>
          <div className={"stack"}>
            <p>Liq.Price</p>
            <h3>${liquidityPrice}</h3>
            <div className="divider md:hidden"></div>
          </div>
          <div className={"stack"}>
            <p>aUSD APR</p>
            <h3 className={"text-amber-400"}>{0}</h3>
            <div className="divider md:hidden"></div>
          </div>
          <div className={"stack"}>
            <p>lstETH Value</p>
            <h3>${normalizeNumber(lstETHPrice)}</h3>
          </div>
          <div className={"stack"}>
            <p>lstETH Leverage Ratio</p>
            <h3 className={"text-amber-400"}>
              {normalizeNumber(lstETHLeverageRatio)}x
            </h3>
          </div>
        </div>
      </div>
      <div className={"my-4"}></div>
      <h1 className={"text-left"}>
        {tab === 0 ? "Mint" : tab === 1 ? "Redeem" : "Buy lstETH"}
      </h1>
      <div className={"flex flex-col md:flex-row gap-8"}>
        <div className={"stack w-full md:w-1/2 text-left gap-4"}>
          {tab === 0 ? (
            <>
              <ul className={"leading-6"}>
                <li className={"list-none"}>
                  You can mint aUSD and lstETH with stETH/ETH.
                </li>
                <li>aUSD: Enjoy Leveraged ETH Staking Yield (1x-5x)</li>
                <li>
                  lstETH: Enjoy Long-term On-chain Leveraged ETH Derivative
                  (3x-6x)
                </li>
              </ul>
              <p className={"text-amber-400"}>
                1 stETH/ETH = 1300*aUSD+1*lstETH
              </p>
              <RatioChart />
            </>
          ) : tab === 1 ? (
            <>
              <p>
                You can use 1300 aUSD and 1 lstETH to redeem 1 stETH.
                <br />{" "}
                <span className={"text-amber-400"}>
                  1300*aUSD+1*lstETH = 1 stETH
                </span>
              </p>

              <a href="/">
                <button className={"bg-amber-400 text-black emphasis"} disabled>
                  Buy aUSD
                </button>
              </a>
            </>
          ) : (
            <>
              <p>For ETH price increase part,</p>
              <p className={"text-amber-400 text-2xl"}>1 lstETH = 1ETH</p>
              <RatioChart />
            </>
          )}
        </div>
        <div className={"stack w-full md:w-1/2 text-left gap-4"}>
          <Tabs
            labels={["Mint", "Redeem", "Buy lstETH"]}
            currentTab={tab}
            onChange={(_, value) => {
              setTab(value);
            }}
            disabled={[false, false, true]}
            name={"tab"}
          />
          <div className={"my-0"}></div>
          {tab === 0 ? <Mint /> : tab === 1 ? <Redeem /> : <Buy />}
        </div>
      </div>
    </div>
  );
};
export default MintAndRedeem;
