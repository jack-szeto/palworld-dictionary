"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/Palworld-logo.svg";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ModeToggle } from "./mode-toggle";
import { Typography } from "./ui/typography";

export type Route = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};
export const routes: Route[] = [
  {
    label: "Pals",
    href: "/pals",
  },
  {
    label: "Breedings",
    href: "/breedings",
  },
  {
    label: "Affixes",
    href: "/affixes",
  }
];

export function Header() {
  const { resolvedTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src={logo}
              alt="Palworld"
              className={cn(" w-32 filter", {
                invert: resolvedTheme === "dark",
              })}
            />
            <Typography variant="h3">Dictionary</Typography>
          </Link>
          <nav className="flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center"
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
