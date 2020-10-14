import orderBy from 'lodash/orderBy';

export interface ApiCoin {
  txid: string;
  mintTxid: string;
  coinbase: boolean;
  vout: number;
  address: string;
  script: {
    asm: string;
    type: string;
  };
  spentTxid: string;
  mintHeight: number;
  spentHeight: number;
  value: number;
  customTxOut: any;
}

export interface AppCoin {
  txid: string;
  valueOut: number;
  value: number;
  spentTxid: string;
  mintTxid: string;
  mintHeight: number;
  spentHeight: number;
}

export interface ApiTx {
  address: string;
  chain: string;
  network: string;
  txid: string;
  blockHeight: number;
  blockHash: string;
  blockTime: Date;
  blockTimeNormalized: Date;
  coinbase: boolean;
  size: number;
  confirmations: number;
  locktime: number;
  inputs: ApiCoin[];
  outputs: ApiCoin[];
  mintTxid: string;
  mintHeight: number;
  spentTxid: string;
  spentHeight: number;
  value: number;
  version: number;
}

export interface AppTx {
  txid: string;
  blockhash: string;
  version: number;
  locktime: number;
  isCoinBase: boolean;
  vin: any[];
  vout: any[];
  confirmations: number;
  time: number;
  valueOut: number;
  size: number;
  fee: number;
  blockheight: number;
  blocktime: number;
}

export function toAppTx(tx: ApiTx): AppTx {
  return {
    txid: tx.txid,
    fee: null, // calculated later, when coins are retrieved
    blockheight: tx.blockHeight,
    confirmations: tx.confirmations,
    blockhash: tx.blockHash,
    blocktime: new Date(tx.blockTime).getTime() / 1000,
    time: new Date(tx.blockTime).getTime() / 1000,
    isCoinBase: tx.coinbase,
    size: tx.size,
    locktime: tx.locktime,
    vin: [], // populated when coins are retrieved
    vout: [], // populated when coins are retrieved
    valueOut: tx.value,
    version: tx.version,
  };
}

export function toAppCoin(coin: ApiCoin): AppCoin {
  return {
    txid: coin.txid,
    mintTxid: coin.mintTxid,
    mintHeight: coin.mintHeight,
    spentHeight: coin.spentHeight,
    valueOut: coin.value,
    value: coin.value,
    spentTxid: coin.spentTxid,
  };
}

export function orderByHeight(data: AppCoin[]) {
  const unconfirmedTxs: any[] = [];
  let confirmedTxs: any[] = [];
  data.forEach((tx) => {
    const { mintHeight, mintTxid, value, spentHeight, spentTxid } = tx;

    mintHeight < 0
      ? unconfirmedTxs.push({
          height: mintHeight,
          mintTxid,
          value,
          txid: mintTxid,
        })
      : confirmedTxs.push({
          height: mintHeight,
          mintTxid,
          value,
          txid: mintTxid,
        });

    if (spentHeight > 0) {
      confirmedTxs.push({
        height: spentHeight,
        spentTxid,
        value,
        txid: spentTxid,
      });
    }
  });
  confirmedTxs = orderBy(confirmedTxs, ['height'], ['desc']);
  return unconfirmedTxs.concat(confirmedTxs);
}
