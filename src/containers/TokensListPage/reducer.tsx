import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  data: [],
  isError: '',
  tokenPage: {
    isLoading: false,
    data: {},
    isError: '',
  },
};

const configSlice = createSlice({
  name: 'TokensListPage',
  initialState,
  reducers: {
    fetchTokensListStartedRequest(state) {
      state.isLoading = true;
      state.data = [];
      state.isError = '';
    },
    fetchTokensListFailureRequest(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = [];
    },
    fetchTokensListSuccessRequest(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = '';
    },
    fetchTokenPageStartedRequest(state, action) {
      state.tokenPage.isLoading = true;
      state.tokenPage.data = {};
      state.tokenPage.isError = '';
    },
    fetchTokenPageFailureRequest(state, action) {
      state.tokenPage.isLoading = false;
      state.tokenPage.isError = action.payload;
      state.tokenPage.data = {};
    },
    fetchTokenPageSuccessRequest(state, action) {
      state.tokenPage.isLoading = false;
      state.tokenPage.data = action.payload;
      state.tokenPage.isError = '';
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchTokensListStartedRequest,
  fetchTokensListFailureRequest,
  fetchTokensListSuccessRequest,
  fetchTokenPageStartedRequest,
  fetchTokenPageFailureRequest,
  fetchTokenPageSuccessRequest,
} = actions;

export default reducer;
