import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getUser, getUsersCommunity } from "@/lib/features/user/user.slice";
import { useAppSelector } from "@/lib/store";
import React, { useState } from "react";
import classNames from "classnames";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { EyeClosed, EyeIcon, EyeOff } from "lucide-react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { googleSignOut } from "@/utils/auth";
import { getCommunityId } from "@/utils/tracker";

const ProfileContainer = () => {
  const { data: userRecord } = useAppSelector(getUser);
  const { data: usersCommunityRecord } = useAppSelector(getUsersCommunity);
  const [showIncome, setShowIncome] = useState(false);
  const toggleIncomeVisbility = () => {
    setShowIncome((prev) => !prev);
  };
  return (
    <section className="px-4 flex flex-col h-[calc(100vh-32px)]">
      <PageHeader title="Profile" showBackIcon={false} />

      <div className="flex w-full mt-6 mb-8 ">
        <Avatar className="size-20 mr-auto ">
          <AvatarImage src={userRecord?.profilePicture} />
          <AvatarFallback>{userRecord?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col ">
          <div className="px-2 bg-primary w-fit ml-auto shadow  rounded text-xs mb-auto">
            <span>{usersCommunityRecord?.currentLevel}</span>
          </div>
          <p className="text-lg">{userRecord?.name}</p>
          <p className="text-end">{usersCommunityRecord?.character?.name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* <div className="bg-white/10 flex py-2.5 px-4 rounded-md backdrop-blur border border-white/20 ">
          <p className=" basis-1/2">My streak</p>
          <p className=" basis-1/2">: {usersCommunityRecord?.streak}</p>
        </div> */}
        <div className="bg-white/10 flex py-2.5 px-4 rounded-md backdrop-blur border border-white/20 ">
          <p className=" basis-1/2">Switch community</p>
          <Select
            value={getCommunityId()}
            // onValueChange={handleAddMetric("type")}
          >
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(userRecord?.communities ?? [])?.map((community) => (
                <SelectItem
                  key={community.community}
                  value={community.community}
                >
                  {community.community}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="bg-white/10 flex py-2.5 px-4 rounded-md backdrop-blur border border-white/20 ">
          <p className=" basis-1/2">Current income</p>
          <p className=" basis-1/2">
            : {showIncome ? usersCommunityRecord?.income : "********"}
          </p>
          <div onClick={toggleIncomeVisbility}>
            {showIncome ? (
              <EyeOff className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </div>
        </div>
        <div className="bg-white/10 flex py-2.5 px-4 rounded-md backdrop-blur border border-white/20 ">
          <p className=" basis-1/2">Desired Income</p>
          <p className=" basis-1/2">: {usersCommunityRecord?.desiredIncome}</p>
        </div>
      </div>

      <Button
        variant={"outline"}
        className="bg-transparent hover:bg-transparent w-full mt-auto border-red-500  text-red-500 mb-12"
        onClick={googleSignOut}
      >
        Log out
      </Button>
    </section>
  );
};

export default ProfileContainer;
