"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      {theme === "light" ? (
        <button
          className="flex  bg-slate-50  group items-center justify-center rounded-[20px] w-6 h-6 lg:w-10 lg:h-10  text-slate-900 hover:text-lime-500 duration-300"
          onClick={() => setTheme("dark")}
        >
          <Moon className="w-5 h-5 flex-shrink-0" />
        </button>
      ) : (
        <button
          className="flex  bg-slate-900  group items-center justify-center rounded-[20px] w-6 h-6 lg:w-10 lg:h-10  text-slate-50 hover:text-lime-500 duration-300"
          onClick={() => setTheme("light")}
        >
          <Sun className="w-5 h-5 flex-shrink-0" />
        </button>
      )}
    </>
  );
}
