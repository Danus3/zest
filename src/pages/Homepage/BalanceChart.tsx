import balanceImg from "../../assets/balance.webp";

const BalanceChart = () => {
  return (
    <div className={"flex flex-col gap-4 mb-20 sm:mb-0 md:mb-36"}>
      <h1>Adscendo Protocol</h1>
      <p>Splitting Yield and Volatility of stETH</p>
      <div className={"flex flex-row gap-8 relative text-left text-black"}>
        <div className={"balance-square left"}>
          <p>
            aUSD: yield-bearing stablecoin
            <br />
            Get leveraged ETH staking yield from 6%-40%
          </p>
          <p>aUSD</p>
        </div>
        <div className={"balance-square right"}>
          <p>
            lstETH: leveraged stETH derivatives
            <br />
            Long ETH with 3x-6x Leverage without funding fees
          </p>
          <p className={"right-0"}>lstETH</p>
        </div>
        <img src={balanceImg} alt="balance" className={"balance-img"} />
      </div>
    </div>
  );
};

export default BalanceChart;
