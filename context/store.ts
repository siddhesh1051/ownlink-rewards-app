// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themereducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themereducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
