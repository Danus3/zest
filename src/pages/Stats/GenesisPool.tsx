import { LIQ_PRICE } from "@src/constants.ts";
import { commas, normalizeNumber } from "@src/utils/number.tsx";
import { useAtomValue } from "jotai";
import { getAllPrices, getSTETHPoolStats } from "@src/state";
import { Link } from "react-router-dom";
import { formatEther } from "viem";

const GenesisPool = () => {
  const { normalizedAUSDPrice } = useAtomValue(getAllPrices);

  const {
    lstETHPrice,
    lstETHLeverageRatio,
    aUSDCirculatingSupply,
    lstETHCirculatingSupply
  } = useAtomValue(getSTETHPoolStats);

  const totalRevenue = commas(98765432);

  return (
    <div className={"stats-card stack card"}>
      <div className={"flex items-center justify-between mb-4"}>
        <h3>stETH Genesis Pool</h3>
        <p>Liq.price ${LIQ_PRICE}</p>
      </div>
      <div className="item">
        <span>aUSD Price</span>
        <span>${normalizedAUSDPrice}</span>
      </div>
      <div className="item">
        <span>Circulating aUSD</span>
        <span>{commas(formatEther(aUSDCirculatingSupply))}</span>
      </div>
      <div className="item">
        <span>aUSD APR</span>
        <span>${totalRevenue}</span>
      </div>
      <div className="divider"></div>
      <div className="item">
        <span>lstETH Price</span>
        <span>${normalizeNumber(lstETHPrice, 2)}</span>
      </div>
      <div className="item">
        <span>Circulating lstETH</span>
        <span>{commas(formatEther(lstETHCirculatingSupply))}</span>
      </div>
      <div className="item">
        <span>lstETH Leverage Ratio</span>
        <span className={"text-amber-400"}>
          {normalizeNumber(lstETHLeverageRatio, 2)}
        </span>
      </div>
      <div className={"flexRow gap-4 mt-4"}>
        <Link to={"/stack"} className={"grow"}>
          <button>Buy aUSD</button>
        </Link>
        <Link to={"/buy"} className={"grow"}>
          <button>Stake aUSD</button>
        </Link>
        <Link to={"/buy"} className={"grow"}>
          <button>Buy lstETH</button>
        </Link>
      </div>
    </div>
  );
};

export default GenesisPool;
