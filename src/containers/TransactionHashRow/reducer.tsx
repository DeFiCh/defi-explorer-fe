import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: {},
};

const configSlice = createSlice({
  name: 'transactionHashRowView',
  initialState,
  reducers: {
    fetchNewTxnDataRequest(state, action) {
      state.data[action.payload] = {
        isLoading: true,
        isError: false,
        data: {},
      };
    },
    fetchNewTxnDataRequestSuccess(state, action) {
      state.data[action.payload.txId] = {
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    },
    fetchNewTxnDataRequestFailure(state, action) {
      state.data[action.payload.txId] = {
        isLoading: false,
        isError: action.payload.data,
        data: {},
      };
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchNewTxnDataRequest,
  fetchNewTxnDataRequestSuccess,
  fetchNewTxnDataRequestFailure,
} = actions;

export default reducer;
