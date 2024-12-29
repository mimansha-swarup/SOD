"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import React from "react";

const PageHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="flex relative w-full  items-center justify-center">
      <ChevronLeft
        onClick={() => router.back()}
        className="cursor-pointer absolute left-0"
        height={24}
        width={24}
      />
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};

export default PageHeader;
