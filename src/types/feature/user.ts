import { ICharacter } from "./community";

type UserJoinedCommunityType = {
  communityRef: unknown;
  community: string;
  questionnaireCompleted: boolean;
};

export interface IUserRecordState {
  user: {
    data: IUser;
    isLoading: boolean;
  };
  community: {
    data: IUsersCommunity;
    isLoading: boolean;
  };
  metrics: {
    data: IUsersMetrics;
    isLoading: boolean;
  };
}

export interface IUser {
  profilePicture: string;
  uid: string;
  name: string;
  email: string;
  communities: UserJoinedCommunityType[];
}

export interface IUsersCommunity {
  character: ICharacter;
  currentLevel: string;
  desiredIncome: string;
  income: string;
  isPaid: boolean;
  joinedAt: {};
  manifestation: string;
  streak: number;
  path: [];
}
export interface IUsersMetrics {
  metrics: IMetricsArray[];
  trackingData: ITrackingObject;
}
export const enum MetricType {
  BOOLEAN = "BOOLEAN",
  NUMBER = "NUMBER",
}

export interface IMetricsArray {
  color: string;
  description: string;
  id: string;
  name: string;
  type: `${MetricType}`;
  quantity?: string;
}
export interface ITrackingObject {
  [value: string]: IMetricsTrackingObject[];
}
export interface IMetricsTrackingObject extends IMetricsArray {
  value: string;
}
