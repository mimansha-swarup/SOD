import { months } from "@/constants/calendar";
import { formatDate } from "@/utils/calendar";
import classNames from "classnames";
import React, { FC } from "react";

type DateChipProps = {
  dateObject: Date;
  handleClick: () => void;
  isSelected: boolean;
};
const DateChip: FC<DateChipProps> = ({
  handleClick,
  dateObject = new Date(),
  isSelected = false,
}) => {
  const day = dateObject.getDate();
  const month = months?.[dateObject.getMonth()];

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "flex flex-col px-1 py-1 rounded-lg",
        isSelected && "bg-neutral-200"
      )}
    >
      <p className="text-xs text-center">{month}</p>
      <p className="text-sm text-center">{formatDate(day)}</p>
    </div>
  );
};

export default DateChip;
