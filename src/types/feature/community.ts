import { IMetricsArray } from "./user";

export interface ICharacter {
  description: string;
  id: string;
  name: string;
  path: string;
  photoUrl: string;
}

interface IPath {}
export interface ICommunity {
  characters: ICharacter[];
  id: string;
  incomeAverage: number;
  name: string;
  members: string[];
  paths: {
    [key: string]: IPath;
  };
}
export interface ICommunityMetricList {
  metrics: { list: IMetricsArray[]; isLoading: boolean };
  selectedCommunity: { data: ICommunity; isLoading: boolean };
}
