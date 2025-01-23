import { RootState } from "@/lib/store";
import {
  BottomSheetInitialStateType,
  BottomSheetObjectType,
} from "@/types/bottomsheet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BottomSheetInitialStateType = {
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

export const getBottomSheet = (state: RootState) => state.bottomSheet.bottomSheets 

export default bottomSheetSlice.reducer;
