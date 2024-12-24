import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { trackerData, trackersList } from "@/constants/tracker";
import { Edit } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const MetricList = () => {
  return (
    <div>
      <Accordion type="multiple" defaultValue={[trackerData[0].name]}>
        {trackerData.map((tracker) => (
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
                      <p className="text-sm font-medium">
                        {item.name}
                        <span className="text-xs ml-2 text-gray-500">
                          MAX: {item.maxValue}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>

                  <Button variant="ghost" className="ml-auto">
                    <Edit height={24} width={24} />
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
