import { TRACKER_MODE } from "@/constants/tracker";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { SheetHeight } from "@/constants/bottomsheet";
import { SheetPosition } from "@/constants/bottomsheet";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { SHEETS_NAME } from "@/constants/bottomsheet";
import { getMasterMetrics } from "@/lib/features/community/community.slice";
import { getUsersMetrics } from "@/lib/features/user/user.slice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IMetricsArray } from "@/types/feature/user";
import { saveUsersMetric } from "@/lib/features/user/user.thunk";
import { auth } from "@/lib/firebase";
import { getCommunityId } from "@/utils/tracker";
import MetricListShimmer from "../shimmers/MetricList";

const CommunityMetrics = () => {
  const dispatch = useAppDispatch();
  const { list: masterMetrics, isLoading } = useAppSelector(getMasterMetrics);
  const {
    data: { metrics: usersMetrics },
    isLoading: isUserMetricLoading,
  } = useAppSelector(getUsersMetrics);
  const userMetricsIds = usersMetrics?.map((metric) => metric.id);
  const [popoverOpen, setPopoverOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const popoverState = masterMetrics?.reduce((state, metric) => {
      return { ...state, [metric.id]: false };
    }, {});
    setPopoverOpen(popoverState);
  }, [masterMetrics]);

  const togglePopover = (item: IMetricsArray) => () => {
    setPopoverOpen((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
  };

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

  const saveMetric = (metricBody: IMetricsArray) => () => {
    dispatch(
      saveUsersMetric({
        userId: auth?.currentUser?.uid ?? "",
        communityId: getCommunityId(),
        metricId: metricBody.id,
        body: JSON.stringify(metricBody),
      })
    );
    togglePopover(metricBody);
  };

  if (isLoading || isUserMetricLoading) {
    return <MetricListShimmer noOfMetrics={9} />;
  }

  return (
    <div className="py-6 overflow-y-auto relative">
      <div className="flex flex-col gap-2">
        {masterMetrics?.map((item) => {
          const disableAdd = userMetricsIds.includes(item.id);
          return (
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
              <Popover open={popoverOpen?.[item.id]}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-auto max-w-3 max-h-8 hover:bg-transparent"
                    disabled={disableAdd}
                    onClick={togglePopover(item)}
                  >
                    <Plus height={24} width={24} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  onPointerDownOutside={togglePopover(item)}
                  onFocusOutside={togglePopover(item)}
                >
                  Want to add '{item.name}' to your metrics
                  <div className="flex mt-2">
                    <Button
                      size={"sm"}
                      className="ml-auto"
                      onClick={saveMetric(item)}
                    >
                      Yes
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        })}
      </div>
      <Button
        onClick={openCreateMetricBs}
        className="fixed bottom-16 right-4 bg-secondary text-background hover:text-background hover:bg-secondary h-[36px] w-[36px] rounded-full"
      >
        <Plus height={24} width={24} />
      </Button>
    </div>
  );
};

export default CommunityMetrics;
