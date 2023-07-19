import Banner1 from "@assets/homepage-banner-1.png";
import "./homepage.css";
import LazyImage from "../../components/image.tsx";
import { routeConfigs } from "../../config.ts";
import homepageBg from "@assets/homepage-bg.jpg";
import homepageFooter from "@assets/homepage-footer.jpg";
import ParallelBanner from "../../components/ParallelBanner.tsx";
import TypeWriter from "../../components/TypeWriter";
import StETH_Diagram from "./stETH_Diagram.tsx";
import RatioChart from "../../components/RatioChart.tsx";

const Homepage = () => {
  const subBanner = (
    <div
      className={
        "flex gap-8 flex-col md:flex-row justify-between items-stretch w-full"
      }
    >
      <div className={"homepage-card px-3 flex-grow"}>
        <h2>
          Long ETH with <span className={"text-amber-400"}>3x-6x</span> Leverage
        </h2>
        <p className={"mt-4 text-neutral-400"}>
          Enjoy on-chain leverage without{" "}
          <span className={"text-amber-400"}>
            funding fees & liquidation risk
          </span>
        </p>
      </div>
      <div className={"homepage-card px-3 flex-grow"}>
        <h2>Leverage ETH Staking Yield</h2>
        <p className={"mt-4 text-neutral-400"}>
          Enjoy leveraged ETH staking yield
          <span className={"text-amber-400"}> 1x-5x </span> without ETH price
          volatility
        </p>
      </div>
    </div>
  );

  return (
    <>
      <ParallelBanner src={homepageBg} />
      <div className={"page-content"}>
        <div
          className={
            "z-10 flex gap-4 flex-col m-auto mt-[-24vw] md:mt-[-12vw] relative"
          }
        >
          {["Capital Efficiency is all you need, for Buy&Forget users."].map(
            (text, index) => {
              return (
                <h1 key={index}>
                  <TypeWriter text={text}></TypeWriter>
                </h1>
              );
            }
          )}
          <div className={"my-4"}></div>
          <h1 className={"font-normal text-2xl"}>
            Buy ETH price increase part{" "}
            <span className={"font-bold"}>at a discount</span>.
          </h1>
          <h1 className={"font-normal text-2xl"}>
            Get ETH staking yield with{" "}
            <span className={"font-bold"}>1x-5x</span> leverage.
          </h1>
        </div>
        <div className={"my-16"}></div>
        <div className={"flex flex-col lg:flex-row lg:items-stretch gap-16"}>
          <div className={"homepage-card w-full lg:w-5/12 shrink-0"}>
            <LazyImage src={Banner1} className={"w-1/2"} />
            <h6 className={"my-4 text-2xl"}>stETH Genesis Pool</h6>
            <p className={"text-neutral-400"}>
              ETH Leverage Ratio: <span className={"text-amber-400"}>3.6x</span>
            </p>
            <p className={"text-neutral-400"}>
              ETH Staking Yield Leverage Ratio:{" "}
              <span className={"text-amber-400 "}>1.5x</span>
            </p>
          </div>
          <div className={"flex-grow"}>
            <RatioChart />
          </div>
        </div>
        <div className={"my-8"}></div>
        {subBanner}
        <div className={"my-8"}></div>
        <div>
          <a
            className={"link-btn"}
            href={routeConfigs.find(e => e.name === "WeedPaper")?.path}
            target={"_blank"}
          >
            WeedPaper
          </a>
        </div>
        <div className={"my-16"}></div>
        <StETH_Diagram />
        <div className={"my-16"}></div>
        <div>
          <div className={"flex flex-col justify-center gap-6"}>
            <h2>
              LSD-Native Stablecoin,{" "}
              <span className={"text-amber-400"}>aUSD</span>
            </h2>
            <div
              className={
                "grid md:grid-cols-3 md:grid-rows-2 grid-cols-2 grid-rows-3 gap-4"
              }
            >
              <div className="feature-card">Stablecoin 3.0</div>
              <div className="feature-card">Real Use Scenarios</div>
              <div className="feature-card">Real High Yield</div>
              <div className="feature-card">Low Liquidation Risk</div>
              <div className="feature-card">High Capital Efficiency</div>
              <div className="feature-card">Most Scalable</div>
            </div>
            <h2 className={"mt-12"}>Core Technology</h2>
            <div
              className={
                "grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 grid-cols-1 gap-4"
              }
            >
              <div className="feature-card bg-neutral-900">
                Split Price Volatility and Yield
              </div>
              <div className="feature-card bg-neutral-900">
                Adscendo Smart Arbitrage Mechanism
              </div>
              <div className="feature-card bg-neutral-900">
                ADO Dynamic Buy-Back System
              </div>
            </div>
          </div>
          <div className={"mt-16"}>
            <a
              className={"link-btn"}
              href={routeConfigs.find(e => e.name === "Docs")?.path}
              target={"_blank"}
            >
              Docs
            </a>
          </div>
        </div>
      </div>
      <div
        className={
          "bg-cover md:bg-contain bg-no-repeat w-full bg-bottom aspect-[7/1] bottom-0 md:mt-[-24px]"
        }
        style={{
          backgroundImage: `linear-gradient(to top, transparent 0%, #000000 100%), url(${homepageFooter})`,
          zIndex: -1
        }}
      ></div>
    </>
  );
};

export default Homepage;
