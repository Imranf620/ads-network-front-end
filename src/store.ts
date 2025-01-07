import { configureStore } from "@reduxjs/toolkit";
import domainReducer from "./features/domainsSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    domains: domainReducer,
    auth: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
