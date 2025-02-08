// "use client";
import BgSvg from "@/components/shared/BgSvg";

import Navbar from "@/components/shared/Navbar";
import { auth } from "@/lib/firebase";
import { redirect } from "next/navigation";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthRedirect from "@/components/shared/AuthRedirect";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const userId = auth.currentUser?.uid ?? "";
  // console.log("userId", userId);
  // const cookieStore = cookies();

  // console.log("asdasdasd", auth.currentUser?.uid);

  return (
    <>
      <AuthRedirect />
      <div className="max-w-[425px] m-auto py-4 w-screen ">{children}</div>
      <Navbar />
      <BgSvg />
    </>
  );
};

export default Layout;
