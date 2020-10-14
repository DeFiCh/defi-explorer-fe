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
    data: {},
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
      state.transactions.data = {};
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
      state.transactions.data = action.payload;
      state.transactions.isError = '';
    },
    getTransactionsFromAddressFailure(state, action) {
      state.transactions.isLoading = false;
      state.transactions.data = {};
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
} = actions;

export default reducer;
