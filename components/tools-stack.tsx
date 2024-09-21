import React from "react";
import SectionSubHeading from "./SectionSubHeading";
import { Dumbbell } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { TechnologyProps } from "./technical-skills";
import { FaPython } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiNextdotjs, SiPrisma } from "react-icons/si";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";
import { SiVercel } from "react-icons/si";
import { SiShadcnui } from "react-icons/si";
import Paragraph from "./Paragraph";
export default function ToolsStack() {
  const technologies: TechnologyProps[] = [
    {
      title: "Github",
      // icon:<FaPython />
      icon: FaGithub,
      percent: 50,
      color: "text-slate-900",
    },
    {
      title: "Vercel",
      // icon:<FaPython />
      icon: SiVercel,
      percent: 90,
      color: "text-slate-900",
    },
    {
      title: "Shadcn",
      // icon:<FaPython />
      icon: SiShadcnui,
      percent: 80,
      color: "text-slate-900",
    },
    {
      title: "Prisma ORM",
      // icon:<FaPython />
      icon: SiPrisma,
      percent: 95,
      color: "text-slate-500",
    },
  ];
  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16">
      <SectionSubHeading title="Tools Skills" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Tools Stack" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
        {technologies.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={i}
              className="rounded-2xl shadow p-3 dark:border-gray-800 border "
            >
              <div className="relative size-24 lg:size-40">
                <svg
                  className="size-full"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-gray-200 dark:text-neutral-700"
                    stroke-width="2"
                  ></circle>

                  <g className="origin-center -rotate-90 transform">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-current text-lime-600 dark:text-lime-500"
                      stroke-width="2"
                      stroke-dasharray="100"
                      stroke-dashoffset={`${100 - tech.percent}`}
                    ></circle>
                  </g>
                </svg>
                <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center items-center gap-2">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 flex-shrink-0" />
                  <span className="text-center text-base font-bold text-gray-800 dark:text-white">
                    {tech.percent}%
                  </span>
                </div>
              </div>
              <div className="pt-2 text-center">
                <h2>{tech.title}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
