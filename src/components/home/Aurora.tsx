"use client";
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
// import ManifestationOptionButton from "./ManifestationOptionButton";
import { cn } from "@/lib/utils";

const COLORS_TOP = ["#DC2626", "#F97316", "#FACC15"];

export const AuroraHero = ({ manifestation = "" }) => {
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
  const textSize = manifestation.length > 10 ? "text-2xl" : "text-3xl";
  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid h-2/5 place-content-center overflow-hidden px-4 py-24 "
    >
      {/* <ManifestationOptionButton /> */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className={cn(
            "max-w-3xl text-secondary-foreground text-center font-medium leading-tight",
            textSize
          )}
        >
          {/* sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight */}
          {manifestation}
        </h1>
      </div>
    </motion.section>
  );
};
