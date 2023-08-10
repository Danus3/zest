import { formatEther } from "viem";

export const commas = (x: number | string) =>
  new Intl.NumberFormat(navigator.language).format(Number(x));

export const normalizeNumber = (x: number, decimal = 2) => {
  return parseFloat(x.toFixed(decimal));
};

export const formatEtherToFixed = (
  x: bigint,
  decimal = 4,
  addCommas = true
) => {
  // if (!x || x === 0n) {
  //   return 0;
  // }
  if (x === undefined) {
    return 0;
  }
  const res = parseFloat(Number(formatEther(x)).toFixed(decimal));
  if (addCommas) {
    return commas(res);
  } else {
    return res;
  }
};

export const formatEtherToNumber = (x: bigint) => {
  if (!x || x === 0n) {
    return 0;
  }
  return Number(formatEther(x));
};
