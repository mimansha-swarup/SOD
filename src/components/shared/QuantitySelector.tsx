import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuantitySelector() {
  const [value, setValue] = useState(3);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => Math.max(0, prev - 1)); // Prevent negative values

  return (
    <div className="flex items-center space-x-0 text-salmon font-bold">
      <Button
        variant="outline"
        disabled={!value}
        onClick={decrement}
        className="w-8 h-full p-0 flex items-center justify-center"
      >
        -
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-12 h-8 text-center text-eden"
      />
      <Button
        variant="outline"
        onClick={increment}
        className="w-8 h-full p-0 flex items-center justify-center"
      >
        +
      </Button>
    </div>
  );
}
