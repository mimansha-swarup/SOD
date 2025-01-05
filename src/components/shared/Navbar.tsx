"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, User, LineChart, Linkedin } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: LineChart, label: "Tracker", href: "/tracker" },
    // { icon: Linkedin, label: "Network", href: "/network" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-1.5 h-12  right-1/2 backdrop-blur-md border border-foreground/80  bg-background/80 p-1 w-[85%] rounded-2xl translate-x-1/2 ">
      <div className="max-w-screen-xl mx-auto h-full">
        <div className="flex  items-center h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex justify-center items-center gap-1 rounded-lg transition-colors flex-1 ease-in-out ",
                  isActive ? "text-black bg-primary p-2 rounded-xl" : ""
                )}
              >
                <Icon className="size-6" />
                {isActive && (
                  <span className="text-xs font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
