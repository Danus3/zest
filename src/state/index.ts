import { atom, ExtractAtomValue } from "jotai";
import { formatEtherToNumber, normalizeNumber } from "@src/utils/number.tsx";
import { LIQ_PRICE } from "@src/constants.ts";
import { atomWithImmer } from "jotai-immer";

export const stEtherPriceAtom = atom(0);

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

export const aUSDState = atomWithImmer({
  balance: BigInt(0),
  totalSupply: BigInt(0),
  price: 0
});

export const lstETHState = atomWithImmer({
  balance: BigInt(0),
  totalSupply: BigInt(0),
  price: 0
});

export const getAllPrices = atom(get => {
  return {
    stETHPrice: get(stEtherPriceAtom),
    adoPrice: get(ADOState).price,
    aUSDPrice: get(aUSDState).price,
    normalizedEthPrice: normalizeNumber(get(stEtherPriceAtom)),
    normalizedAdoPrice: normalizeNumber(get(ADOState).price),
    normalizedAUSDPrice: normalizeNumber(get(aUSDState).price)
  };
});

const poolState = atomWithImmer({
  stETHLocked: 0n,
  stETHLockedUSD: 0,
  liquidityPrice: LIQ_PRICE
});

export const getSTETHPoolStats = atom(
  get => {
    const stEthPrice = get(stEtherPriceAtom);
    const poolStates = get(poolState);
    return {
      ...poolStates,
      lstETHPrice: Math.max(0, stEthPrice - LIQ_PRICE),
      lstETHLeverageRatio: stEthPrice / Math.max(1, stEthPrice - LIQ_PRICE),
      stETHPrice: stEthPrice,
      stETHLockedUSD: stEthPrice * formatEtherToNumber(poolStates.stETHLocked)
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
