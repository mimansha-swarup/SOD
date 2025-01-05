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
      <div className="max-w-[425px] m-auto py-4 w-screen o ">{children}</div>
      <Navbar />
      <BgSvg />
    </>
  );
};

export default Layout;
