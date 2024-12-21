"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
//  add image and text and at bottom only google signin
const SignUpContainer = () => {
  return (
    <div className=" flex flex-col  justify-between pt-12 pb-16 h-screen">
      <div className="flex flex-col">
        <h1 className="text-2xl text-eden font-bold text-center mb-2">
          Welcome to MetricTracker
        </h1>
        <p className="text-xs text-eclipse text-center mb-4 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio animi
          fuga aperiam, non atque cumque quia quasi sunt magni corporis eaque,
          debitis, officiis necessitatibus? Quam a sit ad explicabo soluta?
        </p>
        <div className="w-full h-60 relative ">
          <Image src="/skill.svg" alt="signup" fill objectFit="contain" />
        </div>
      </div>

      <div>
        <Button
          onClick={() => {
            window.open("/", "_self");
          }}
          className="py-4 w-full rounded-lg bg-eden "
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default SignUpContainer;
