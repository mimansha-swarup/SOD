"use client";
import { useAppSelector } from "@/lib/store";
import { getToast } from "@/lib/features/toast/toast.slice";
import Toast from "../ui/toast";
const ToastContainer = () => {
  const toastList = useAppSelector(getToast);

  return (
    <div className="relative">
      {toastList.map((data, index) => (
        <Toast key={index} type={data.type} message={data.message} />
      ))}
    </div>
  );
};

export default ToastContainer;
