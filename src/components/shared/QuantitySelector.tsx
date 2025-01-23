"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuantitySelector() {
  const [value, setValue] = useState(3);

  return (
    <div className="flex items-center space-x-0 text-salmon font-bold">
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-12 h-8 text-center text-secondary"
        min={0}
      />
    </div>
  );
}
