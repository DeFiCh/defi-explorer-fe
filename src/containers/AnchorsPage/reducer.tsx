import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  data: [],
  timestamps: {},
  isError: '',
  anchorsListPage: {
    isLoading: false,
    data: {},
    isError: '',
  },
};

const configSlice = createSlice({
  name: 'anchorsListPage',
  initialState,
  reducers: {
    fetchAnchorsListStartedRequest(state, action) {
      state.isLoading = true;
      state.data = [];
      state.isError = '';
    },
    fetchAnchorsListFailureRequest(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = [];
    },
    fetchAnchorsListSuccessRequest(state, action) {
      state.isLoading = false;
      state.data = action.payload.data.reverse();
      state.isError = '';
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchAnchorsListStartedRequest,
  fetchAnchorsListFailureRequest,
  fetchAnchorsListSuccessRequest,
} = actions;

export default reducer;
