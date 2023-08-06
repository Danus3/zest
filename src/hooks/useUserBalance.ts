import { useAccount, useBalance } from "wagmi";
import { CONTRACT_ADDRESSES } from "../constants.ts";
import { useSetAtom } from "jotai";
import { ADOState, esADOState } from "../state";
import { useEffect } from "react";

const useUserBalance = () => {
  const setADO = useSetAtom(ADOState);

  const setESAdO = useSetAtom(esADOState);

  const { address } = useAccount();
  const { data: ADOData } = useBalance({
    address,
    // watch: true,
    token: CONTRACT_ADDRESSES.ADO,
    watch: true
  });

  const { data: esADOData } = useBalance({
    address,
    // watch: true,
    token: CONTRACT_ADDRESSES.esADO,
    watch: true
  });

  useEffect(() => {
    console.log("set!");
    ADOData &&
      setADO(prev => {
        prev.balance = ADOData.value;
        return prev;
      });
    esADOData &&
      setESAdO(prev => {
        prev.balance = esADOData.value;
        return prev;
      });
  }, [ADOData, esADOData, setADO, setESAdO]);
};

export default useUserBalance;
