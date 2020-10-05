export const BACKEND_BASE_URL = "127.0.0.1";
export const BACKEND_BASE_PORT = 3000;
export const API_PREFIX = process.env.API_PREFIX || 'https://mainnet-api.defichain.io/api';
export const WS_PREFIX =
  process.env.WS_PREFIX || API_PREFIX.slice(0, API_PREFIX.indexOf("api"));
export const CHAIN = process.env.CHAIN || "DFI";
export const NETWORK = process.env.NETWORK || "mainnet";
export const LATEST_BLOCKS_LIMIT = 10;
export const LATEST_TRANSACTIONS_LIMIT = 5;
export const QUICK_STATUS_INTERVAL = 60000;
export const DESKTOP_VIEW = { minWidth: 992 };
export const TABLET_VIEW = { minWidth: 768, maxWidth: 991 };
export const MOBILE_VIEW = { maxWidth: 767 };
export const UNIT_OPTIONS = ["DFI", "mDFI"];
export const BASE_UNIT = UNIT_OPTIONS[0];