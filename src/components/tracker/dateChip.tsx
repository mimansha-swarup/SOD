import { months } from "@/constants/calendar";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/calendar";
import React, { FC } from "react";

type DateChipProps = {
  dateObject: Date;
  handleClick: () => void;
  isSelected: boolean;
  disabled?: boolean;
};
const DateChip: FC<DateChipProps> = ({
  handleClick,
  dateObject = new Date(),
  isSelected = false,
  disabled = false,
}) => {
  const day = dateObject.getDate();
  const month = months?.[dateObject.getMonth()];

  return (
    <div
      onClick={disabled ? () => {} : handleClick}
      className={cn(
        "flex flex-col px-1 py-1 rounded-lg text-center",
        isSelected && "bg-muted",
        disabled && "text-muted-foreground cursor-not-allowed"
      )}
    >
      <p className="text-sm ">{month}</p>
      <p>{formatDate(day)}</p>
    </div>
  );
};

export default DateChip;
