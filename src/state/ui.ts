import { atom } from "jotai";

export const connectWalletModalAtom = atom(false);

export const transactionsToastAtom = atom<string[]>([] as string[]);
