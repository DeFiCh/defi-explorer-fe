import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  quickStatus: {},
  quickStatusError: "",
};

const configSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    startQuickStatus(state) {},
    quickStatusSuccess(state, action) {
      state.quickStatus = action.payload;
    },
    setQuickStatusError(state, action) {
      state.quickStatusError = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  quickStatusSuccess,
  startQuickStatus,
  setQuickStatusError,
} = actions;

export default reducer;
