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
export const POOL_BASE_PATH = '/pair';
export const BLOCK_PAGE_BASE_PATH = `/block`;
export const TRANSACTION_BASE_PATH = `/tx`;
export const TOKEN_BASE_PATH = `/token`;
export const ADDRESS_BASE_PATH = `/address`;
export const TOKEN_PAGE_PATH = `${TOKEN_BASE_PATH}/:tokenId`;
export const TRANSACTION_PAGE_INFO_PATH = `${TRANSACTION_BASE_PATH}/:txId`;
export const BLOCK_PAGE_INFO_PATH = `${BLOCK_PAGE_BASE_PATH}/:blockHash`;
export const ADDRESS_PAGE_BASE_PATH = `${ADDRESS_BASE_PATH}/:address`;
export const ANCHOR_PAGE = `${BLOCK_PAGE_BASE_PATH}/anchorsOnly`;
export const PAIR_PAGE_PATH = `${POOL_BASE_PATH}/:poolPairId`;
