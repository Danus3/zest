import { atom } from "jotai";
import { normalizeNumber } from "../utils/number.tsx";

export const ethPriceAtom = atom(0);

export const adoPriceAtom = atom(0);

export const aUSDPriceAtm = atom(0);

export const getAllPrices = atom(get => {
  return {
    ethPrice: get(ethPriceAtom).toFixed(2),
    adoPrice: normalizeNumber(get(adoPriceAtom), 2),
    aUSDPrice: normalizeNumber(get(aUSDPriceAtm), 2),
    ethPriceNumber: get(ethPriceAtom),
    adoPriceNumber: get(adoPriceAtom),
    aUSDPriceNumber: get(aUSDPriceAtm)
  };
});

export const connectWalletModalAtom = atom(false);
