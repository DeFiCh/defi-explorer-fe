import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  data: [],
  isError: '',
  totalValueLocked: 0,
  poolPairPage: {
    isLoading: false,
    data: {},
    isError: '',
  },
  swapTransaction: {
    isLoading: false,
    data: [],
    total: 0,
    isError: '',
  },
};

const configSlice = createSlice({
  name: 'poolPairsListPage',
  initialState,
  reducers: {
    fetchPoolPairsListStartedRequest(state, action) {
      state.isLoading = true;
      state.data = [];
      state.isError = '';
      state.totalValueLocked = 0;
    },
    fetchPoolPairsListFailureRequest(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = [];
    },
    fetchPoolPairsListSuccessRequest(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = '';
    },
    updateTotalValueLocked(state, action) {
      state.totalValueLocked = action.payload;
    },
    fetchPoolPairPageStartedRequest(state, action) {
      state.poolPairPage.isLoading = true;
      state.poolPairPage.data = {};
      state.poolPairPage.isError = '';
    },
    fetchPoolPairPageFailureRequest(state, action) {
      state.poolPairPage.isLoading = false;
      state.poolPairPage.isError = action.payload;
      state.poolPairPage.data = {};
    },
    fetchPoolPairPageSuccessRequest(state, action) {
      state.poolPairPage.isLoading = false;
      state.poolPairPage.data = action.payload;
      state.poolPairPage.isError = '';
    },
    fetchSwapTransactionStartedRequest(state, action) {
      state.swapTransaction.isLoading = true;
      state.swapTransaction.isError = '';
    },
    fetchSwapTransactionFailureRequest(state, action) {
      state.swapTransaction.isLoading = false;
      state.swapTransaction.isError = action.payload;
      state.swapTransaction.total = 0;
      state.swapTransaction.data = [];
    },
    fetchSwapTransactionSuccessRequest(state, action) {
      state.swapTransaction.isLoading = false;
      state.swapTransaction.data = action.payload.data;
      state.swapTransaction.total = action.payload.total;
      state.swapTransaction.isError = '';
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchPoolPairsListStartedRequest,
  fetchPoolPairsListFailureRequest,
  fetchPoolPairsListSuccessRequest,
  updateTotalValueLocked,
  fetchPoolPairPageStartedRequest,
  fetchPoolPairPageFailureRequest,
  fetchPoolPairPageSuccessRequest,
  fetchSwapTransactionStartedRequest,
  fetchSwapTransactionFailureRequest,
  fetchSwapTransactionSuccessRequest,
} = actions;

export default reducer;
