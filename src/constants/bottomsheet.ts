import AddMetricSheet from "@/components/configure/AddMetricSheet";
import Tracker from "@/components/tracker/Tracker";

export const enum SheetPosition {
  FULL = 0,
  QUARTER = 0.25,
  HALF = 0.5,
  PARTIAL = 0.75,
  CLOSED = 1,
}
export const SheetHeight = {
  [SheetPosition.FULL]: "h-[90vh]",
  [SheetPosition.QUARTER]: "h-[75vh]",
  [SheetPosition.HALF]: "h-[50vh]",
  [SheetPosition.PARTIAL]: "h-[25vh]",
  [SheetPosition.CLOSED]: "h-[0vh]",
};

export const enum SHEETS_NAME {
  TRACKER = "TRACKER",
  ADD_METRIC = "ADD_METRIC",
}
export const SHEETS = {
  [SHEETS_NAME.TRACKER]: Tracker,
  [SHEETS_NAME.ADD_METRIC]: AddMetricSheet,
};
