import useTabFocused from "@hooks/utils/useTabFocused.ts";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import { aUSDState, lstETHState } from "@src/state";
import aUSDABI from "@utils/ABIs/aUSDABI.ts";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Address, useAccount, useContractReads } from "wagmi";

const useUserBalance = () => {
  // const setADO = useSetAtom(ADOState);

  // const setESAdO = useSetAtom(esADOState);

  const setZUSD = useSetAtom(aUSDState);

  const setmirrorETH = useSetAtom(lstETHState);

  const { address } = useAccount();

  const focused = useTabFocused();

  const { data: accountInfoData } = useContractReads({
    contracts: [
      // {
      //   address: CONTRACT_ADDRESSES.ADO,
      //   abi: ADOABI,
      //   functionName: "balanceOf",
      //   args: [address as Address],
      // },
      // {
      //   address: CONTRACT_ADDRESSES.esADO,
      //   abi: esADOABI,
      //   functionName: "balanceOf",
      //   args: [address as Address],
      // },
      {
        address: CONTRACT_ADDRESSES.zUSD,
        abi: aUSDABI,
        functionName: "balanceOf",
        args: [address as Address],
      },
      {
        address: CONTRACT_ADDRESSES.mirrorETH,
        abi: lstETHABI,
        functionName: "balanceOf",
        args: [address as Address],
      },
    ],
    watch: focused,
    enabled: !!address,
  });

  useEffect(() => {
    if (!accountInfoData) return;
    // setADO((prev) => {
    //   prev.balance = (accountInfoData[0].result as bigint) ?? 0n;
    //   return prev;
    // });
    // setESAdO((prev) => {
    //   prev.balance = (accountInfoData[1].result as bigint) ?? 0n;
    //   return prev;
    // });
    setZUSD((prev) => {
      prev.balance = (accountInfoData[0].result as bigint) ?? 0n;
      return prev;
    });
    setmirrorETH((prev) => {
      prev.balance = (accountInfoData[1].result as bigint) ?? 0n;
      return prev;
    });
  }, [accountInfoData, setZUSD, setmirrorETH]);
};

export default useUserBalance;
