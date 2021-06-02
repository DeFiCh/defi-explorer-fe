import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  data: [],
  isError: '',
  totalValueLocked: 0,
  totalBlockCount: 0,
  totalBlockIndex: 0,
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
  poolPairGraph: {
    isLoading: false,
    data: {},
    isError: '',
  },
  poolPairAddRemoveLp: {
    isLoading: false,
    data: {},
    isError: '',
  },
  poolPairVolumeGraph: {
    isLoading: false,
    data: {},
    isError: '',
    sym1: '',
    sym2: '',
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
      state.totalBlockCount = 0;
      state.totalBlockIndex = 0;
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
    updateTotalValueBlockCountLocked(state, action) {
      state.totalValueLocked = action.payload.tvl;
      state.totalBlockCount = action.payload.tbc;
      state.totalBlockIndex = action.payload.tbi;
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
    fetchPoolPairGraphStartedRequest(state, action) {
      state.poolPairGraph.isLoading = true;
      state.poolPairGraph.isError = '';
    },
    fetchPoolPairGraphFailureRequest(state, action) {
      state.poolPairGraph.isLoading = false;
      state.poolPairGraph.isError = action.payload;
      state.poolPairGraph.data = {};
    },
    fetchPoolPairGraphSuccessRequest(state, action) {
      state.poolPairGraph.isLoading = false;
      state.poolPairGraph.data = action.payload;
      state.poolPairGraph.isError = '';
    },
    fetchPoolPairAddRemoveLPSuccessRequest(state, action) {
      state.poolPairAddRemoveLp.isLoading = false;
      state.poolPairAddRemoveLp.data = action.payload;
      state.poolPairAddRemoveLp.isError = '';
    },
    fetchPoolPairAddRemoveLPErrorRequest(state, action) {
      state.poolPairAddRemoveLp.isLoading = false;
      state.poolPairAddRemoveLp.isError = action.payload;
      state.poolPairAddRemoveLp.data = {};
    },
    fetchPoolPairAddRemoveLiquidityStartedRequest(state, action) {
      state.poolPairAddRemoveLp.isLoading = true;
      state.poolPairAddRemoveLp.isError = '';
      state.poolPairAddRemoveLp.data = {};
    },
    fetchPoolPairVolumeGraphStartedRequest(state, action) {
      state.poolPairVolumeGraph.isLoading = true;
      state.poolPairVolumeGraph.isError = '';
    },
    fetchPoolPairVolumeGraphFailureRequest(state, action) {
      state.poolPairVolumeGraph.isLoading = false;
      state.poolPairVolumeGraph.isError = action.payload;
      state.poolPairVolumeGraph.data = {};
      state.poolPairVolumeGraph.sym1 = '';
      state.poolPairVolumeGraph.sym2 = '';
    },
    fetchPoolPairVolumeGraphSuccessRequest(state, action) {
      state.poolPairVolumeGraph.isLoading = false;
      state.poolPairVolumeGraph.data = action.payload;
      state.poolPairVolumeGraph.isError = '';
    },
    fetchPoolSwapVolumeSymbols(state, action) {
      state.poolPairVolumeGraph.sym1 = action.payload.sym1;
      state.poolPairVolumeGraph.sym2 = action.payload.sym2;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchPoolPairsListStartedRequest,
  fetchPoolPairsListFailureRequest,
  fetchPoolPairsListSuccessRequest,
  updateTotalValueBlockCountLocked,
  fetchPoolPairPageStartedRequest,
  fetchPoolPairPageFailureRequest,
  fetchPoolPairPageSuccessRequest,
  fetchSwapTransactionStartedRequest,
  fetchSwapTransactionFailureRequest,
  fetchSwapTransactionSuccessRequest,
  fetchPoolPairGraphStartedRequest,
  fetchPoolPairGraphFailureRequest,
  fetchPoolPairGraphSuccessRequest,
  fetchPoolPairAddRemoveLPSuccessRequest,
  fetchPoolPairAddRemoveLPErrorRequest,
  fetchPoolPairAddRemoveLiquidityStartedRequest,
  fetchPoolPairVolumeGraphStartedRequest,
  fetchPoolPairVolumeGraphFailureRequest,
  fetchPoolPairVolumeGraphSuccessRequest,
  fetchPoolSwapVolumeSymbols,
} = actions;

export default reducer;
