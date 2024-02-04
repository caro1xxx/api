import { createSlice } from "@reduxjs/toolkit";

interface userState {
  token: string;
  reload: boolean;
}

const initialState: userState = {
  token: "",
  reload: false,
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
  },
});

export const { saveToken, reload } = userSlice.actions;
export default userSlice.reducer;
