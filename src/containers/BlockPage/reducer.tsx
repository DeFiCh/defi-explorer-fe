import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  block: {
    isLoading: false,
    isError: "",
    data: {},
  },
  transactions: {
    isLoading: false,
    isError: "",
    data: {},
  },
};

const configSlice = createSlice({
  name: "blockPage",
  initialState,
  reducers: {
    getBlockFromHash(state, action) {
      state.block.isLoading = true;
      state.transactions.isLoading = true;
      state.block.data = {};
      state.block.isError = "";
      state.transactions.data = {};
      state.transactions.isError = "";
    },
    getBlockFromHashSuccess(state, action) {
      state.block.isLoading = false;
      state.block.data = action.payload;
      state.block.isError = "";
    },
    getBlockFromHashFailure(state, action) {
      state.block.isLoading = false;
      state.block.data = {};
      state.block.isError = action.payload;
    },
    getTransactionsFromHashSuccess(state, action) {
      state.transactions.isLoading = false;
      state.transactions.data = action.payload;
      state.transactions.isError = "";
    },
    getTransactionsFromHashFailure(state, action) {
      state.transactions.isLoading = false;
      state.transactions.data = {};
      state.transactions.isError = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  getBlockFromHash,
  getBlockFromHashSuccess,
  getBlockFromHashFailure,
  getTransactionsFromHashSuccess,
  getTransactionsFromHashFailure,
} = actions;

export default reducer;
