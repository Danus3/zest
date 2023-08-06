import { ADOState, esADOState } from "../../state";
import { useAtomValue } from "jotai";
import { formatEtherToFixed, normalizeNumber } from "../../utils/number.tsx";
import useUserBalance from "../../hooks/useUserBalance.ts";
import ESADOVesting from "./vesting.tsx";
import EsADOOTC from "./OTC.tsx";
import VestingPositions from "./vestingPositions.tsx";
import TickleNumber from "../../components/TickleNumber.tsx";

const EsADO = () => {
  const { totalSupply, price, balance } = useAtomValue(ADOState);
  const { balance: esADOBalance } = useAtomValue(esADOState);

  useUserBalance();

  return (
    <div className={"page-content"}>
      <div className={"card"}>
        <div
          className={
            "grid md:grid-cols-4 md:grid-rows-1 grid-cols-2 grid-rows-2 gap-x-8 gap-y-4"
          }
        >
          <div className={"stack"}>
            <p>ADO Total Supply</p>
            <h3>{formatEtherToFixed(totalSupply, 0)}</h3>
          </div>
          <div className={"stack"}>
            <p>ADO Price</p>
            <h3>${normalizeNumber(price)}</h3>
          </div>
          <div className={"stack"}>
            <p>ADO Balance</p>
            <h3>
              <TickleNumber
                numberString={String(formatEtherToFixed(balance, 4))}
                continuously
              ></TickleNumber>
            </h3>
          </div>
          <div className={"stack"}>
            <p>esADO Balance</p>
            <h3>
              <TickleNumber
                numberString={String(formatEtherToFixed(esADOBalance, 4))}
                continuously
              ></TickleNumber>
            </h3>
          </div>
        </div>
      </div>
      <div className={"my-8"}></div>
      <div className="card p-2">
        <div
          className={
            "flexStack items-center md:items-start justify-between gap-2"
          }
        >
          <h3 className={"shrink-0"}>ADO Vest</h3>
          <p>
            The longer the vesting period of your esADO, the more ADO you will
            receive.
          </p>
          <div className={"shrink-0 text-right"}>
            <p>Balance: esADO {formatEtherToFixed(balance, 4)}</p>
            <p>ADO: {formatEtherToFixed(esADOBalance, 4)}</p>
          </div>
        </div>
        <div className="divider my-4"></div>
        <ESADOVesting />
      </div>
      <div className={"my-8"}></div>
      <EsADOOTC />
      <div className={"my-8"}></div>
      <VestingPositions />
    </div>
  );
};

export default EsADO;
