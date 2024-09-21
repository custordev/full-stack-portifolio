import React from "react";
import SectionSubHeading from "./SectionSubHeading";
import { Check, Database, Dumbbell } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { TechnologyProps } from "./technical-skills";
import { FaPython } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiNextdotjs, SiPrisma } from "react-icons/si";
import Paragraph from "./Paragraph";

export default function GeneralSkills() {
  const generalSkills = [
    {
      title: "Figma",
      percent: 70,
      color: "text-blue-500",
    },
    {
      title: "Postgress",
      percent: 60,
      color: "text-teal-500",
    },
    {
      title: "Next Js",
      percent: 98,
      color: "text-pink-500",
    },
    {
      title: "Prisma ORM",
      percent: 98,
      color: "text-slate-500",
    },
  ];
  const languages: TechnologyProps[] = [
    {
      title: "Python",
      // icon:<FaPython />
      icon: FaPython,
      percent: 50,
      color: "text-blue-500",
    },
    {
      title: "Postgress",
      // icon:<FaPython />
      icon: BiLogoPostgresql,
      percent: 60,
      color: "text-teal-500",
    },
    {
      title: "Next Js",
      // icon:<FaPython />
      icon: SiNextdotjs,
      percent: 98,
      color: "text-pink-500",
    },
    {
      title: "Prisma ORM",
      // icon:<FaPython />
      icon: SiPrisma,
      percent: 98,
      color: "text-slate-500",
    },
  ];
  const practices = [
    "DWH & DB Concepts",
    "Data Analytics Engineering",
    "Data Preparation",
    "Oracle SQL",
    "Data Integration",
    "Data Provisioning",
    "Data Solution Architecture",
    "ETL/ELT Solutions",
  ];

  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16">
      <div className="py-2 pb-6">
        <SectionHeading title="General Skills" />
      </div>
      <SectionSubHeading title="Database" icon={Database} />
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
        {generalSkills.map((tech, i) => {
          // const Icon = tech.icon;
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
                  {/* <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 flex-shrink-0" /> */}
                  <span className="text-center text-2xl lg:text-4xl font-bold text-gray-800 dark:text-white">
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

      <div className="py-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="">
          <SectionSubHeading title="Languages" icon={Database} />
          <div className="py-4 space-y-8">
            {languages.map((lang, i) => {
              const Icon = lang.icon;
              const percent = Math.floor(lang.percent / 10);
              const progress = Array(10).fill(false).fill(true, 0, percent);
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 hidden rounded-2xl border lg:flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="">
                    <div className="w-10 h-10 rounded-2xl border lg:hidden flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2>
                      {lang.title}-{percent}
                    </h2>
                    <div className="flex items-center gap-6">
                      <div className="">
                        <div className="flex space-x-2">
                          {progress.map((filled, index) => (
                            <Circle key={index} filled={filled} />
                          ))}
                        </div>
                      </div>
                      <p>{lang.percent}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="">
          <SectionSubHeading title="Best Practices" icon={Database} />
          <div className="py-3 space-y-4">
            {practices.map((item, i) => {
              return (
                <div key={i} className="flex items-center">
                  <Check className="text-lime-500 w-4 h-4 flex-shrink-0 mr-2" />
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const Circle = ({ filled }: { filled: boolean }) => {
  return (
    <div
      className={`w-4 h-4 rounded-full ${
        filled ? "bg-lime-500" : "bg-gray-500"
      }`}
    />
  );
};
