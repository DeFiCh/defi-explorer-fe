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
    storeLatestTransaction(state, action) {
      state.transactions = action.payload;
    },
    newLatestBlocks(state, action) {},
    storeLatestBlocks(state, action) {
      state.blocks = action.payload;
    },
    newLatestCoins(state, action) {},
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
  storeLatestTransaction,
  storeLatestBlocks,
  storeLatestCoins,
  connected,
  disconnected,
  newLatestTransaction,
  newLatestBlocks,
  newLatestCoins,
  setErrorMessage,
} = actions;

export default reducer;
