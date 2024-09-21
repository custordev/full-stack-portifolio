"use client";
import React, { useEffect } from "react";
import CustomTextTransition from "./CustomTextTransition";
import Highlighter from "react-highlight-words";
import Meteors from "./magicui/meteors";
import { Settings } from "@prisma/client";
export default function AboutSection({
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
  const stats = [
    {
      title: "Completed Projects",
      count: 36,
      plus: false,
    },
    {
      title: "Years of Experience",
      count:
        siteSettings && siteSettings.id ? siteSettings.yearsOfExperience : 0,
      plus: false,
    },
    {
      title: "Clients worked on",
      count: siteSettings && siteSettings.id ? siteSettings.clients : 0,
      plus: true,
    },
  ];
  return (
    <div
      id="about"
      className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-8 lg:py-16"
    >
      <Meteors number={30} />
      <p className="text-2xl py-4">
        Hello, I&apos;m &nbsp;
        <span className="inline-block text-lime-500">
          {<CustomTextTransition words={TEXTS} />}
        </span>
      </p>
      <h2 className="text-xl md:text-4xl pb-8 lg:text-[52px] leading-[2rem] lg:leading-[4.5rem] ">
        {siteSettings?.profileLineOne}{" "}
        <span className="highlight-container">
          <span className="highlight">{siteSettings?.profileLineTwo}</span>
        </span>{" "}
        {siteSettings?.profileLineThree}
      </h2>

      <p className="text-sm md:text-base">{siteSettings?.profileDescription}</p>

      <div className="py-8 lg:py-16 grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => {
          return (
            <div key={i} className="flex flex-col items-center space-x-4">
              <p className="scroll-m-20 text-4xl  tracking-tight lg:text-5xl">
                {item.count}
                {item.plus && "+"}
              </p>
              <p className="text-balance">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
