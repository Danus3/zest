import { useAccount, useBalance } from "wagmi";
import { CONTRACT_ADDRESSES } from "../constants.ts";

const useETHorStETHBalance = (selected: "ETH" | "stETH") => {
  const { address } = useAccount();

  const { data: ETHBalanceData } = useBalance({
    address
  });

  const { data: stETHBalanceData } = useBalance({
    address,
    token: CONTRACT_ADDRESSES.stETH
  });

  return selected === "ETH"
    ? ETHBalanceData?.value || 0n
    : stETHBalanceData?.value || 0n;
};

export default useETHorStETHBalance;
