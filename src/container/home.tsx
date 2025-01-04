import React from "react";
import { AuroraHero } from "@/components/home/Aurora";
import Bento from "@/components/home/Bento";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HomeContainer = () => {
  return (
    <div className="h-screen">
      <div className="flex mb-4 items-center gap-2 px-4">
        <Avatar className="size-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className=" text-sm font-semibold ">Hello, Mimansha!</p>
      </div>
      <AuroraHero />

      <Bento />
     
    </div>
  );
};

export default HomeContainer;
