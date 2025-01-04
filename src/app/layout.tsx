import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import "./index.css";
import Navbar from "@/components/shared/Navbar";

const font = Readex_Pro({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
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
      <body className={`${font.style.fontFamily} flex  `}>
        <div className="max-w-[425px] m-auto py-4 ">{children}</div>
        <Navbar />
      </body>
    </html>
  );
}
