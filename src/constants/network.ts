export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const enum FetchResponseFormat {
  JSON = "JSON",
  TEXT = "TEXT",
}

export const API_PATH = {
  MASTER_COMMUNITY: "/api/community/[communityId]",
  MASTER_METRICS: "/api/metrics/[communityId]",
  USER: "/api/user/[userId]",
  USERS_COMMUNITY: "/api/user/[userId]/community/[communityId]",
  USERS_METRIC: "/api/user/[userId]/community/[communityId]/metric",
  SAVE_USERS_METRIC:
    "/api/user/[userId]/community/[communityId]/metric?id=[metricId]",
  TRACK_METRIC: "/api/user/[userId]/community/[communityId]/metric/track",
};
