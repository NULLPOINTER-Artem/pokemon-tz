import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "./slices/notify";

export const store = configureStore({
  reducer: {
    notify: notifyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
