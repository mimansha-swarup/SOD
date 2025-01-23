"use client";
import HomeContainer from "@/container/home";
import { getUser } from "@/lib/features/user/user.slice";
import { useAppSelector } from "@/lib/store";

export default function Home() {
  // const data = useAppSelector((state) => state);
  // console.log("data", data);
  return (
    <main>
      <HomeContainer />
      {/* <SignupContainer /> */}
    </main>
  );
}
