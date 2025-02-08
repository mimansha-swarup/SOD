import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import QuantitySelector from "../shared/QuantitySelector";
import { IMetricsTrackingObject } from "@/types/feature/user";
import { METRIC_TYPES } from "../configure/AddMetricSheet";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { saveUsersTrackingData } from "@/lib/features/user/user.thunk";
import { auth } from "@/lib/firebase";
import { getCommunityId } from "@/utils/tracker";
import { createDateKey } from "@/utils/calendar";
import { popBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { getUsersMetrics } from "@/lib/features/user/user.slice";

const Tracker = ({
  metricArray,
}: {
  metricArray: IMetricsTrackingObject[];
}) => {
  const [selectedMetrics, setSelectedMetrics] = useState<
    IMetricsTrackingObject[]
  >([]);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(getUsersMetrics);

  useEffect(() => {
    setSelectedMetrics(metricArray);
  }, [metricArray]);

  const handleMetricValueChange = (metricId: string, value: string) => {
    const metrics = [...selectedMetrics]?.map((metric) =>
      metric.id === metricId ? { ...metric, value } : metric
    );

    setSelectedMetrics([...metrics]);
  };
  const handleCheckBoxChange = (metricId: string) => (event: CheckedState) => {
    console.log("event", event);
    handleMetricValueChange(metricId, `${event}`);
  };
  const handleInputChange =
    (metricId: string) => (event: ChangeEvent<HTMLInputElement>) => {
      handleMetricValueChange(metricId, `${event.target.value}`);
    };

  const saveTracking = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const body = {
      trackingData: selectedMetrics,
      date: createDateKey(today),
    };
    console.log("")
    // await dispatch(
    //   saveUsersTrackingData({
    //     userId: auth?.currentUser?.uid ?? "",
    //     communityId: getCommunityId(),
    //     body: JSON.stringify(body),
    //   })
    // );
    // dispatch(popBottomSheet());
  };
  return (
    <div className="px-2 flex flex-col justify-between h-full pb-12">
      <div className="overflow-auto">
        {!!selectedMetrics.length ? (
          selectedMetrics.map((item) => (
            <div
              key={item.id || item.name}
              className=" text-lg flex justify-between items-center mb-4"
            >
              <p>{item.name}</p>
              {item.type === METRIC_TYPES.checkbox ? (
                <Checkbox
                  className="w-[48px] h-[32px] border-input "
                  checked={item?.value === "true"}
                  onCheckedChange={handleCheckBoxChange(item.id)}
                />
              ) : (
                <QuantitySelector
                  value={parseInt(item?.value, 10) ?? 0}
                  onChange={handleInputChange(item.id)}
                />
              )}
            </div>
          ))
        ) : (
          <div className="h-40 flex justify-center items-center">
            <p>No tracked metrics</p>
          </div>
        )}
      </div>
      <Button
        className="mt-auto  bg-gradient-to-r from-secondary to-accent w-full text-background "
        onClick={saveTracking}
        loading={isLoading}
        disabled={!selectedMetrics.length}
      >
        Track
      </Button>
    </div>
  );
};

export default Tracker;
