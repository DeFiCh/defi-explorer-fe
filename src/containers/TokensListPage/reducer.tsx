import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  data: {},
  isError: '',
};

const configSlice = createSlice({
  name: 'TokenPage',
  initialState,
  reducers: {
    fetchTokensListStartedRequest(state, action) {
      state.isLoading = true;
      state.data = {};
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
    startPaginationRequest(state, action) {
      state.isLoading = true;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchTokensListStartedRequest,
  fetchTokensListFailureRequest,
  fetchTokensListSuccessRequest,
  startPaginationRequest,
} = actions;

export default reducer;
