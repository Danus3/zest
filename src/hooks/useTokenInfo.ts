import useTabFocused from "@hooks/utils/useTabFocused.ts";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import {
  ADOState,
  aUSDState,
  esADOState,
  getSTETHPoolStats,
  lstETHState,
} from "@src/state";
import { zESTABI } from "@utils/ABIs/ZestABI";
import aUSDABI from "@utils/ABIs/aUSDABI.ts";
import lstETHABI from "@utils/ABIs/lstETHABI.ts";
import { useSetAtom } from "jotai/index";
import { useEffect } from "react";
import { useContractReads } from "wagmi";

const useTokenInfo = () => {
  const setADO = useSetAtom(ADOState);
  const focused = useTabFocused();

  const setESAdO = useSetAtom(esADOState);

  const setLstETH = useSetAtom(lstETHState);

  const setAUSD = useSetAtom(aUSDState);

  const setPool = useSetAtom(getSTETHPoolStats);

  const { data: tokenInfoData } = useContractReads({
    contracts: [
      // {
      //   address: CONTRACT_ADDRESSES.ADO,
      //   abi: ADOABI,
      //   functionName: "totalSupply",
      // },
      // {
      //   address: CONTRACT_ADDRESSES.esADO,
      //   abi: esADOABI,
      //   functionName: "totalSupply",
      // },
      {
        address: CONTRACT_ADDRESSES.zUSD,
        abi: aUSDABI,
        functionName: "totalSupply",
      },
      {
        address: CONTRACT_ADDRESSES.mirrorETH,
        abi: lstETHABI,
        functionName: "totalSupply",
      },
      {
        address: CONTRACT_ADDRESSES.zEST,
        abi: zESTABI,
        functionName: "stakedAmount",
      },
    ],
    watch: focused,
  });

  useEffect(() => {
    if (tokenInfoData) {
      // setADO((prev) => {
      //   prev.totalSupply = (tokenInfoData[0].result as bigint) ?? 0n;
      //   return prev;
      // });
      // setESAdO((prev) => {
      //   prev.totalSupply = (tokenInfoData[1].result as bigint) ?? 0n;
      //   return prev;
      // });
      setAUSD((prev) => {
        prev.totalSupply = (tokenInfoData[0].result as bigint) ?? 0n;
      });
      setLstETH((prev) => {
        prev.totalSupply = (tokenInfoData[1].result as bigint) ?? 0n;
        return prev;
      });
      setPool({
        stETHLocked: (tokenInfoData[2].result as bigint) ?? 0n,
      });
    }
  }, [tokenInfoData, setADO, setESAdO, setLstETH, setAUSD, setPool]);
};

export default useTokenInfo;
