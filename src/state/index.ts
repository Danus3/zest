import { atom } from "jotai";
import { normalizeNumber } from "../utils/number.tsx";
import { LIQ_PRICE } from "../constants.ts";

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

export const getSTETHPoolStats = atom(get => {
  const ethPrice = get(stEtherPriceAtom);
  return {
    stETHLocked: 0,
    stETHLockedUSD: 0,
    liquidityPrice: LIQ_PRICE,
    lstETHPrice: ethPrice - LIQ_PRICE,
    lstETHLeverageRatio: ethPrice / (ethPrice - LIQ_PRICE),
    lstETHCirculatingSupply: 0,
    aUSDCirculatingSupply: 0,
    ethPrice
  };
});
