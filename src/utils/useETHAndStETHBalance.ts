import { useAccount, useBalance } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";

const useETHAndStETHBalance = () => {
  const { address } = useAccount();

  const { data: ETHBalanceData } = useBalance({
    address,
    watch: true
  });

  const { data: stETHBalanceData } = useBalance({
    address,
    token: CONTRACT_ADDRESSES.stETH,
    watch: true
  });

  return [ETHBalanceData?.value || 0n, stETHBalanceData?.value || 0n];
};

export default useETHAndStETHBalance;
