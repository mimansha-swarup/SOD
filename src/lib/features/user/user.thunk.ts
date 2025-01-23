import { HTTP_METHODS } from "@/constants/network";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_PATH } from "@/constants/network";
import { baseFetch } from "@/utils/network";
import { RootState } from "@/lib/store";
import { IUser, IUsersCommunity, IUsersMetrics } from "@/types/feature/user";

export const fetchUser = createAsyncThunk(
  "userRecord/user",
  async ({ userId }: { userId: string }, { rejectWithValue, dispatch }) => {
    try {
      const userData = await baseFetch<{ data: IUser }>({
        method: HTTP_METHODS.GET,
        url: API_PATH.USER.replace("[userId]", userId),
      });

      if (userData && userData.data.communities?.length > 0) {
        const firstCommunityId = userData.data.communities[0]?.community; // Get the first element

        // Dispatch community thunk with the first communityId
        await dispatch(
          fetchUsersCommunity({ userId, communityId: firstCommunityId })
        );
        await dispatch(
          fetchUsersMetric({ userId, communityId: firstCommunityId })
        );
      }

      return userData.data;
    } catch (error) {
      console.log("error: ", (error as Error)?.message);
    }
  }
);

export const fetchUsersCommunity = createAsyncThunk(
  "userRecord/community",
  async (
    { userId, communityId }: { userId: string; communityId: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const communityIds =
        communityId ||
        state?.userRecord?.user?.data?.communities?.[0]?.community;
      const userCommunityData = await baseFetch<{ data: IUsersCommunity }>({
        method: HTTP_METHODS.GET,
        url: API_PATH.USERS_COMMUNITY.replace("[userId]", userId).replace(
          "[communityId]",
          communityIds
        ),
      });

      return userCommunityData.data;
    } catch (error) {
      console.log("error: ", (error as Error)?.message);
    }
  }
);

export const fetchUsersMetric = createAsyncThunk(
  "userRecord/metric",
  async (
    { userId, communityId }: { userId: string; communityId: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const communityIds =
        communityId ||
        state?.userRecord?.user?.data?.communities?.[0]?.community;
      const userMetricData = await baseFetch<{ data: IUsersMetrics }>({
        method: HTTP_METHODS.GET,
        url: API_PATH.USERS_METRIC.replace("[userId]", userId).replace(
          "[communityId]",
          communityIds
        ),
      });

      return userMetricData.data;
    } catch (error) {
      console.log("error: ", (error as Error)?.message);
    }
  }
);
