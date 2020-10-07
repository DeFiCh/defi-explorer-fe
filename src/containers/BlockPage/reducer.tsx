import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  block: {},
  isLoading: false,
  isError: "",
};

const configSlice = createSlice({
  name: "blockPage",
  initialState,
  reducers: {
    getBlockFromHash(state, action) {
      state.isLoading = true;
    },
    getBlockFromHashSuccess(state, action) {
      state.isLoading = false;
      state.block = action.payload;
      state.isError = "";
    },
    getBlockFromHashFailure(state, action) {
      state.isLoading = false;
      state.block = {};
      state.isError = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  getBlockFromHash,
  getBlockFromHashSuccess,
  getBlockFromHashFailure,
} = actions;

export default reducer;
