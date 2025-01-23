import React from "react";
import { Button } from "../ui/button";
import { TRACKER } from "@/types/tracker";
import { SHEETS_NAME } from "@/constants/bottomsheet";
import { useAppDispatch } from "@/lib/store";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";

const TrackerButton = ({ metricArray }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className="  bg-gradient-to-r from-primary to-accent text-black w-full"
      onClick={() =>
        dispatch(
          addBottomSheet({
            sheetName: SHEETS_NAME.TRACKER,
            title: "Track your metrics",
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
