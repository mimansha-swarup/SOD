import { TRACKER_MODE, trackerData } from "@/constants/tracker";
import { Edit, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/store";
import { SheetHeight } from "@/constants/bottomsheet";
import { SheetPosition } from "@/constants/bottomsheet";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { SHEETS_NAME } from "@/constants/bottomsheet";
import tracker from "@/container/tracker";

const CommunityMetrics = () => {
  const dispatch = useAppDispatch();

  const openCreateMetricBs = () => {
    dispatch(
      addBottomSheet({
        sheetName: SHEETS_NAME.ADD_METRIC,
        props: { mode: TRACKER_MODE.add },
        title: `Add custom metrics`,
        initialPosition: SheetHeight[SheetPosition.QUARTER],
      })
    );
  };

  return (
    <div className="py-6 overflow-y-auto">
      <div className="flex flex-col gap-2">
        {trackerData?.map((item) => (
          <div
            key={item.name}
            className="flex items-center bg-white/10 border border-accent/15  px-3 backdrop-blur-sm rounded-xl py-1.5"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 mb-auto rounded-full mt-1"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                {/* <p className="text-xs text-gray-500">{item.date}</p> */}
              </div>
            </div>

            <Button
              variant="ghost"
              className="ml-auto max-w-3 max-h-8 hover:bg-transparent"
              // onClick={}
            >
              <Plus height={24} width={24} />
            </Button>
          </div>
        ))}
      </div>

      <Button
        // onClick={navigateToClubsMetrics}
        onClick={openCreateMetricBs}
        className="bg-secondary mt-6 text-background hover:text-background hover:bg-secondary w-full !rounded-xl"
      >
        Create Custom Metrics
      </Button>
    </div>
  );
};

export default CommunityMetrics;
