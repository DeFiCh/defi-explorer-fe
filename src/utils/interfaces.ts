import { string } from "prop-types";

export interface ITokenResponse {
  hash: string;
}

export interface ITokenPoolPairListParams {
  start?: number;
  including_start?: boolean;
  limit?: number;
  network: string;
}

export interface IAddressTokenListParams extends ITokenPoolPairListParams {
  owner: string;
  indexed_amounts?: boolean;
}

export interface ITxn {
  hash: string;
  time: string;
  froms: {
    address: string;
    amount: number | string;
  }[];
  tos: {
    address: string;
    amount: number | string;
  }[];
  unit: string;
}
export interface ApiBlock {
  height: number;
  nonce: number;
  bits: number;
  size: number;
  confirmations: number;
  hash: string;
  merkleRoot: string;
  nextBlockHash: string;
  previousBlockHash: string;
  transactionCount: number;
  reward: number;
  minedBy: string;
  version: number;
  time: Date;
  timeNormalized: Date;
  btcTxHash?: string;
}

export interface AppBlock {
  height: number;
  merkleroot: string;
  nonce: number;
  size: number;
  confirmations: number;
  version: number;
  difficulty: number;
  bits: string;
  virtualSize: number;
  hash: string;
  time: number | string | Date;
  txlength: number;
  previousblockhash: string;
  nextblockhash: string;
  reward: number;
  btcTxHash: string | undefined;
  isAnchor: boolean;
  tx: {
    length: number;
  };
  poolInfo: {
    poolName: string;
    url: string;
  };
}
