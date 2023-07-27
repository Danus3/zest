import { useAccount, useBalance } from "wagmi";

const useETHorStETHBalance = (selected: "ETH" | "stETH") => {
  const { address } = useAccount();

  const { data: ETHBalanceData } = useBalance({
    address
  });

  const { data: stETHBalanceData } = useBalance({
    address,
    token: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
  });

  return selected === "ETH"
    ? ETHBalanceData?.value || 0n
    : stETHBalanceData?.value || 0n;
};

export default useETHorStETHBalance;
