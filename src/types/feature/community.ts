import { IMetricsArray } from "./user";

export interface ICommunityMetricList {
  metrics: { list: IMetricsArray[]; isLoading: boolean };
}
