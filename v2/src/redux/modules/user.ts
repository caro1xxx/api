import { createSlice } from "@reduxjs/toolkit";

interface userState {
  token: string;
}

const initialState: userState = {
  token: "",
};

export const userSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    saveToken: (state, payload) => {
      state.token = payload.payload;
    },
  },
});

export const { saveToken } = userSlice.actions;
export default userSlice.reducer;
