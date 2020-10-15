import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  isError: '',
  data: {},
};

const configSlice = createSlice({
  name: 'TransactionPage',
  initialState,
  reducers: {
    getTransactionFromTxidRequest(state, action) {
      state.isLoading = true;
      state.data = {};
      state.isError = '';
    },
    getTransactionFromTxidRequestSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = '';
    },
    getTransactionFromTxidRequestFailure(state, action) {
      state.isLoading = false;
      state.data = {};
      state.isError = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  getTransactionFromTxidRequest,
  getTransactionFromTxidRequestSuccess,
  getTransactionFromTxidRequestFailure,
} = actions;

export default reducer;
