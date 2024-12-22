import { SheetPosition } from "@/constants/bottomsheet";
import { BottomSheetObjectType, BottomSheetProps } from "@/types/bottomsheet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  bottomSheets: BottomSheetObjectType[];
};
const initialState: InitialStateType = {
  bottomSheets: [],
};

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    addBottomSheet: (
      state,
      { payload }: PayloadAction<BottomSheetObjectType>
    ) => {
      state.bottomSheets = [...state.bottomSheets, payload];
    },
    popBottomSheet: (state) => {
      state.bottomSheets.pop();
    },
  },
});

export const { addBottomSheet, popBottomSheet } = bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;
