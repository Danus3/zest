import { atom } from "jotai";

export const transactionsToastAtom = atom<
  {
    hash: string;
    status: "init" | "complete";
  }[]
>([]);
