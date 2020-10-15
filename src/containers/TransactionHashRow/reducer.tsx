import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: {},
  transactions: {},
};

const configSlice = createSlice({
  name: 'transactionHashRowView',
  initialState,
  reducers: {
    fetchNewTxnIpOpDataRequest(state, action) {
      state.data[action.payload] = {
        isLoading: true,
        isError: false,
        data: {},
      };
      state.transactions[action.payload] = {
        isLoading: true,
        isError: false,
        data: {},
      };
    },
    fetchNewTxnIpOpDataRequestSuccess(state, action) {
      state.data[action.payload.txId] = {
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    },
    fetchNewTxnIpOpDataRequestFailure(state, action) {
      state.data[action.payload.txId] = {
        isLoading: false,
        isError: action.payload.data,
        data: {},
      };
    },
    fetchTransactionsDataRequestSuccess(state, action) {
      state.transactions[action.payload.txId] = {
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    },
    fetchTransactionsDataRequestFailure(state, action) {
      state.transactions[action.payload.txId] = {
        isLoading: false,
        isError: action.payload.data,
        data: {},
      };
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchNewTxnIpOpDataRequest,
  fetchNewTxnIpOpDataRequestSuccess,
  fetchNewTxnIpOpDataRequestFailure,
  fetchTransactionsDataRequestSuccess,
  fetchTransactionsDataRequestFailure,
} = actions;

export default reducer;
