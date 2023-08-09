import balanceImg from "@src/assets/balance.webp";

const BalanceChart = () => {
  return (
    <div className={"flex flex-col gap-4 mb-20 sm:mb-0 md:mb-36"}>
      <h1>Adscendo Protocol</h1>
      <p>Splitting Yield and Volatility of stETH</p>
      <div className={"flex flex-row gap-8 relative text-center text-black"}>
        <div className={"balance-square left"}>
          <p>
            I'm risk-averse. <br />I just want to hold stablecoins to earn a
            higher annual return.
          </p>
          <p>aUSD</p>
        </div>
        <div className={"balance-square right"}>
          <p>
            I'm bullish on the market. <br />I want to hold leveraged stETH for
            higher returns during a bull market.
          </p>
          <p className={"right-0"}>lstETH</p>
        </div>
        <img src={balanceImg} alt="balance" className={"balance-img"} />
      </div>
    </div>
  );
};

export default BalanceChart;
