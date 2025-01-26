import { ICommunityMetricList } from "@/types/feature/community";
import { IMetricsArray } from "@/types/feature/user";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMasterMetrics } from "./community.thunk";
import { RootState } from "@/lib/store";

const initialState: ICommunityMetricList = {
  metrics: {
    list: [] as IMetricsArray[],
    isLoading: true,
  },
};

const communitySlice = createSlice({
  name: "masterCommunity",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMasterMetrics.pending, (state) => {
        state.metrics.isLoading = true;
      })
      .addCase(fetchMasterMetrics.fulfilled, (state, action) => {
        state.metrics.isLoading = false;
        if (action.payload) state.metrics.list = action.payload;
      })
      .addCase(fetchMasterMetrics.rejected, (state) => {
        state.metrics.isLoading = false;
      });
  },
});

export const getMasterMetrics = (state: RootState) =>
  state.masterCommunity.metrics;

export default communitySlice.reducer;
