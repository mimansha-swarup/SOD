import React from "react";
import { Card, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

const BentoCard = ({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "p-4 border-primary bg-secondary text-background",
        className
      )}
    >
      {title && <CardTitle className="mb-1">{title}</CardTitle>}
      {children}
    </Card>
  );
};

export default BentoCard;
