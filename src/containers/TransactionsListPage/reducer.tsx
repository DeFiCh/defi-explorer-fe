import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  data: [],
  isError: '',
  total: 0,
};

const configSlice = createSlice({
  name: 'blockListPage',
  initialState,
  reducers: {
    fetchTransactionsListStarted(state) {
      state.isLoading = true;
      state.data = [];
      state.isError = '';
    },
    fetchTransactionsListFailure(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = [];
    },
    fetchTransactionsListSuccess(state, action) {
      state.isLoading = false;
      state.isError = '';
      state.data = action.payload;
      state.total = action.payload[0].height;
    },
    startPagination(state, action) {
      state.isLoading = true;
      state.isError = '';
    },
    startPaginationSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = '';
    },
    startPaginationFailure(state, action) {
      state.isLoading = false;
      state.data = [];
      state.isError = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchTransactionsListStarted,
  fetchTransactionsListFailure,
  fetchTransactionsListSuccess,
  startPagination,
  startPaginationSuccess,
  startPaginationFailure,
} = actions;

export default reducer;
