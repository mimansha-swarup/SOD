"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import { popBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { SheetPosition, SHEETS } from "@/constants/bottomsheet";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BottomSheetProps } from "@/types/bottomsheet";

const ShowBS: React.FC<Partial<BottomSheetProps>> = ({
  className = "",
  onClose,
  ...restProps
}) => {
  const bsChild = useAppSelector((state) => state.bottomSheet.bottomSheets);
  const dispatch = useAppDispatch();

  const _onClose = () => {
    dispatch(popBottomSheet());
    onClose && onClose();
  };

  const bs = bsChild[bsChild.length - 1];
  const Child = bs && SHEETS[bs.sheetName];
  const initialPosition = bs?.initialPosition || SheetPosition.QUARTER;

  return (
    <Sheet open={Boolean(bs)} onOpenChange={_onClose}>
      <SheetContent
        side="bottom"
        className={cn(
          "h-[96vh] sm:h-[96vh] rounded-t-3xl",
          className,
          initialPosition
        )}
        {...restProps}
        key={bs?.sheetName}
      >
        <SheetTitle className="text-eden mb-6">
          {bs?.title || "Bottom Sheet"}
        </SheetTitle>
        {Child && <Child {...bs.props} />}
      </SheetContent>
    </Sheet>
  );
};

export default ShowBS;
