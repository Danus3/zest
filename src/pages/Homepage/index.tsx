import homepageBg from "@assets/homepage-bg.jpg";

const Homepage = () => {
  return (
    <div className={"pt-80 flex flex-col items-center m-auto"}>
      <h1>Capital Efficiency is all you need, for Buy&Forget users.</h1>
      <div className={"flex pt-24 text-3xl justify-center gap-4"}>
        <div>Buy ETH price increase part as a discount</div>
        <div>
          Get ETH staking yield with
          <span className={"text-amber-400"}>1x-5x</span>leverage
        </div>
      </div>
      <div>
        <div className={"h-64"}>
          <h6>stETH Genesis Pool</h6>
          <p>
            ETH Leverage Ratio: <span className={"text-amber-400"}>1.5x</span>
          </p>
          <p>
            ETH Staking Yield Leverage Ratio:
            <span className={"text-amber-400"}>1.5x</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
