import { version } from '../../package.json';
export const BACKEND_BASE_URL = '127.0.0.1';
export const BACKEND_BASE_PORT = 3000;
export const MAINNET_API_PREFIX =
  process.env.MAINNET_API_PREFIX || 'https://mainnet-api.defichain.io/api';
export const MAINNET_EXPLORER =
  process.env.MAINNET_EXPLORER || 'https://mainnet.defichain.io/#/DFI/mainnet/';
export const TESTNET_EXPLORER =
  process.env.TESTNET_EXPLORER || 'https://testnet.defichain.io/#/DFI/testnet/';
export const TESTNET_API_PREFIX =
  process.env.TESTNET_API_PREFIX || 'https://testnet-api.defichain.io/api';
export const MAINNET_WS_PREFIX =
  process.env.MAINNET_WS_PREFIX || 'https://mainnet-api.defichain.io/';
export const TESTNET_WS_PREFIX =
  process.env.TESTNET_WS_PREFIX || 'https://testnet-api.defichain.io/';
export const CHAIN = process.env.CHAIN || 'DFI';
export const NETWORK = process.env.NETWORK || 'mainnet';
export const LATEST_BLOCKS_LIMIT = 10;
export const SWAP_LIST_TABLE_LIMIT = 20;
export const BLOCKS_LIST_PAGE_LIMIT = 10;
export const TOKENS_LIST_PAGE_LIMIT = 10;
export const ADDRESS_TOKENS_LIST_PAGE_LIMIT = 10;
export const LATEST_TRANSACTIONS_LIMIT = 5;
export const BLOCK_PAGE_TRANSACTIONS_LIMIT = 10;
export const TRANSACTIONS_LIST_PAGE_LIMIT = 10;
export const RICH_LIST_PAGE_LIMIT = 10;
export const QUICK_STATUS_INTERVAL = 60000;
export const RICH_LIST_INTERVAL = 60000;
export const DESKTOP_VIEW = { minWidth: 768 };
export const MOBILE_VIEW = { maxWidth: 767 };
export const VERSION_NUM = version;
export const FOOTER_DEFICHAIN_STAMP = `DefiChain Explorer v${VERSION_NUM}`;
export const VS_CURRENCIES = 'usd';
export const LP_DAILY_DFI_REWARD = 'LP_DAILY_DFI_REWARD';
export const DEFAULT_DECIMAL_PLACE = 2;
export const BURN_ADDRESS = '8defichainDSTBurnAddressXXXXaCAuTq';
export const GRANULARITY_ALLDAY = 'ALLDAY';
export const GRANULARITY_YTD = 'YTD';
export const GRANULARITY_MONTH = 'M';
export const GRANULARITY_WEEK = 'W';
export const GRANULARITY_DAY = 'D';
