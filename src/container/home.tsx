import React from "react";
import { AuroraHero } from "@/components/home/Aurora";
import Bento from "@/components/home/Bento";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/store";
import { getUser, getUsersCommunity } from "@/lib/features/user/user.slice";

const HomeContainer = () => {
  const { data: userRecord } = useAppSelector(getUser);
  const { data: usersCommunity } = useAppSelector(getUsersCommunity);
  const FName = userRecord?.name?.split(" ")?.[0] ?? "";
  console.log("userRecord");
  return (
    <div className="h-screen">
      <div className="flex mb-4 items-center gap-2 px-4">
        <Avatar className="size-6">
          <AvatarImage src={userRecord?.profilePicture} />
          <AvatarFallback>{FName?.[0]}</AvatarFallback>
        </Avatar>
        <p className=" text-sm font-semibold ">Hello, {FName}!</p>
      </div>
      <AuroraHero manifestation={usersCommunity?.manifestation} />

      <Bento />
    </div>
  );
};

export default HomeContainer;
