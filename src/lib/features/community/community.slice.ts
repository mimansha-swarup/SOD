import { ICommunity, ICommunityMetricList } from "@/types/feature/community";
import { IMetricsArray } from "@/types/feature/user";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMasterCommunity, fetchMasterMetrics } from "./community.thunk";
import { RootState } from "@/lib/store";

const initialState: ICommunityMetricList = {
  metrics: {
    list: [] as IMetricsArray[],
    isLoading: true,
  },
  selectedCommunity: {
    data: {} as ICommunity,
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
      }) //Master Metrics
      .addCase(fetchMasterCommunity.pending, (state) => {
        state.selectedCommunity.isLoading = true;
      })
      .addCase(fetchMasterCommunity.fulfilled, (state, action) => {
        state.selectedCommunity.isLoading = false;
        if (action.payload) state.selectedCommunity.data = action.payload;
      })
      .addCase(fetchMasterCommunity.rejected, (state) => {
        state.selectedCommunity.isLoading = false;
      }); // masterCommunity
  },
});

export const getMasterMetrics = (state: RootState) =>
  state.masterCommunity.metrics;
export const getMasterCommunity = (state: RootState) =>
  state.masterCommunity.selectedCommunity;

export default communitySlice.reducer;
