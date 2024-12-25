export const enum TRACKER {
  METRIC = "Metric",
  SKILLS = "Skills",
  KPI = "KPI",
}

export type TrackerListType = {
  name: `${TRACKER}`;
  list: TrackerObjectType[];
};

export type TrackerType = {
  [key in `${TRACKER}`]: TrackerObjectType[];
};

export type TrackerObjectType = {
  name: string;
  color: string;
  date: string;
  type: string;
};
