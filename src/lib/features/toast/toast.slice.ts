import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [] as any[],
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    pushToast: (state, { payload }) => {
      state.queue = [...state.queue, payload];
    },
    closeToast: (state) => {
      state.queue.pop();
    },
  },
});
export const { pushToast, closeToast } = toastSlice.actions;

export const getToast = (state: RootState) => state.toast.queue;

export default toastSlice.reducer;
