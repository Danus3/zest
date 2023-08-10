import { Address, useAccount, useContractReads } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import { useSetAtom } from "jotai";
import { ADOState, aUSDState, esADOState, lstETHState } from "@src/state";
import { useEffect } from "react";
import aUSDABI from "@utils/ABIs/aUSDABI.ts";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import ADOABI from "@utils/ABIs/ADOABI.ts";
import esADOABI from "@utils/ABIs/esADOABI.ts";

const useUserBalance = () => {
  const setADO = useSetAtom(ADOState);

  const setESAdO = useSetAtom(esADOState);

  const setAUSD = useSetAtom(aUSDState);

  const setLstETH = useSetAtom(lstETHState);

  const { address } = useAccount();

  const { data: accountInfoData } = useContractReads({
    contracts: [
      {
        address: CONTRACT_ADDRESSES.ADO,
        abi: ADOABI,
        functionName: "balanceOf",
        args: [address as Address]
      },
      {
        address: CONTRACT_ADDRESSES.esADO,
        abi: esADOABI,
        functionName: "balanceOf",
        args: [address as Address]
      },
      {
        address: CONTRACT_ADDRESSES.aUSD,
        abi: aUSDABI,
        functionName: "balanceOf",
        args: [address as Address]
      },
      {
        address: CONTRACT_ADDRESSES.lstETH,
        abi: lstETHABI,
        functionName: "balanceOf",
        args: [address as Address]
      }
    ],
    watch: true,
    enabled: !!address
  });

  useEffect(() => {
    if (!accountInfoData) return;
    setADO(prev => {
      prev.balance = accountInfoData[0].result as bigint;
      return prev;
    });
    setESAdO(prev => {
      prev.balance = accountInfoData[1].result as bigint;
      return prev;
    });
    setAUSD(prev => {
      prev.balance = accountInfoData[2].result as bigint;
      return prev;
    });
    setLstETH(prev => {
      prev.balance = accountInfoData[3].result as bigint;
      return prev;
    });
  }, [accountInfoData, setADO, setESAdO, setAUSD, setLstETH]);
};

export default useUserBalance;
