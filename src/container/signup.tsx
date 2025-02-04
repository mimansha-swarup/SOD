"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { getUserData } from "@/lib/actions/users.action";
import { onGoogleSignIn } from "@/utils/auth";
import { getCommunityId } from "@/utils/tracker";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IUser } from "@/types/feature/user";
import { onAuthStateChanged } from "firebase/auth";
import router from "next/router";
//  add image and text and at bottom only google signin
const SignUpContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const community = searchParams.get("community") || getCommunityId();
  const [isLoading, setIsLoading] = useState(false);
  const onSuccessfulLogin = async () => {
    onAuthStateChanged(auth, async (curr) => {
      const userId = curr?.uid;
      setIsLoading(true);
      if (userId) {
        const userData = await getUserData({
          uid: userId,
        });

        const parsedUser = (userData ? JSON.parse(userData) : {}) as IUser;

        const communityObject = parsedUser.communities?.find(
          (eachCommunity) => eachCommunity?.community === community
        );
        communityObject?.questionnaireCompleted
          ? router.push("/")
          : router.push("/questionnaire");
      }
      setIsLoading(false);
    });
  };

  return (
    <div className=" flex flex-col  justify-between pt-12 pb-16 h-[calc(screen - h-8)]">
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
          loading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            console.log("Hello");
            onGoogleSignIn({ community, onSuccessfulLogin })();
          }}
          className="py-4 w-full rounded-lg bg-primary "
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default SignUpContainer;
