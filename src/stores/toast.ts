import { createSlice } from "@reduxjs/toolkit";

type Toast = {
  id: number;
  message: string;
  type?: "error" | "success" | "info";
};

type ToastState = {
  toasts: Toast[];
};

const initialState: ToastState = { toasts: [] };

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const id = Date.now();
      state.toasts.push({ id, ...action.payload });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
