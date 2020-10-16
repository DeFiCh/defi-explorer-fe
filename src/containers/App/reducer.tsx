import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_UNIT } from '../../constants';

export const initialState = {
  chain: process.env.CHAIN || 'DFI',
  network: process.env.NETWORK || 'mainnet',
  unit: DEFAULT_UNIT,
};

const configSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeUnit(state, action) {
      state.unit = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const { changeUnit } = actions;

export default reducer;
