"use client";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

export default function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center space-x-0 text-salmon font-bold mr-0.5">
      <Input
        type="number"
        value={value}
        // onChange={(e) => setValue(Number(e.target.value))}
        onChange={onChange}
        className="w-12 h-8 text-center text-secondary"
        min={0}
      />
    </div>
  );
}
