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
} = actions;

export default reducer;
