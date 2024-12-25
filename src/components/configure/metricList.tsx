import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { TRACKER_MODE, trackerData, trackersList } from "@/constants/tracker";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/store";
import { SheetHeight } from "@/constants/bottomsheet";
import { SheetPosition } from "@/constants/bottomsheet";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { SHEETS_NAME } from "@/constants/bottomsheet";
import { formatTrackerData } from "@/utils/configure";

const MetricList = () => {
  const dispatch = useAppDispatch();

  const record = formatTrackerData(trackerData);
  return (
    <div className="h-[calc(100vh-120px)] overflow-y-auto">
      <Accordion type="multiple" defaultValue={[record[0].name]}>
        {record.map((tracker) => (
          <AccordionItem key={tracker.name} value={tracker.name}>
            <AccordionTrigger className="text-base font-[20px]">
              {tracker.name}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              {tracker.list.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 mb-auto rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="ml-auto max-w-3 max-h-8"
                    onClick={() => {
                      dispatch(
                        addBottomSheet({
                          sheetName: SHEETS_NAME.ADD_METRIC,
                          props: { mode: TRACKER_MODE.edit, ...item },
                          title: `Edit ${tracker.name}`,
                          initialPosition: SheetHeight[SheetPosition.QUARTER],
                        })
                      );
                    }}
                  >
                    <Edit height={24} width={24} />
                  </Button>
                  <Button
                    variant="destructive"
                    className="ml-1 max-w-3 max-h-8"
                  >
                    <Trash height={24} width={24} />
                  </Button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MetricList;
