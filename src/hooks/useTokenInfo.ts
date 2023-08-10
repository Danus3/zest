import { useContractReads } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import { useEffect } from "react";
import { useSetAtom } from "jotai/index";
import {
  ADOState,
  aUSDState,
  esADOState,
  getSTETHPoolStats,
  lstETHState
} from "@src/state";
import ADOABI from "@src/utils/ABIs/ADOABI.ts";
import esADOABI from "@src/utils/ABIs/esADOABI.ts";
import aUSDABI from "@utils/ABIs/aUSDABI.ts";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import { AdscendoPoolABI } from "@utils/ABIs/AdscendoPoolABI.ts";

const useTokenInfo = () => {
  const setADO = useSetAtom(ADOState);

  const setESAdO = useSetAtom(esADOState);

  const setLstETH = useSetAtom(lstETHState);

  const setAUSD = useSetAtom(aUSDState);

  const setPool = useSetAtom(getSTETHPoolStats);

  const { data: tokenInfoData } = useContractReads({
    contracts: [
      {
        address: CONTRACT_ADDRESSES.ADO,
        abi: ADOABI,
        functionName: "totalSupply"
      },
      {
        address: CONTRACT_ADDRESSES.esADO,
        abi: esADOABI,
        functionName: "totalSupply"
      },
      {
        address: CONTRACT_ADDRESSES.aUSD,
        abi: aUSDABI,
        functionName: "totalSupply"
      },
      {
        address: CONTRACT_ADDRESSES.lstETH,
        abi: lstETHABI,
        functionName: "totalSupply"
      },
      {
        address: CONTRACT_ADDRESSES.adscendoPool,
        abi: AdscendoPoolABI,
        functionName: "stakedAmount"
      }
    ],
    watch: true
  });

  useEffect(() => {
    if (tokenInfoData) {
      setADO(prev => {
        prev.totalSupply = tokenInfoData[0].result as bigint;
        return prev;
      });
      setESAdO(prev => {
        prev.totalSupply = tokenInfoData[1].result as bigint;
        return prev;
      });
      setAUSD(prev => {
        prev.totalSupply = tokenInfoData[2].result as bigint;
      });
      setLstETH(prev => {
        prev.totalSupply = tokenInfoData[3].result as bigint;
        return prev;
      });
      setPool({
        stETHLocked: tokenInfoData[4].result as bigint
      });
    }
  }, [tokenInfoData, setADO, setESAdO, setLstETH, setAUSD, setPool]);
};

export default useTokenInfo;
