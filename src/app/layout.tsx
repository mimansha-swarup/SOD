import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import "./index.css";

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
      <body className={`${font.style.fontFamily} flex text-foreground dark `}>
        <div className="max-w-[425px] m-auto w-screen ">
          {children}
        </div>
      </body>
    </html>
  );
}
