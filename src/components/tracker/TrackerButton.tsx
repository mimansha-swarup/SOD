import React, { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { SHEETS_NAME } from "@/constants/bottomsheet";
import { useAppDispatch } from "@/lib/store";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { IMetricsTrackingObject } from "@/types/feature/user";

const TrackerButton = ({
  metricArray,
  disabled = false,
  loading = false,
}: {
  metricArray: IMetricsTrackingObject[];
  disabled: boolean;
  loading: boolean;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className="  bg-gradient-to-r from-primary to-accent text-black w-full"
      disabled={disabled}
      loading={loading}
      onClick={() =>
        dispatch(
          addBottomSheet({
            sheetName: SHEETS_NAME.TRACKER,
            title: "Track your today's metric",
            props: { metricArray },
          })
        )
      }
    >
      Track Metrics
    </Button>
  );
};

export default TrackerButton;
