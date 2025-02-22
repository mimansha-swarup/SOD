import React from "react";
import { AuroraHero } from "@/components/home/Aurora";
import Bento from "@/components/home/Bento";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/store";
import { getUser, getUsersCommunity } from "@/lib/features/user/user.slice";
import DailyProgress from "@/components/home/DailyProgress";
import HomeContainerShimmer from "@/components/shimmers/HomeContainer";

const HomeContainer = () => {
  const { data: userRecord, isLoading: isUserLoading } =
    useAppSelector(getUser);
  const { data: usersCommunity, isLoading: isCommunityLoading } =
    useAppSelector(getUsersCommunity);
  const FName = userRecord?.name?.split(" ")?.[0] ?? "";

  if (isUserLoading || isCommunityLoading) return <HomeContainerShimmer />;

  return (
    <div className="h-[calc(screen - h-8)]">
      <div className="flex mb-4 items-center gap-2 px-4">
        <Avatar className="size-6">
          <AvatarImage src={userRecord?.profilePicture} />
          <AvatarFallback>{FName?.[0]}</AvatarFallback>
        </Avatar>
        <p className=" text-sm font-semibold ">Hello, {FName}!</p>
      </div>
      <DailyProgress />
      <AuroraHero manifestation={usersCommunity?.manifestation} />

      <Bento />
    </div>
  );
};

export default HomeContainer;
