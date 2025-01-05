import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "../ui/menubar";
import { Button } from "../ui/button";
import React from "react";
import {
  SHEETS_NAME,
  SheetHeight,
  SheetPosition,
} from "@/constants/bottomsheet";
import { trackersList, TRACKER_MODE } from "@/constants/tracker";
import { addBottomSheet } from "@/lib/features/bottomsheet/bottomsheet.slice";
import { EyeClosed, Pencil, Settings2 } from "lucide-react";
import { useAppDispatch } from "@/lib/store";

const ManifestationOptions = [
  {
    label: "Hide Manifestation",
    icon: <EyeClosed size={16} />,
  },
  {
    label: "Edit Manifestation",
    icon: <Pencil size={16} />,
  },
];

type ManifestationOption = (typeof ManifestationOptions)[number];

const ManifestationOptionButton = () => {
  // const dispatch = useAppDispatch();

  const handleOptionClick = (option: ManifestationOption) => () => {
    switch (option.label) {
      case "Hide Manifestation":
        localStorage.setItem("hideManifestation", "true");
        break;
      case "Edit Manifestation":
        // dispatch(
        //   addBottomSheet({
        //     sheetName: SHEETS_NAME.ADD_METRIC,
        //     title: "Edit Manifestation",
        //     props: {},
        //   })
        // );
        break;
    }
  };

  return (
    <Menubar className="absolute top-4 right-4  border-none">
      <MenubarMenu>
        <MenubarTrigger asChild className="">
          <Button variant="ghost" className="m-0">
            <Settings2 />
          </Button>
        </MenubarTrigger>
        <MenubarContent side="top" className="min-w-14 ">
          {ManifestationOptions.map((option) => (
            <MenubarItem
              key={option.label}
              onClick={handleOptionClick(option)}
              className="flex gap-2"
            >
              {option.icon} {option.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ManifestationOptionButton;
