"use client";
import BgSvg from "@/components/shared/BgSvg";

import Navbar from "@/components/shared/Navbar";
import { auth } from "@/lib/firebase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import StoreProvider from "../StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUser } from "@/lib/features/user/user.thunk";

import { AppDispatch, useAppDispatch, useAppSelector } from "@/lib/store";
import { getUser } from "@/lib/features/user/user.slice";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const userId = auth.currentUser?.uid ?? "";
  // console.log("userId", userId);
  // const cookieStore = cookies();

  console.log("asdasdasd", auth.currentUser?.uid);
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser?.uid) {
      // (await cookieStore).set("userId", currentUser?.uid, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   maxAge: 60 * 60 * 24 * 1, // 1 days
      //   path: "/",
      // });
    } else {
      // (await cookieStore).delete("userId");
      redirect("/signup");
    }
  });
  return (
    <>
      <div className="max-w-[425px] m-auto py-4 w-screen ">
        <StoreProvider>{children}</StoreProvider>
      </div>
      <Navbar />
      <BgSvg />
    </>
  );
};

export default Layout;
