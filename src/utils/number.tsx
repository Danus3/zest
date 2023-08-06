import { formatEther } from "viem";

export const commas = (x: number | string) =>
  new Intl.NumberFormat(navigator.language).format(Number(x));

export const normalizeNumber = (x: number, decimal = 2) => {
  return parseFloat(x.toFixed(decimal));
};

export const formatEtherToFixed = (
  x: bigint,
  decimal = 2,
  addCommas = true
) => {
  const res = parseFloat(Number(formatEther(x)).toFixed(decimal));
  return addCommas ? commas(res) : res;
};

export const formatEtherToNumber = (x: bigint) => {
  return Number(formatEther(x));
};
