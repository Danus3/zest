import { useAccount, useBalance } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import useTabFocused from "@hooks/utils/useTabFocused.ts";
import { isPublicSalePage } from "@src/config.tsx";

const useETHAndStETHBalance = () => {
  const { address } = useAccount();

  const focused = useTabFocused();

  const { data: ETHBalanceData } = useBalance({
    address,
    watch: focused
  });

  const { data: stETHBalanceData } = useBalance({
    address,
    token: isPublicSalePage
      ? "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
      : CONTRACT_ADDRESSES.stETH,
    watch: focused
  });

  return [ETHBalanceData?.value || 0n, stETHBalanceData?.value || 0n];
};

export default useETHAndStETHBalance;
