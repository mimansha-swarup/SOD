"use client";
import { Progress } from "@/components/ui/progress";
import { getUsersCommunity } from "@/lib/features/user/user.slice";
import { useAppSelector } from "@/lib/store";
import React, { useRef, useState } from "react";

const DailyProgress = ({ progress }: { progress?: number }) => {
  const { data: usersCommunity } = useAppSelector(getUsersCommunity);
  const [progressValue, setProgressValue] = useState(0);
  const renderRef = useRef(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const value =
      Number.isInteger(progress) && typeof progress !== "undefined"
        ? progress
        : usersCommunity?.streak;
    if (renderRef.current) {
      setProgressValue(value);
    } else {
      timer = setTimeout(() => setProgressValue(value), 500);
      renderRef.current = true;
    }
    return () => clearTimeout(timer);
  }, [progress]);
  return (
    <div className="px-4">
      <Progress value={progressValue} />
    </div>
  );
};

export default DailyProgress;
