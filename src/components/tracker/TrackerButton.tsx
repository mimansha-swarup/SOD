import React from "react";
import { Button } from "../ui/button";
import { TRACKER } from "@/types/tracker";
import { SHEETS_NAME } from "@/constants/bottomsheet";
import { useAppDispatch } from "@/lib/store";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";

const TrackerButton = ({ selectedTracker }: { selectedTracker: TRACKER }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className="bg-eden text-white w-full"
      onClick={() =>
        dispatch(
          addBottomSheet({
            sheetName: SHEETS_NAME.TRACKER,
            title: "Track your " + selectedTracker,
            props: { selectedTracker },
          })
        )
      }
    >
      Track {selectedTracker}
    </Button>
  );
};

export default TrackerButton;
