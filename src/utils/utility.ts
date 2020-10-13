import { DEFAULT_UNIT } from '../constants';
import { unitConversion } from './unitConversion';

export const setIntervalSynchronous = (func, delay) => {
  let intervalFunction;
  let timeoutId;
  let clear;
  clear = () => {
    clearTimeout(timeoutId);
  };
  intervalFunction = () => {
    func();
    timeoutId = setTimeout(intervalFunction, delay);
  };
  timeoutId = setTimeout(intervalFunction, delay);
  return clear;
};

export const isInputValid = (inputValue) => {
  if (isValidBlockOrTx(inputValue)) {
    return { isValid: true, type: 'blockOrTx' };
    // } else if (this.isValidAddress(inputValue)) {
    //   return { isValid: true, type: 'addr' };
  } else if (isValidBlockIndex(inputValue)) {
    return { isValid: true, type: 'blockOrTx' };
  } else {
    return { isValid: false, type: 'invalid' };
  }
};

const isValidBlockOrTx = (inputValue) => {
  const regexp = /^[0-9a-fA-F]{64}$/;
  if (regexp.test(inputValue)) {
    return true;
  } else {
    return false;
  }
};

const isValidBlockIndex = (inputValue) => isFinite(inputValue);
export const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range: number[] = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const fetchPageNumbers = (
  currentPage: number,
  totalPages: number,
  pageNeighbors: number
) => {
  const totalNumbers = pageNeighbors * 2;
  const totalBlocks = totalNumbers + 1;
  if (totalPages >= totalBlocks) {
    const prev =
      currentPage === totalPages
        ? currentPage - pageNeighbors - 1
        : currentPage - pageNeighbors;
    const next =
      currentPage === 1
        ? currentPage + pageNeighbors + 1
        : currentPage + pageNeighbors;
    const startPage = Math.max(1, prev);
    const endPage = Math.min(totalPages, next);
    return range(startPage, endPage);
  }
  return range(1, totalPages);
};

export const getAmountInSelectedUnit = (
  amount: number | string,
  toUnit: string,
  from: string = DEFAULT_UNIT
) => {
  const to = toUnit;
  return unitConversion(from, to, amount);
};
