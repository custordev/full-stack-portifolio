"use client";
import React, { useEffect } from "react";
import { ModeToggle } from "./mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import TextTransition, { presets } from "react-text-transition";

import Link from "next/link";
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
  Youtube,
} from "lucide-react";
import Image from "next/image";
import CustomTextTransition from "./CustomTextTransition";
import { BorderBeam } from "./magicui/border-beam";
import ShimmerButton from "./magicui/shimmer-button";
import { Navbar } from "./Navbar";
import { Settings } from "@prisma/client";
import { Button } from "./ui/button";

export default function FixedSidebar({
  siteSettings,
}: {
  siteSettings: Settings | null;
}) {
  const TEXTS =
    siteSettings && siteSettings.id
      ? siteSettings.animatedText.split(",")
      : [
          "Muke Johnbaptist",
          "Fullstack Developer",
          "Graphics Designer",
          "YouTuber",
          "Teacher",
        ];

  const socialLinks = [
    {
      href: `${siteSettings?.linkedin}`,
      icon: Linkedin,
      title: "Linkedin",
    },
    {
      href: `${siteSettings?.instagram}`,
      icon: Instagram,
      title: "Instagram",
    },
    {
      href: `${siteSettings?.twitter}`,
      icon: Twitter,
      title: "Twitter",
    },
    {
      href: `${siteSettings?.github}`,
      icon: Github,
      title: "Github",
    },
    {
      href: `${siteSettings?.youTube}`,
      icon: Youtube,
      title: "Github",
    },
  ];
  return (
    <div className="flex px-2 gap-4 w-full  ">
      <div className="fixed bottom-2 left-0 lg:left-1/2 z-50">
        <Navbar />
      </div>
      <div className="bg-slate-50 block dark:bg-slate-900 rounded-tl-2xl w-full dark:text-slate-50 p-8 rounded-b-2xl">
        <div className="relative w-full rounded-xl overflow-hidden">
          <Image
            src={`${siteSettings?.imageUrl}`}
            alt={`${siteSettings?.profileName}`}
            width={500}
            height={500}
            className="w-full block rounded-tl-2xl rounded-b-2xl"
          />
          <BorderBeam />
        </div>
        <div className="py-2 space-y-3 text-center">
          <p className="uppercase text-lime-500 flex items-center justify-center">
            {<CustomTextTransition words={TEXTS} />}
          </p>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {siteSettings?.profileName}
          </h2>

          <div className="py-2 flex items-center justify-center space-x-2">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className="flex flex-col gap-1.5 dark:bg-slate-600/5 border border-slate-200/60 dark:border-slate-800/50 bg-slate-50/90  group items-center justify-center rounded-[20px] w-12 h-12 p-2 hover:text-lime-500 duration-300"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex border-t pt-6 flex- justify-between items-center ">
          <Link
            target="_blank"
            className="hover:text-lime-500 py-2.5 px-6 border duration-300 rounded-full"
            href={siteSettings?.cvUrl ?? "#"}
          >
            Download Cv
          </Link>

          <Button size={"lg"} asChild style={{ borderRadius: "100px" }}>
            <Link
              target="_blank"
              className=""
              href="https://calendar.app.google/npqa12eGtE1NgfGaA"
            >
              <span className="">Book Appointment</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
