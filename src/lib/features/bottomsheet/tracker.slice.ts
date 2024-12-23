import { BottomSheetObjectType } from "@/types/bottomsheet";
import { TRACKER, TrackerInitialStateType } from "@/types/tracker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TrackerInitialStateType = {
  selectedTracker: TRACKER.METRIC,
  tracker: {},
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    selectedTracker: (
      state,
      { payload }: PayloadAction<TRACKER>
    ) => {
      state.selectedTracker = payload;
    },

  },
});

export const { selectedTracker, popBottomSheet } = trackerSlice.actions;

export default trackerSlice.reducer;
