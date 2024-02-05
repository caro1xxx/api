import { createSlice } from "@reduxjs/toolkit";

interface userState {
  token: string;
  reload: boolean;
  orderNo: string;
}

const initialState: userState = {
  token: "",
  reload: false,
  orderNo: "",
};

export const userSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    saveToken: (state, payload) => {
      state.token = payload.payload;
    },
    reload: (state, payload) => {
      state.reload = payload.payload;
    },
    byOrder: (state, payload) => {
      state.orderNo = payload.payload;
    },
  },
});

export const { saveToken, reload, byOrder } = userSlice.actions;
export default userSlice.reducer;
