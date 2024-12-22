import React from "react";
import { useAppDispatch } from "../../lib/store";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { Button } from "../ui/button";
import Tracker from "./Tracker";
import {
  SheetHeight,
  SheetPosition,
  SHEETS_NAME,
} from "@/constants/bottomsheet";

const TrackButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() =>
        dispatch(
          addBottomSheet({
            sheetName: SHEETS_NAME.TRACKER,
            props: {},
            title: `Track your ${"Metrics"}`,
            initialPosition: SheetHeight[SheetPosition.QUARTER],
          })
        )
      }
      className="bg-gradient-to-r from-turquoise to-eden w-full"
    >
      Track Metrics
    </Button>
  );
};

export default TrackButton;
