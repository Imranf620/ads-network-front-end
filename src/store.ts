import { configureStore } from "@reduxjs/toolkit";
import domainReducer from "./features/domainsSlice";

export const store = configureStore({
  reducer: {
    domains: domainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
