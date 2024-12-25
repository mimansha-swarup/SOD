"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { generatePastelColor } from "@/utils/configure";
import { TRACKER_MODE } from "@/constants/tracker";

const METRIC_TYPES = {
  checkbox: "Checkbox",
  number: "Number",
};
const INITIAL_METRIC_STATE = {
  name: "",
  color: generatePastelColor(),
  type: METRIC_TYPES.checkbox,
  threshold: 0,
};

type metricDataType = typeof INITIAL_METRIC_STATE;
const AddMetricSheet = ({
  mode,
  ...metricData
}: {
  mode: keyof typeof TRACKER_MODE;
  metricData: Record<string, unknown>;
}) => {
  const [metricName, setMetricName] = useState({
    ...INITIAL_METRIC_STATE,
    color: generatePastelColor(),
  });

  useEffect(() => {
    if (mode === TRACKER_MODE.edit) {
      setMetricName({
        ...metricData,
        threshold: metricData.maxValue,
      });
    }
  }, [mode]);

  const handleAddMetric =
    (fieldName: keyof typeof metricName) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      setMetricName((prev) => ({ ...prev, [fieldName]: value }));
    };
  return (
    <div className="px-2 flex flex-col  h-full pb-12 gap-4">
      <div>
        <Label>Add Metric :</Label>
        <Input
          className="mt-1"
          placeholder="Commented on a post"
          value={metricName.name}
          onChange={handleAddMetric("name")}
        />
      </div>
      <Label>Date :</Label>
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
      {metricName.type === METRIC_TYPES.number && (
        <div className="flex gap-2 items-center">
          <Label>Threshold :</Label>
          <Input
            className="max-w-36"
            type="number"
            min={0}
            value={metricName.threshold}
            onChange={handleAddMetric("threshold")}
          />
        </div>
      )}
      <Button className="mt-auto  bg-gradient-to-r from-eclipse to-eden w-full">
        <Plus /> Add
      </Button>
    </div>
  );
};

export default AddMetricSheet;
