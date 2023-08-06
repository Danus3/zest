import { atom, ExtractAtomValue } from "jotai";
import { normalizeNumber } from "../utils/number.tsx";
import { LIQ_PRICE } from "../constants.ts";
import { atomWithImmer } from "jotai-immer";

export const stEtherPriceAtom = atom(0);

export const adoPriceAtom = atom(0);

export const aUSDPriceAtm = atom(0);

export const getAllPrices = atom(get => {
  return {
    ethPrice: get(stEtherPriceAtom),
    adoPrice: get(adoPriceAtom),
    aUSDPrice: get(aUSDPriceAtm),
    normalizedEthPrice: normalizeNumber(get(stEtherPriceAtom)),
    normalizedAdoPrice: normalizeNumber(get(adoPriceAtom)),
    normalizedAUSDPrice: normalizeNumber(get(aUSDPriceAtm))
  };
});

export const ADOState = atomWithImmer({
  totalSupply: BigInt(0),
  price: 0,
  balance: BigInt(0)
});

export const esADOState = atomWithImmer({
  balance: BigInt(0),
  totalSupply: BigInt(0),
  price: 0
});

const poolState = atomWithImmer({
  stETHLocked: 0,
  stETHLockedUSD: 0,
  liquidityPrice: LIQ_PRICE,
  lstETHCirculatingSupply: BigInt(0),
  aUSDCirculatingSupply: BigInt(0)
});

export const getSTETHPoolStats = atom(
  get => {
    const ethPrice = get(stEtherPriceAtom);
    const poolStates = get(poolState);
    return {
      ...poolStates,
      lstETHPrice: Math.max(0, ethPrice - LIQ_PRICE),
      lstETHLeverageRatio: ethPrice / Math.max(1, ethPrice - LIQ_PRICE),
      ethPrice
    };
  },
  (get, set, newValue: Partial<ExtractAtomValue<typeof poolState>>) => {
    const prevPoolState = get(poolState);
    set(poolState, {
      ...prevPoolState,
      ...newValue
    });
  }
);
