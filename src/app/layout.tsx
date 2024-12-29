import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "./index.css";
import Navbar from "@/components/shared/Navbar";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOD Metric Tracker",
  description:
    "Web application to track metric for the community skills over degree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.style.fontFamily} dark flex `}>
        <div className="w-[425px] m-auto py-4 p-4 ">{children}</div>
        <Navbar />
      </body>
    </html>
  );
}
