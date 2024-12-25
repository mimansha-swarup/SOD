import React from "react";
import { Plus } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { useAppDispatch } from "../../lib/store";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";

import {
  SheetHeight,
  SheetPosition,
  SHEETS_NAME,
} from "@/constants/bottomsheet";
import { TRACKER } from "@/types/tracker";
import { TRACKER_MODE, trackersList } from "@/constants/tracker";

const AddMetricButton = ({ selectedTracker }: { selectedTracker: TRACKER }) => {
  const dispatch = useAppDispatch();
  return (
    <Menubar className="bg-eden p-0 rounded-full w-fit fixed bottom-16 right-4">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button className="bg-eden h-[36px] w-[36px] rounded-full">
            <Plus height={24} width={24} />
          </Button>
        </MenubarTrigger>
        <MenubarContent side="top" className="min-w-14 mr-4">
          {trackersList.map((tracker) => (
            <MenubarItem
              key={tracker}
              onClick={() =>
                dispatch(
                  addBottomSheet({
                    sheetName: SHEETS_NAME.ADD_METRIC,
                    props: { mode: TRACKER_MODE.add },
                    title: `Add ${tracker}`,
                    initialPosition: SheetHeight[SheetPosition.QUARTER],
                  })
                )
              }
            >
              {tracker}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AddMetricButton;
