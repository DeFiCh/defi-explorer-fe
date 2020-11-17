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
  addressTokenList: {
    isLoading: false,
    data: [],
    isError: '',
  },
};

const configSlice = createSlice({
  name: 'TokensListPage',
  initialState,
  reducers: {
    fetchTokensListStartedRequest(state) {
      state.data = [];
      state.isLoading = true;
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
    fetchAddressTokensListStartedRequest(state, action) {
      state.addressTokenList.data = [];
      state.addressTokenList.isLoading = true;
      state.addressTokenList.isError = '';
    },
    fetchAddressTokensListFailureRequest(state, action) {
      state.addressTokenList.isLoading = false;
      state.addressTokenList.isError = action.payload;
      state.addressTokenList.data = [];
    },
    fetchAddressTokensListSuccessRequest(state, action) {
      state.addressTokenList.isLoading = false;
      state.addressTokenList.data = action.payload;
      state.addressTokenList.isError = '';
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
  fetchAddressTokensListStartedRequest,
  fetchAddressTokensListFailureRequest,
  fetchAddressTokensListSuccessRequest,
} = actions;

export default reducer;
