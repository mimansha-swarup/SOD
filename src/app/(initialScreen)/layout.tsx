import BgSvg from "@/components/shared/BgSvg";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="overflow-hidden h-screen w-screen">
      <div className="absolute top-0 right-0  -left-1/2  bottom-0 blur-3xl transform-gpu overflow-hidden ">
        <div className=" pulse-shape h-screen w-screen bg-gradient-to-tr from-primary to-accent blur-3xl opacity-30 -z-1 animate-pulse-slow" />
      </div>
      <div className="max-w-[425px] m-auto py-4 w-screen ">{children}</div>
    </main>
  );
};

export default Layout;
