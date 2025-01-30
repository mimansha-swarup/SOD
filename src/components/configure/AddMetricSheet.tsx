"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { generateNeonColor } from "@/utils/configure";
import { auth } from "@/lib/firebase";
import { getCommunityId } from "@/utils/tracker";
import { useAppDispatch } from "@/lib/store";
import { saveUsersMetric } from "@/lib/features/user/user.thunk";
import { IMetricsArray } from "@/types/feature/user";
import { v4 as uuidv4 } from "uuid";
import { popBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { TRACKER_MODE } from "@/constants/tracker";
import { redirect } from "next/navigation";

export const METRIC_TYPES = {
  checkbox: "BOOLEAN",
  number: "NUMBER",
};
const INITIAL_METRIC_STATE: metricDataType = {
  id: uuidv4(),
  name: "",
  description: "",
  color: generateNeonColor(),
  type: METRIC_TYPES.checkbox as "BOOLEAN" | "NUMBER",
};

type metricDataType = Omit<IMetricsArray, "quantity">;

const AddMetricSheet = ({
  mode = "add" as const,
  metricData = {} as metricDataType,
}: {
  mode?: keyof typeof TRACKER_MODE;
  metricData?: metricDataType;
}) => {
  const [metricName, setMetricName] = useState<metricDataType>({
    ...INITIAL_METRIC_STATE,
    color: generateNeonColor(),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mode === TRACKER_MODE.edit) {
      setMetricName({
        id: metricData.id,
        name: metricData.name,
        color: metricData.color,
        type: metricData.type,
        description: metricData.description,
      });
    }
  }, [mode]);

  const saveMetric = (metricBody: metricDataType) => () => {
    dispatch(
      saveUsersMetric({
        userId: auth?.currentUser?.uid ?? "",
        communityId: getCommunityId(),
        metricId: metricBody.id,
        body: JSON.stringify(metricBody),
      })
    );
    dispatch(popBottomSheet());
    if (mode === "add") redirect("/configure");
  };

  const handleAddMetric =
    (fieldName: keyof typeof metricName) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      setMetricName((prev) => ({ ...prev, [fieldName]: value }));
    };
  return (
    <div className="px-2 flex flex-col  h-full pb-12 gap-4">
      <div>
        <Label>Metric name :</Label>
        <Input
          className="mt-1"
          placeholder="Commented on a post"
          value={metricName.name}
          onChange={handleAddMetric("name")}
        />
      </div>
      <div className="flex gap-2 items-center ">
        <Label>Color :</Label>
        <Input
          className="flex-1 max-w-16"
          type="color"
          value={metricName.color}
          onChange={handleAddMetric("color")}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Label>Metric Type :</Label>
        <Select value={metricName.type} onValueChange={handleAddMetric("type")}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={METRIC_TYPES.checkbox}>Checkbox</SelectItem>
            <SelectItem value={METRIC_TYPES.number}>Number</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={saveMetric(metricName)}
        className="mt-auto  bg-gradient-to-r from-primary to-accent w-full text-black"
      >
        Save
      </Button>
    </div>
  );
};

export default AddMetricSheet;
