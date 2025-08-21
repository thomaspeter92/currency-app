import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./currencies";
import toastReducer from "./toast";

export const store = configureStore({
  reducer: {
    currenciesReducer,
    toastReducer,
  },
});

store.subscribe(() => {
  const state = store.getState().currenciesReducer;
  localStorage.setItem("currenciesState", JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
