import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  data: [],
  isError: '',
};

const configSlice = createSlice({
  name: 'richListPage',
  initialState,
  reducers: {
    fetchRichListStarted(state, action) {
      state.isLoading = true;
      state.data = [];
      state.isError = '';
    },
    fetchRichListFailure(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = [];
    },
    fetchRichListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = '';
    },
    startRichListCron(state, action) {},
    stopRichListCron(state, action) {},
    startPagination(state, action) {
      state.isLoading = true;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchRichListStarted,
  fetchRichListFailure,
  fetchRichListSuccess,
  startRichListCron,
  stopRichListCron,
  startPagination,
} = actions;

export default reducer;
