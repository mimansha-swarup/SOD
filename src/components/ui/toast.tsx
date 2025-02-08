"use client";
import { closeToast } from "@/lib/features/toast/toast.slice";
import { useAppDispatch } from "@/lib/store";
import { LucidePanelTopClose } from "lucide-react";
import { useEffect } from "react";

interface IToastProps {
  type: "success" | "error";
  message: string;
}
const Toast = ({ type, message }: IToastProps) => {
  const dispatch = useAppDispatch();
  const toastType = {
    success: {
      color: "#39D98A",
      borderLeft: " 8px solid #39D98A",
    },
    error: {
      color: "#FF5C5C",
      borderLeft: " 8px solid #FF5C5C",
    },
  };
  // useEffect(() => {
  //   setTimeout(() => deleteToast(), 5000);
  // });

  const deleteToast = () => {
    dispatch(closeToast());
  };

  return (
    <div
      style={{ ...toastType[type], minWidth: "10rem" }}
      className="absolute px-3 py-1 flex top-4 right-0 bg-background rounded-md shadowshadow-md"
    >
      <p className="text-lg">{message}</p>
      <div className="ml-auto">
        <LucidePanelTopClose onClick={deleteToast} className="react-icons" />
      </div>
    </div>
  );
};

export default Toast;
