import { atom, ExtractAtomValue } from "jotai";
import { formatEtherToNumber, normalizeNumber } from "@src/utils/number.tsx";
import { LIQ_PRICE } from "@src/constants.ts";
import { atomWithImmer } from "jotai-immer";

export const stEtherPriceAtom = atom(0);

export const ADOState = atomWithImmer({
  totalSupply: 0n,
  price: 0,
  balance: 0n,
});

export const esADOState = atomWithImmer({
  balance: 0n,
  totalSupply: 0n,
  price: 0,
});

export const aUSDState = atomWithImmer({
  balance: 0n,
  totalSupply: 0n,
  price: 1,
});

export const lstETHState = atomWithImmer({
  balance: 0n,
  totalSupply: 0n,
  price: 0,
});

export const getAllPrices = atom((get) => {
  return {
    stETHPrice: get(stEtherPriceAtom),
    adoPrice: get(ADOState).price,
    aUSDPrice: get(aUSDState).price,
    normalizedEthPrice: normalizeNumber(get(stEtherPriceAtom)),
    normalizedAdoPrice: normalizeNumber(get(ADOState).price),
    normalizedAUSDPrice: normalizeNumber(get(aUSDState).price),
  };
});

const poolState = atomWithImmer({
  stETHLocked: 0n,
  stETHLockedUSD: 0,
  liquidityPrice: LIQ_PRICE,
});

export const getSTETHPoolStats = atom(
  (get) => {
    const ethPrice = get(stEtherPriceAtom);
    const poolStates = get(poolState);
    return {
      ...poolStates,
      lstETHPrice: Math.max(0, ethPrice - LIQ_PRICE),
      lstETHLeverageRatio: ethPrice / Math.max(1, ethPrice - LIQ_PRICE),
      stETHPrice: ethPrice,
      stETHLockedUSD: ethPrice * formatEtherToNumber(poolStates.stETHLocked),
    };
  },
  (get, set, newValue: Partial<ExtractAtomValue<typeof poolState>>) => {
    const prevPoolState = get(poolState);
    set(poolState, {
      ...prevPoolState,
      ...newValue,
    });
  }
);
