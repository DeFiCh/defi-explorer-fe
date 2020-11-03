import moment from 'moment';
import { DEFAULT_UNIT } from '../constants';
import { unitConversion } from './unitConversion';
import DefiIcon from '../assets/svg/defi-icon.svg';
import BTCIcon from '../assets/svg/icon-coin-bitcoin-lapis.svg';
import EthIcon from '../assets/svg/eth-icon.svg';
import USDTIcon from '../assets/svg/usdt-icon.svg';

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

export const getTime = (time: Date | string | number) => {
  if (typeof time === 'number') {
    return moment(time * 1000).format('lll');
  }
  return moment(time).format('lll');
};

export const getTimeFromNow = (time: Date | string | number) => {
  if (typeof time === 'number') {
    return moment(time * 1000).fromNow();
  }
  return moment(time).fromNow();
};

export const getIcon = (symbol: string | null) => {
  if (symbol === 'BTC') {
    return BTCIcon;
  } else if (symbol === 'ETH') {
    return EthIcon;
  } else if (symbol === 'USDT') {
    return USDTIcon;
  } else {
    return DefiIcon;
  }
};
