import {
  useContractWrite,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useWaitForTransaction
} from "wagmi";
import { useDebounce } from "ahooks";
import { useEffect } from "react";
import { transactionsToastAtom } from "../state/ui.ts";
import { useSetAtom } from "jotai/index";

const useWrappedWriteContract = ({
  address,
  abi,
  functionName,
  args,
  enabled = true
}: UsePrepareContractWriteConfig) => {
  const argsArr = [];

  const setTransactions = useSetAtom(transactionsToastAtom);

  if (args) {
    for (let i = 0; i < args.length; i++) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const debouncedArg = useDebounce(args[i], {
        wait: 1000,
        leading: true,
        trailing: true
      });
      argsArr.push(debouncedArg);
    }
  }

  const { config, isLoading: isLoadingWrite } = usePrepareContractWrite({
    address,
    abi,
    functionName,
    args: argsArr,
    enabled
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  useEffect(() => {
    if (data?.hash) {
      setTransactions(prev => [...prev, data.hash]);
    }
  }, [data, setTransactions]);

  return { write, isLoading, isSuccess, isLoadingWrite };
};

// Path: src/hooks/useWrappedReadContract.ts

export default useWrappedWriteContract;
