import BgSvg from "@/components/shared/BgSvg";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="max-w-[425px] m-auto py-4 w-screen ">{children}</div>
      <div className="absolute bottom-0 left-0 rounded-full size-80 bg-secondary/50 blur-3xl -z-1 -translate-x-1/2 translate-y-1/2 animate-pulse-slow" />
      <div className="absolute top-0 right-0 rounded-full size-64 bg-accent/50 blur-3xl -z-1 translate-x-1/2 translate-y-1/2 animate-pulse-slow" />
    </>
  );
};

export default Layout;
