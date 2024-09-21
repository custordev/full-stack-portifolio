"use client";
import React from "react";
import SectionSubHeading from "./SectionSubHeading";
import SectionHeading from "./SectionHeading";
import { Dumbbell } from "lucide-react";
import ExperienceCarousel from "./carousels/ExperienceCarousel";
import { EmblaOptionsType } from "embla-carousel";
import Link from "next/link";
import { Button } from "./ui/button";
import Paragraph from "./Paragraph";
import { Experience } from "@prisma/client";

export default function WorkExperience({
  experiences,
}: {
  experiences: Experience[];
}) {
  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div
      className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16"
      id="resume"
    >
      <SectionSubHeading title="Resume" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Work Experience & Education" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-8">
        <ExperienceCarousel
          experiences={experiences}
          slides={SLIDES}
          options={OPTIONS}
        />
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="">
          <SectionSubHeading title="Courses" icon={Dumbbell} />
          <div className="py-3">
            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-slate-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-4 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                </div>
              </div>

              <div className="grow border p-4 rounded-md">
                <p className="py-1.5 mb-2 px-4 rounded-full border border-gray-400 dark:border-gray-700 text-xs inline-block">
                  2017 - 2018
                </p>
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                  <svg
                    className="flex-shrink-0 size-4 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" x2="8" y1="13" y2="13"></line>
                    <line x1="16" x2="8" y1="17" y2="17"></line>
                    <line x1="10" x2="8" y1="9" y2="9"></line>
                  </svg>
                  Created "Preline in React" task
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                  Washington Dc
                </p>
                <p className="py-3">
                  Michigan Technological University offers a B.S. Computer
                  Network.
                </p>
                <Button asChild variant={"outline"}>
                  <Link href={"#"}>Certificate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <SectionSubHeading title="Education" icon={Dumbbell} />
          <div className="py-3">
            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-slate-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-4 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                </div>
              </div>

              <div className="grow border p-4 rounded-md">
                <p className="py-1.5 mb-2 px-4 rounded-full border border-gray-400 dark:border-gray-700 text-xs inline-block">
                  2017 - 2018
                </p>
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                  <svg
                    className="flex-shrink-0 size-4 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" x2="8" y1="13" y2="13"></line>
                    <line x1="16" x2="8" y1="17" y2="17"></line>
                    <line x1="10" x2="8" y1="9" y2="9"></line>
                  </svg>
                  Created "Preline in React" task
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                  Washington Dc
                </p>
                <p className="py-3">
                  Michigan Technological University offers a B.S. Computer
                  Network.
                </p>
                <Button asChild variant={"outline"}>
                  <Link href={"#"}>Certificate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
