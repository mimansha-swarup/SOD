import { TRACKER_MODE } from "@/constants/tracker";
import { Edit, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { SheetHeight } from "@/constants/bottomsheet";
import { SheetPosition } from "@/constants/bottomsheet";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { SHEETS_NAME } from "@/constants/bottomsheet";
import { getUsersMetrics } from "@/lib/features/user/user.slice";
import { deleteUsersMetric } from "@/service/user";
import { auth } from "../../lib/firebase";
import { getCommunityId } from "@/utils/tracker";
import { fetchUsersMetric } from "@/lib/features/user/user.thunk";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import MetricListShimmer from "../shimmers/MetricList";

const MetricList = () => {
  const dispatch = useAppDispatch();
  const { data: metricRecord, isLoading } = useAppSelector(getUsersMetrics);
  const [popoverOpen, setPopoverOpen] = useState<Record<string, boolean>>({});


  useEffect(() => {
    const popoverState = metricRecord?.metrics?.reduce((state, metric) => {
      return { ...state, [metric.id]: false };
    }, {});
    setPopoverOpen(popoverState);
  }, [metricRecord?.metrics]);

  const communityId = getCommunityId();

  const openEditBs = (item: {}) => () => {
    dispatch(
      addBottomSheet({
        sheetName: SHEETS_NAME.ADD_METRIC,
        props: { mode: TRACKER_MODE.edit, metricData: { ...item } },
        title: `Edit metrics`,
        initialPosition: SheetHeight[SheetPosition.QUARTER],
      })
    );
  };
  const togglePopover = (metricId: string) => () => {
    setPopoverOpen((prev) => ({
      ...prev,
      [metricId]: !prev[metricId],
    }));
  };

  const onDeleteClick = (metricId: string) => async () => {
    const userId = auth?.currentUser?.uid ?? "";
    await deleteUsersMetric({
      userId,
      communityId: communityId,
      metricId,
    });
    togglePopover(metricId);
    dispatch(fetchUsersMetric({ userId, communityId: communityId }));
  };
  if (isLoading) {
    return <MetricListShimmer noOfMetrics={9} />;
  }
  return (
    <div className="py-6 ">
      <div className="flex flex-col gap-2 h-[calc(100vh-150px)] overflow-auto">
        {(metricRecord?.metrics ?? [])?.map((item) => (
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
              onClick={openEditBs(item)}
            >
              <Edit height={24} width={24} />
            </Button>
            <Popover open={popoverOpen?.[item.id]}>
              <PopoverTrigger asChild>
                <Button
                  onClick={togglePopover(item.id)}
                  variant="destructive"
                  className="ml-1 max-w-3 max-h-8"
                >
                  <Trash height={24} width={24} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                onPointerDownOutside={togglePopover(item.id)}
                onFocusOutside={togglePopover(item.id)}
              >
                Are you sure you want to delete '{item.name}' from your tracking
                metrics
                <div className="flex mt-2">
                  <Button
                    size={"sm"}
                    variant="destructive"
                    className="ml-auto "
                    onClick={onDeleteClick(item?.id)}
                  >
                    Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricList;
