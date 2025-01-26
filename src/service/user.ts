import { API_PATH } from "@/constants/network";

import { HTTP_METHODS } from "@/constants/network";
import { IUser, IUsersMetrics } from "@/types/feature/user";
import { baseFetch } from "@/utils/network";
import { getCommunityId } from "@/utils/tracker";

export const fetchUserData = async ({ userId }: { userId: string }) => {
  try {
    const userData = await baseFetch<{ data: IUser }>({
      method: HTTP_METHODS.GET,
      url: API_PATH.USER.replace("[userId]", userId),
    });

    return userData.data;
  } catch (error) {
    console.log("error: ", (error as Error)?.message);
  }
};

export const deleteUsersMetric = async ({
  userId,
  communityId,
  metricId,
}: {
  userId: string;
  communityId: string;
  metricId: string;
}) => {
  try {
    const userMetricData = await baseFetch<{ data: IUsersMetrics }>({
      method: HTTP_METHODS.DELETE,
      url: API_PATH.SAVE_USERS_METRIC.replace("[userId]", userId)
        .replace("[communityId]", communityId)
        .replace("[metricId]", metricId),
    });

    return userMetricData.data;
  } catch (error) {
    console.log("error: ", (error as Error)?.message);
  }
};
