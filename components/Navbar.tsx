import React from "react";
import Link from "next/link";
import { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import {
  AlignLeft,
  Blocks,
  Dumbbell,
  Github,
  Instagram,
  LayoutPanelTop,
  Linkedin,
  NotebookPen,
  NotebookText,
  Send,
  SquarePen,
  Twitter,
  UserRoundPen,
} from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";
export type IconProps = React.HTMLAttributes<SVGElement>;
const navItems = [
  {
    href: "/#about",
    icon: UserRoundPen,
    title: "about",
  },
  {
    href: "/#skills",
    icon: Dumbbell,
    title: "skills",
  },
  {
    href: "/#services",
    icon: Blocks,
    title: "services",
  },
  {
    href: "/#projects",
    icon: LayoutPanelTop,
    title: "projects",
  },
  {
    href: "/#resume",
    icon: NotebookText,
    title: "resume",
  },
  {
    href: "/#blogs",
    icon: SquarePen,
    title: "blogs",
  },
  {
    href: "/#contact",
    icon: Send,
    title: "contact",
  },
];

export function Navbar() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center shadow-lg md:shadow-xl rounded-full">
      <TooltipProvider>
        <Dock
          direction="middle"
          className="bg-white dark:bg-slate-950 h-[75px] border-0 px-4 rounded-full"
        >
          {navItems.map((item) => (
            <DockIcon key={item.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "lg:size-12 size-8 rounded-full dark:border-slate-600"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator
            orientation="vertical"
            className="h-full py-2 mx-2 hidden md:visible"
          />
          <DockIcon>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
