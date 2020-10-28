import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  address: {
    isLoading: false,
    isError: '',
    data: {},
  },
  transactions: {
    isLoading: false,
    isError: '',
    data: [],
    total: 0,
  },
};

const configSlice = createSlice({
  name: 'AddressPage',
  initialState,
  reducers: {
    getAddress(state, action) {
      state.address.isLoading = true;
      state.transactions.isLoading = true;
      state.address.data = {};
      state.address.isError = '';
      state.transactions.data = [];
      state.transactions.total = 0;
      state.transactions.isError = '';
    },
    getAddressSuccess(state, action) {
      state.address.isLoading = false;
      state.address.data = action.payload;
      state.address.isError = '';
    },
    getAddressFailure(state, action) {
      state.address.isLoading = false;
      state.address.data = {};
      state.address.isError = action.payload;
    },
    getTransactionsFromAddressSuccess(state, action) {
      state.transactions.isLoading = false;
      state.transactions.data = action.payload.txns;
      state.transactions.total = action.payload.total;
      state.transactions.isError = '';
    },
    getTransactionsFromAddressFailure(state, action) {
      state.transactions.isLoading = false;
      state.transactions.data = [];
      state.transactions.isError = action.payload;
    },
    startPaginateTransactionsFromAddress(state, action) {
      state.transactions.isLoading = true;
      state.transactions.isError = '';
    },
    startPaginateTransactionsFromAddressSuccess(state, action) {
      state.transactions.isLoading = false;
      state.transactions.data = action.payload.txns;
      state.transactions.isError = '';
    },
    startPaginateTransactionsFromAddressFailue(state, action) {
      state.transactions.isLoading = false;
      state.transactions.isError = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  getAddress,
  getAddressSuccess,
  getAddressFailure,
  getTransactionsFromAddressSuccess,
  getTransactionsFromAddressFailure,
  startPaginateTransactionsFromAddress,
  startPaginateTransactionsFromAddressSuccess,
  startPaginateTransactionsFromAddressFailue,
} = actions;

export default reducer;
