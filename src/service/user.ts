import { API_PATH } from "@/constants/network";

import { HTTP_METHODS } from "@/constants/network";
import { IUser } from "@/types/feature/user";
import { baseFetch } from "@/utils/network";

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
