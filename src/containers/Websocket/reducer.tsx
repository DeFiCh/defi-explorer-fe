import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isConnected: false,
  isError: "",
  blockResponse: {
    isLoading: false,
    data: [],
    isError: "",
  },
  transactionResponse: {
    isLoading: false,
    data: [],
    isError: "",
  },
  coinResponse: {
    isLoading: false,
    data: [],
    isError: "",
  },
};

const configSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    newLatestTransaction(state, action) {},
    storeLatestTransactions(state, action) {
      state.transactionResponse.isLoading = false;
      state.transactionResponse.data = action.payload;
      state.transactionResponse.isError = "";
    },
    newLatestBlock(state, action) {},
    storeLatestBlocks(state, action) {
      state.blockResponse.isLoading = false;
      state.blockResponse.data = action.payload;
      state.blockResponse.isError = "";
    },
    newLatestCoin(state, action) {},
    storeLatestCoins(state, action) {
      state.coinResponse.isLoading = false;
      state.coinResponse.data = action.payload;
      state.coinResponse.isError = "";
    },
    connected(state) {
      state.isConnected = true;
    },
    disconnected(state) {
      state.isConnected = false;
    },
    setErrorMessage(state, action) {
      state.isError = action.payload || "";
    },
    fetchLatestBlocks(state) {
      state.blockResponse.isLoading = true;
    },
    fetchLatestBlocksSuccess(state, action) {
      state.blockResponse.isLoading = false;
      state.blockResponse.data = action.payload;
    },
    fetchLatestBlocksFail(state, action) {
      state.blockResponse.isLoading = false;
      state.blockResponse.isError = action.payload;
    },
    fetchLatestTransactions(state) {
      state.transactionResponse.isLoading = true;
    },
    fetchLatestTransactionsSuccess(state, action) {
      state.transactionResponse.isLoading = false;
      state.transactionResponse.data = action.payload;
    },
    fetchLatestTransactionsFail(state, action) {
      state.transactionResponse.isLoading = false;
      state.transactionResponse.isError = action.payload;
    },
    fetchLatestCoins(state) {
      state.coinResponse.isLoading = true;
    },
    fetchLatestCoinsSuccess(state, action) {
      state.coinResponse.isLoading = false;
      state.coinResponse.data = action.payload;
    },
    fetchLatestCoinsFail(state, action) {
      state.coinResponse.isLoading = false;
      state.coinResponse.isError = action.payload;
    },
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
  fetchLatestBlocks,
  fetchLatestBlocksSuccess,
  fetchLatestBlocksFail,
  fetchLatestTransactions,
  fetchLatestTransactionsSuccess,
  fetchLatestTransactionsFail,
  fetchLatestCoins,
  fetchLatestCoinsSuccess,
  fetchLatestCoinsFail,
} = actions;

export default reducer;
