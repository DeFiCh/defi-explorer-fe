import moment from 'moment';
import {
  DEFAULT_UNIT,
  MAINNET_BASE_PATH,
  SYMBOL_MAPPINGS,
  TESTNET_BASE_PATH,
} from '../constants';
import { unitConversion } from './unitConversion';
import DefiIcon from '../assets/svg/defi-icon.svg';
import BCHIcon from '../assets/svg/bch-icon.svg';
import BTCIcon from '../assets/svg/icon-coin-bitcoin-lapis.svg';
import EthIcon from '../assets/svg/eth-icon.svg';
import DogeIcon from '../assets/svg/doge-icon.svg';
import LtcIcon from '../assets/svg/ltc-icon.svg';
import USDTIcon from '../assets/svg/usdt-icon.svg';
import store from '../app/rootStore';
import BigNumber from 'bignumber.js';

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

export const convertToSentenceCase = (string) => {
  const rg = /(^\s*\w|[\.\!\?]\s*\w)/g;
  const sentence = string.replace(/(^|\s)\S/g, (t) => t.toLowerCase());
  const convertedString = sentence
    .toLowerCase()
    .replace(rg, (c) => c.toUpperCase());
  return convertedString;
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

export const getIcon = (symbol: string) => {
  const dataObj = {
    BTC: BTCIcon,
    ETH: EthIcon,
    DFI: DefiIcon,
    USDT: USDTIcon,
    DOGE: DogeIcon,
    LTC: LtcIcon,
    BCH: BCHIcon,
  };
  return dataObj[symbol];
};

export const setRoute = (route) => {
  const {
    app: { network },
  } = store.getState();
  if (network === 'mainnet') {
    return `${MAINNET_BASE_PATH}/${route}`;
  }
  return `${TESTNET_BASE_PATH}/${route}`;
};

export const getCoinGeckoIdwithSymbol = (symbol) =>
  SYMBOL_MAPPINGS[symbol] ?? '';

export const tableSorter = (flip, fieldName) => (a, b) => {
  if (flip) {
    if (a[fieldName] > b[fieldName]) {
      return -1;
    }
    if (a[fieldName] < b[fieldName]) {
      return 1;
    }
  } else {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
  }
  return 0;
};

export const getIdFromSymbol = (symbol) => {
  const mapId = {
    DFI: 0,
    BTC: 1,
    ETH: 2,
    USDT: 5,
  };
  return mapId[symbol] || symbol;
};

export const numberWithCommas = (nStr, tofixed?) => {
  if (tofixed) {
    nStr = new BigNumber(nStr).toFixed(tofixed);
  }
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export const getNetworkNameFromLocation = (pathname) =>
  pathname.split('/').filter((item) => !!item)[0];

export const camelCaseToNormalCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
