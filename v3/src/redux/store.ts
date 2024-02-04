import { configureStore } from "@reduxjs/toolkit";
import notifySlice from "./modules/notify";
import userSlice from "./modules/user";

export const store = configureStore({
  reducer: {
    notify: notifySlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
