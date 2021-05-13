import { NETWORK } from './configs';
export const BLOCKCHAIN_BASE_PATH = '/blockchain';
export const BLOCKCHAIN_BLOCK_BASE_PATH = `${BLOCKCHAIN_BASE_PATH}/block`;
export const BLOCKCHAIN_BLOCK_PARAM_PATH = `${BLOCKCHAIN_BLOCK_BASE_PATH}/:height`;
export const BLOCKCHAIN_MINER_BASE_PATH = `${BLOCKCHAIN_BASE_PATH}/miner`;
export const BLOCKCHAIN_MINER_PARAM_PATH = `${BLOCKCHAIN_MINER_BASE_PATH}/:id`;
export const INDEX_PATH = '/index.html';
export const HOME_PAGE_PATH = '/';
export const BLOCKS_PAGE = '/blocks';
export const RICH_LIST_PATH = '/rich-List';
export const BROADCAST_MESSAGE_PATH = '/broadcast-message';
export const VERIFY_MESSAGE_PATH = '/verify-message';

export const BLOCK_PAGE_BASE_PATH = `/block`;
export const TRANSACTION_BASE_PATH = `/tx`;

export const ADDRESS_BASE_PATH = `/address`;

export const TRANSACTION_PAGE_INFO_PATH = `${TRANSACTION_BASE_PATH}/:txId`;
export const BLOCK_PAGE_INFO_PATH = `${BLOCK_PAGE_BASE_PATH}/:blockHash`;
export const ADDRESS_PAGE_BASE_PATH = `${ADDRESS_BASE_PATH}/:address`;
export const ANCHOR_PAGE = `${BLOCK_PAGE_BASE_PATH}/anchorsOnly`;
export const DEFAULT_BASE_PATH = `/${NETWORK}`;

export const POOL_LIST_PAGE_URL_NAME = 'pool';
export const TOKEN_LIST_PAGE_URL_NAME = 'token';
export const ANCHORS_LIST_PAGE_URL_NAME = 'anchors';
export const ADDRESS_URL_NAME = 'address';
export const TX_URL_NAME = 'tx';
export const ADDRESS_TOKEN_LIST_PAGE_URL_NAME = `${ADDRESS_URL_NAME}`;
export const TX_PAGE_URL_NAME = `${TX_URL_NAME}`;
export const DEFAULT_PAGE = POOL_LIST_PAGE_URL_NAME;
export const MAINNET_BASE_PATH = `/mainnet`;
export const TESTNET_BASE_PATH = `/testnet`;
export const CHAIN_NETWORK_PATH = `/:network`;
export const POOL_BASE_PATH = `${CHAIN_NETWORK_PATH}/${POOL_LIST_PAGE_URL_NAME}`;
export const TOKEN_BASE_PATH = `${CHAIN_NETWORK_PATH}/${TOKEN_LIST_PAGE_URL_NAME}`;
export const ANCHORS_BASE_PATH = `${CHAIN_NETWORK_PATH}/${ANCHORS_LIST_PAGE_URL_NAME}`;
export const POOL_PAGE_PATH = `${POOL_BASE_PATH}/:poolPairId`;
export const TOKEN_PAGE_PATH = `${TOKEN_BASE_PATH}/:tokenId`;
export const ADDRESS_TOKEN_LIST_PAGE = `${CHAIN_NETWORK_PATH}/${ADDRESS_URL_NAME}/:owner`;
export const TX_INFO_PAGE = `${CHAIN_NETWORK_PATH}/${TX_URL_NAME}/:txid`;
export const DEFAULT_NETWORK_CHAIN = `/${NETWORK}/${DEFAULT_PAGE}`;
export const MAINNET_DEFAULT_PAGE = `${MAINNET_BASE_PATH}/${DEFAULT_PAGE}`;
export const TESTNET_DEFAULT_PAGE = `${TESTNET_BASE_PATH}/${DEFAULT_PAGE}`;
