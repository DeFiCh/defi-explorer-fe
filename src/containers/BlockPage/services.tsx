import moment from 'moment';
import { GET_BLOCK, GET_TX } from '../../constants/endpoint';
import ApiRequest from '../../utils/apiRequest';
import { ApiBlock, AppBlock } from '../../utils/interfaces';

export const getBlockFromHashService = async (blockHash: string) => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(`${GET_BLOCK}/${blockHash}`);
  return toAppBlock(resp.data);
};

export const getTransactionsFromBlockHashService = async (_: {
  blockHash: string;
  skip?: number;
  limit: number;
}) => {
  const { blockHash, skip, limit } = _;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(
    `${GET_BLOCK}/${blockHash}/transactions`,
    {
      params: {
        skip,
        limit,
      },
    }
  );
  return processData(data);
};

export const getConfirmations = async () => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(`${GET_BLOCK}/tip`);
  return data.height;
};

export const toAppBlock = (block: ApiBlock): AppBlock => {
  const difficulty: number = 0x1e0fffff / block.bits;
  return {
    height: block.height,
    confirmations: block.confirmations,
    nonce: block.nonce,
    size: block.size,
    virtualSize: block.size,
    merkleroot: block.merkleRoot,
    version: block.version,
    difficulty,
    bits: '0x' + block.bits.toString(16),
    hash: block.hash,
    time: block.time,
    tx: {
      length: block.transactionCount,
    },
    txlength: block.transactionCount,
    previousblockhash: block.previousBlockHash,
    nextblockhash: block.nextBlockHash,
    poolInfo: {
      poolName: block.minedBy,
      url: '',
    },
    reward: block.reward,
    btcTxHash: block.btcTxHash || '',
    isAnchor: !!block.btcTxHash,
  };
};

const processData = (data: any[]) => {
  return data.map((item) => {
    const {
      chain,
      network,
      txid,
      blockHeight,
      blockHash,
      blockTime,
      blockTimeNormalized,
      coinbase,
      fee,
      size,
      locktime,
      inputCount,
      outputCount,
      value,
      wallets,
      input,
      output,
    } = item;
    return {
      transactions: {
        chain,
        network,
        txid,
        blockHeight,
        blockHash,
        blockTime,
        blockTimeNormalized,
        coinbase,
        fee,
        size,
        locktime,
        inputCount,
        outputCount,
        value,
        wallets,
      },
      input,
      output,
    };
  });
};
