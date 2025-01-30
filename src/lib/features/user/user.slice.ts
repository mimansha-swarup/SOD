import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchUsersCommunity,
  fetchUsersMetric,
  saveUsersMetric,
  saveUsersTrackingData,
} from "./user.thunk";
import { RootState } from "@/lib/store";
import { IMetricsArray, IUserRecordState } from "@/types/feature/user";

const initialState: IUserRecordState = {
  user: {
    isLoading: true,
    data: {
      profilePicture: "",
      uid: "",
      name: "",
      email: "",
      communities: [],
    },
  },
  community: {
    data: {
      character: "",
      currentLevel: "Level 0",
      desiredIncome: "0",
      income: "0",
      isPaid: true,
      manifestation: "",
      joinedAt: "",
      streak: 0,
      path: [],
    },
    isLoading: true,
  },
  metrics: {
    data: {
      metrics: [] as IMetricsArray[],
      trackingData: {},
    },
    isLoading: true,
  },
};

const userSlice = createSlice({
  name: "userRecord",
  initialState,
  reducers: {
    // addUser: (state, { payload }) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user.isLoading = false;
        if (action.payload) {
          state.user.data = action.payload;
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user.isLoading = false;
      }) // Fetch user
      .addCase(fetchUsersCommunity.pending, (state) => {
        state.community.isLoading = true;
      })
      .addCase(fetchUsersCommunity.fulfilled, (state, action) => {
        state.community.isLoading = false;
        if (action.payload) {
          state.community.data = action.payload;
        }
      })
      .addCase(fetchUsersCommunity.rejected, (state) => {
        state.community.isLoading = false;
      }) // fetchUserCommunity
      .addCase(fetchUsersMetric.pending, (state) => {
        state.metrics.isLoading = true;
      })
      .addCase(fetchUsersMetric.fulfilled, (state, action) => {
        state.metrics.isLoading = false;
        if (action.payload) {
          state.metrics.data = action.payload;
        }
      })
      .addCase(fetchUsersMetric.rejected, (state) => {
        state.metrics.isLoading = false;
      }) //fetchUserMetric
      .addCase(saveUsersMetric.pending, (state) => {
        state.metrics.isLoading = true;
      })
      .addCase(saveUsersMetric.fulfilled, (state, action) => {
        state.metrics.isLoading = false;
        if (action.payload) {
          state.metrics.data = action.payload;
        }
      })
      .addCase(saveUsersMetric.rejected, (state) => {
        state.metrics.isLoading = false;
      }) //save user Metric
      .addCase(saveUsersTrackingData.pending, (state) => {
        state.metrics.isLoading = true;
      })
      .addCase(saveUsersTrackingData.fulfilled, (state, action) => {
        state.metrics.isLoading = false;
        // if (action.payload) {
        //   state.metrics.data = action.payload;
        // }
      })
      .addCase(saveUsersTrackingData.rejected, (state) => {
        state.metrics.isLoading = false;
      });
  },
});

export const getUser = (state: RootState) => state.userRecord.user;
export const getUsersCommunity = (state: RootState) =>
  state.userRecord.community;
export const getUsersMetrics = (state: RootState) => state.userRecord.metrics;

export default userSlice.reducer;
