import { ADOState } from "../../state";
import { useAtomValue } from "jotai";
import {
  formatEtherToFixed,
  formatEtherToNumber,
  normalizeNumber
} from "../../utils/number.tsx";
import useUserBalance from "../../hooks/useUserBalance.ts";
import ESADOVesting from "./vesting.tsx";
import EsADOOTC from "./OTC.tsx";
import VestingPositions from "./vestingPositions.tsx";
import { ADO_MAX_SUPPLY } from "../../constants.ts";

const EsADO = () => {
  const { totalSupply, price } = useAtomValue(ADOState);

  useUserBalance();

  return (
    <div className={"page-content"}>
      <div className={"card"}>
        <div
          className={
            "grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 gap-x-8 gap-y-4"
          }
        >
          <div className={"flexRow justify-between items-center"}>
            <p>ADO Circulating</p>
            <h3>{formatEtherToFixed(totalSupply)}</h3>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>ADO Price</p>
            <h3>${normalizeNumber(price)}</h3>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>ADO Burned</p>
            <h3>{ADO_MAX_SUPPLY - formatEtherToNumber(totalSupply)}</h3>
          </div>
          <div className={"flexRow justify-between items-center"}>
            <p>ADO Buyback</p>
            <h3>{ADO_MAX_SUPPLY - formatEtherToNumber(totalSupply)}</h3>
          </div>
        </div>
      </div>
      <div className={"my-8"}></div>
      <div className="card p-2">
        <div className={"flexStack items-center justify-between gap-2"}>
          <h3 className={"shrink-0"}>ADO</h3>
          <p>
            The longer the vesting period of your esADO, the more ADO you will
            receive.
          </p>
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
