import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isConnected: false,
  isError: '',
  blocks: [],
  transactions: [],
  coins: [],
};

const configSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    newLatestTransaction(state, action) {},
    storeLatestTransactions(state, action) {
      state.transactions = action.payload;
    },
    newLatestBlock(state, action) {},
    storeLatestBlocks(state, action) {
      state.blocks = action.payload;
    },
    newLatestCoin(state, action) {},
    storeLatestCoins(state, action) {
      state.coins = action.payload;
    },
    connected(state) {
      state.isConnected = true;
    },
    disconnected(state) {
      state.isConnected = false;
    },
    setErrorMessage(state, action) {
      state.isError = action.payload || '';
    }
  },
});

const { actions, reducer } = configSlice;

export const {
  storeLatestTransactions,
  storeLatestBlocks,
  storeLatestCoins,
  connected,
  disconnected,
  newLatestTransaction,
  newLatestBlock,
  newLatestCoin,
  setErrorMessage,
} = actions;

export default reducer;
