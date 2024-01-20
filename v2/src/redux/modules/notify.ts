import { createSlice } from "@reduxjs/toolkit";

interface notifyState {
  message: string;
  additive: number;
  flag: boolean;
  showed: boolean;
}

const initialState: notifyState = {
  message: "",
  additive: 0,
  flag: false,
  showed: true,
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    changeMessage: (state, payload) => {
      state.message = payload.payload[0];
      state.additive += 1;
      state.showed = false;
      if (payload.payload[1] === state.flag) return;
      state.flag = payload.payload[1];
    },
    recordMessageIsShowed: (state) => {
      state.showed = true;
    },
  },
});

export const { changeMessage, recordMessageIsShowed } = notifySlice.actions;
export default notifySlice.reducer;
