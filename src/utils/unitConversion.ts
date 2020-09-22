import { BigNumber } from 'bignumber.js';

export const conversion = (from: string, to: string, value: string | number) => {
  const bigNumber = new BigNumber(value);
  return bigNumber
    .multipliedBy(from)
    .dividedBy(to)
    .toString(10);
};
