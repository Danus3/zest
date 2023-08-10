import InputWithMax from "@src/components/InputWithMax.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { aUSDState, lstETHState } from "@state";
import { formatEtherToNumber } from "@utils/number.tsx";

const Redeem = () => {
  const { balance: AUSDBalance } = useAtomValue(aUSDState);
  const { balance: lstETHBalance } = useAtomValue(lstETHState);

  return (
    <div>
      <p>Burn aUSD and lstETH to get stETH.</p>
      <p>
        AUSD balance: {formatEtherToNumber(AUSDBalance)}, lstETHBalance:{" "}
        {formatEtherToNumber(lstETHBalance)}
      </p>
      <div className={"my-4"}></div>
      <div className={"flex flex-row justify-between items-center gap-2"}>
        <InputWithMax
          value={"0"}
          setValue={() => void 0}
          onMaxClick={() => void 0}
        />
        <PlusCircledIcon />
        <InputWithMax
          value={"0"}
          setValue={() => void 0}
          onMaxClick={() => void 0}
        />
      </div>
      <div className={"my-8"}></div>
      <p>Redeem</p>
      <div className={"my-2"}></div>
      <div
        className={
          "border-amber-400 border-[1px] rounded-md w-full text-center py-1"
        }
      >
        1stETH
      </div>
      <div className={"my-8"}></div>
      <button className={"bg-amber-400 text-black w-full emphasis"}>
        Redeem
      </button>
    </div>
  );
};

export default Redeem;
