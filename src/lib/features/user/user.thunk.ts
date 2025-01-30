import { HTTP_METHODS } from "@/constants/network";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_PATH } from "@/constants/network";
import { baseFetch } from "@/utils/network";
import { RootState } from "@/lib/store";
import { IUser, IUsersCommunity, IUsersMetrics } from "@/types/feature/user";
import { fetchMasterMetrics } from "../community/community.thunk";
import { getCommunityId } from "@/utils/tracker";

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
        await Promise.all([
          dispatch(
            fetchUsersCommunity({ userId, communityId: firstCommunityId })
          ),
          dispatch(fetchUsersMetric({ userId, communityId: firstCommunityId })),
          dispatch(fetchMasterMetrics({ communityId: firstCommunityId })),
        ]);
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
export const saveUsersMetric = createAsyncThunk(
  "userRecord/saveMetric",
  async (
    {
      userId,
      communityId,
      metricId,
      body,
    }: {
      userId: string;
      communityId: string;
      metricId: string;
      body: BodyInit;
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      const communityIds =
        communityId ||
        state?.userRecord?.user?.data?.communities?.[0]?.community;
      const userMetricData = await baseFetch<{ data: IUsersMetrics }>({
        method: HTTP_METHODS.PUT,
        body: body,
        url: API_PATH.SAVE_USERS_METRIC.replace("[userId]", userId)
          .replace("[communityId]", communityIds)
          .replace("[metricId]", metricId),
      });

      await dispatch(fetchMasterMetrics({ communityId: getCommunityId() }));

      return userMetricData.data;
    } catch (error) {
      console.log("error: ", (error as Error)?.message);
    }
  }
);

export const saveUsersTrackingData = createAsyncThunk(
  "userRecord/saveTracking",
  async (
    {
      userId,
      communityId,
      body,
    }: {
      userId: string;
      communityId: string;
      body: BodyInit;
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      const communityIds =
        communityId ||
        state?.userRecord?.user?.data?.communities?.[0]?.community;
      const userMetricData = await baseFetch<{ data: IUsersMetrics }>({
        method: HTTP_METHODS.POST,
        body: body,
        url: API_PATH.TRACK_METRIC.replace("[userId]", userId).replace(
          "[communityId]",
          communityIds
        ),
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      await dispatch(
        fetchUsersMetric({ userId, communityId: getCommunityId() })
      );

      return userMetricData.data;
    } catch (error) {
      console.log("error: ", (error as Error)?.message);
    }
  }
);
