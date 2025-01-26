import { API_PATH } from "@/constants/network";

import { HTTP_METHODS } from "@/constants/network";
import { IMetricsArray, IUser } from "@/types/feature/user";
import { baseFetch } from "@/utils/network";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMasterMetrics = createAsyncThunk(
  "masterCommunity/list",
  async ({ communityId }: { communityId: string }) =>
    // { rejectWithValue, dispatch }
    {
      try {
        const userData = await baseFetch<{ data: { list: IMetricsArray[] } }>({
          method: HTTP_METHODS.GET,
          url: API_PATH.MASTER_METRICS.replace("[communityId]", communityId),
        });

        return userData.data?.list;
      } catch (error) {
        console.log("error: ", (error as Error)?.message);
      }
    }
);
