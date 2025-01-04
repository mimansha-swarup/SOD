"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import React from "react";

const PageHeader = ({
  title,
  rightIcon,
  rightIconClick,
  className,
  showBackIcon = true,
}: {
  title: string;
  rightIcon?: React.ReactNode;
  rightIconClick?: () => void;
  className?: string;
  showBackIcon?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className={cn("flex  w-full  items-center justify-center", className)}>
      <div className="mr-auto size-6">
        {showBackIcon && (
          <ChevronLeft
            onClick={() => router.back()}
            className="cursor-pointer"
            height={24}
            width={24}
          />
        )}
      </div>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="ml-auto size-6" onClick={rightIconClick}>
        {rightIcon}
      </div>
    </div>
  );
};

export default PageHeader;
