import Banner1 from "@assets/homepage-banner-1.png";
import "./homepage.css";
import LazyImage from "../../components/image.tsx";
import { routeConfigs } from "../../config.ts";
import homepageBg from "@assets/homepage-bg.jpg";
import homepageFooter from "@assets/homepage-footer.jpg";

const Homepage = () => {
  return (
    <>
      <div className={"flex flex-col items-center gap-16 page-content"}>
        <div
          className={
            "bg-cover absolute md:bg-contain bg-no-repeat w-full bg-top aspect-square md:aspect-[3/1]"
          }
          style={{
            backgroundImage: `linear-gradient(180deg, transparent 0%, black 100%), url(${homepageBg})`,
            zIndex: -1
          }}
        ></div>
        <h1 className={"pt-32 md:pt-56"}>
          Capital Efficiency is all you need, for Buy&Forget users.
        </h1>
        <div className={"flex pt-12 justify-center gap-4"}>
          <h2>Buy ETH price increase part as a discount</h2>
          <h2>
            Get ETH staking yield with{" "}
            <span className={"text-amber-400"}>1x-5x</span> leverage
          </h2>
        </div>
        <div>
          <div className={"homepage-card m-auto px-12 md:px-16 lg:px-32"}>
            <LazyImage src={Banner1} className={"w-full"} />
            <h6 className={"my-4 text-2xl"}>stETH Genesis Pool</h6>
            <p>
              ETH Leverage Ratio: <span className={"text-amber-400"}>1.5x</span>
            </p>
            <p>
              ETH Staking Yield Leverage Ratio:{" "}
              <span className={"text-amber-400 "}>1.5x</span>
            </p>
          </div>
          <div
            className={
              "flex gap-4 flex-col md:flex-row justify-center items-center"
            }
          >
            <div className={"homepage-card px-3"}>
              <h2>
                Long ETH with <span className={"text-amber-400"}>3x-6x</span>{" "}
                Leverage
              </h2>
              <p className={"mt-4"}>
                Enjoy on-chain leverage without{" "}
                <span className={"text-amber-400"}>
                  funding fees & liquidation risk
                </span>
              </p>
            </div>
            <div className={"homepage-card px-3"}>
              <h2>Leverage ETH Staking Yield</h2>
              <p className={"mt-4"}>
                Enjoy ETH staking yield with
                <span className={"text-amber-400"}> 1x-5x </span>
                leverage without ETH price volatility
              </p>
            </div>
          </div>
          <div>
            <a
              className={"link-btn"}
              href={routeConfigs.find(e => e.name === "WeedPaper")?.path}
              target={"_blank"}
            >
              WeedPaper
            </a>
          </div>
        </div>
      </div>
      <div className={"bg-[#1A1811] mt-28 pt-20"}>
        <div className={"page-content flex flex-col justify-center gap-6"}>
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
            <div className="feature-card">Real use scenarios</div>
            <div className="feature-card">Real high yield</div>
            <div className="feature-card">Low Liquidation Risk</div>
            <div className="feature-card">High Capital Efficiency</div>
            <div className="feature-card">Most scalable</div>
          </div>
          <h2 className={"mt-12"}>Core Technology</h2>
          <div
            className={
              "grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 grid-cols-1 gap-4"
            }
          >
            <div className="feature-card">Split Price Volatility and Yield</div>
            <div className="feature-card">
              Adscendo Smart Arbitrage Mechanism
            </div>
            <div className="feature-card">veADO</div>
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
      <div
        className={
          "bg-cover md:bg-contain bg-no-repeat w-full bg-bottom aspect-[7/1] bottom-0 md:mt-[-24px]"
        }
        style={{
          backgroundImage: `linear-gradient(to top, transparent 0%, #1A1811 100%), url(${homepageFooter})`,
          zIndex: -1
        }}
      ></div>
    </>
  );
};

export default Homepage;
