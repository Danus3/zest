import { useAtomValue } from "jotai";
import { getAllPrices, getSTETHPoolStats } from "../../state";
import { commas, normalizeNumber } from "../../utils/number.tsx";

import "./index.css";
import RatioChart from "../../components/RatioChart.tsx";
import { formatEther } from "viem";
import { useState } from "react";
import Tabs from "../../components/Tabs.tsx";
import Mint from "./Mint.tsx";
import Redeem from "./Redeem.tsx";
import Buy from "./Buy.tsx";

const MintAndRedeem = () => {
  const {
    stETHLockedUSD,
    aUSDCirculatingSupply,
    liquidityPrice,
    lstETHPrice,
    lstETHLeverageRatio
  } = useAtomValue(getSTETHPoolStats);

  const { aUSDPrice, ethPrice } = useAtomValue(getAllPrices);

  const [tab, setTab] = useState<number>(0);

  return (
    <div className={"page-content flex-col flex gap-4 mt-8 mint-redeem"}>
      <div className={"flex flex-col gap-2 md:flex-row  justify-between"}>
        <h1 className={"text-left"}>Overview(Technical Preview)</h1>
        <div className={"flex gap-4 md:gap-8 text-[1.1em]"}>
          <div className={"stack gap-0 text-right"}>
            <span>ETH/USD</span>
            <span>${normalizeNumber(ethPrice, 2)}</span>
          </div>
          <div className={"stack gap-0 text-right"}>
            <span>aUSD/USDC</span>
            <span>${aUSDPrice.toFixed(2)}</span>
          </div>
        </div>
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
            <h3>${stETHLockedUSD}</h3>
            <div className="divider"></div>
          </div>
          <div className={"stack"}>
            <p>Collateral Ratio</p>
            <h3>0</h3>
            <div className="divider"></div>
          </div>
          <div className={"stack"}>
            <p>aUSD Minted</p>
            <h3>{commas(formatEther(aUSDCirculatingSupply))}</h3>
            <div className="divider"></div>
          </div>
          <div className={"stack"}>
            <p>lstETH Minted</p>
            <h3>{commas(formatEther(aUSDCirculatingSupply))}</h3>
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
                <button className={"bg-amber-400 text-black"}>Buy aUSD</button>
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
          />
          <div className={"my-0"}></div>
          {tab === 0 ? <Mint /> : tab === 1 ? <Redeem /> : <Buy />}
        </div>
      </div>
    </div>
  );
};
export default MintAndRedeem;
