"use client";
import { Button } from "@/components/ui/button";
import { googleSignIn, onGoogleSignIn, onSignIn, onSignIn } from "@/utils/auth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
//  add image and text and at bottom only google signin
const SignUpContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const community = searchParams.get("community") || "SOD";

  const onSuccessfulLogin = () => {
    router.push("/questionnaire");
  };

  console.log("router.query", community);
  return (
    <div className=" flex flex-col  justify-between pt-12 pb-16 h-screen">
      <div className="flex flex-col">
        <h1 className="text-2xl text-primary font-bold text-center mb-2">
          Welcome to MetricTracker
        </h1>
        <p className="text-xs text-muted-foreground text-center mb-4 ">
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
          onClick={onGoogleSignIn({ community, onSuccessfulLogin })}
          className="py-4 w-full rounded-lg bg-primary "
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default SignUpContainer;
