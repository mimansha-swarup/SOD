export enum TRACKER {
  METRIC = "metric",
  SKILLS = "skills",
  KPI = "kpi",
}

export type TrackerInitialStateType = {
  selectedTracker: `${TRACKER}`;
  tracker: Record<string, any>;
};
