import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  chain: process.env.CHAIN || 'DFI',
  network: process.env.CHAIN || 'mainnet',
};

const configSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {},
});

const { actions, reducer } = configSlice;

export const {} = actions;

export default reducer;
