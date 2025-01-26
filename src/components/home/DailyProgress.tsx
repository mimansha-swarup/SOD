"use client";
import { Progress } from "@/components/ui/progress";
import React, { useRef, useState } from "react";

const DailyProgress = ({ progress }: { progress: number }) => {
  const [progressValue, setProgressValue] = useState(0);
  const renderRef = useRef(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (renderRef.current) {
      setProgressValue(progress);
    } else {
      timer = setTimeout(() => setProgressValue(progress), 500);
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
