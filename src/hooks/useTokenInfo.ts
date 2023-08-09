import { useContractReads } from "wagmi";
import { CONTRACT_ADDRESSES } from "@src/constants.ts";
import { useEffect } from "react";
import { useSetAtom } from "jotai/index";
import { ADOState, esADOState } from "@src/state";
import ADOABI from "@src/utils/ABIs/ADOABI.ts";
import esADOABI from "@src/utils/ABIs/esADOABI.ts";

const useTokenInfo = () => {
  const setADO = useSetAtom(ADOState);

  const setESAdO = useSetAtom(esADOState);
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
      }
    ]
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
    }
  }, [tokenInfoData, setADO, setESAdO]);
};

export default useTokenInfo;
