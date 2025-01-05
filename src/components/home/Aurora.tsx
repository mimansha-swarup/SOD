"use client";
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import ManifestationOptionButton from "./ManifestationOptionButton";

const COLORS_TOP = ["#DC2626", "#F97316", "#FACC15"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, transparent 50%, ${color})`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid h-2/5 place-content-center overflow-hidden px-4 py-24 "
    >
      <ManifestationOptionButton />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl text-secondary-foreground text-center text-3xl font-medium leading-tight  ">
          {/* sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight */}I
          want to earn more money
        </h1>
      </div>
    </motion.section>
  );
};
