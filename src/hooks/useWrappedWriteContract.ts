import {
  useContractWrite,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useWaitForTransaction
} from "wagmi";
import { useDebounce } from "ahooks";
import { useEffect } from "react";
import { transactionsToastAtom } from "@src/state/ui.ts";
import { useSetAtom } from "jotai/index";

const useWrappedWriteContract = ({
  enabled = true,
  args,
  ...rest
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
    args: argsArr,
    enabled,
    ...rest
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      data &&
        setTransactions(prev => [
          ...prev,
          { hash: data.hash, status: "complete" }
        ]);
    }
  });

  useEffect(() => {
    if (data?.hash) {
      setTransactions(prev => [...prev, { hash: data.hash, status: "init" }]);
    }
  }, [data, setTransactions]);

  return { write, isLoading, isSuccess, isLoadingWrite };
};

// Path: src/hooks/useWrappedReadContract.ts

export default useWrappedWriteContract;
