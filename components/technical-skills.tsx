import React from "react";
import { IconCloudGlobe } from "./IconCloudGlobe";
import SectionHeading from "./SectionHeading";
import SectionSubHeading from "./SectionSubHeading";
import { Dumbbell, Github } from "lucide-react";
import { FaPython } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiNextdotjs, SiPrisma } from "react-icons/si";
import { cn } from "@/lib/utils";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import { IconType } from "react-icons";
import { Skill } from "@prisma/client";
import Image from "next/image";
export type TechnologyProps = {
  title: string;
  icon: IconType;
  percent: number;
  color: string;
};
export default function TechnicalSkills({ skills }: { skills: Skill[] }) {
  return (
    <div
      className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16 "
      id="skills"
    >
      <SectionSubHeading title="Technical Skills" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Technologies" />
      </div>
      <p className="text-base py-3">
        I have been a full stack web developer since 2022 and I love building
        Software and Sharing, but it wasn't always like that. I went through a
        four-year Mechanical Engineering Course and it had nothing to do with
        Software development.
      </p>
      <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills.map((tech, i) => {
          return (
            <div
              key={i}
              className="rounded-2xl shadow p-3 dark:border-gray-800 border"
            >
              <div className="flex justify-end">
                <div className="rounded-full px-6 py-2 border inline-block">
                  {tech.percent}%
                </div>
              </div>
              <div className="flex items-center gap-6 pt-2 pb-5 ">
                <Image
                  width={200}
                  height={200}
                  src={tech.icon ?? ""}
                  alt={tech.title}
                  className={cn("w-10 h-10 object-contain flex-shrink-0")}
                />
                <p className="text-xl">{tech.title}</p>
              </div>
              <div
                className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-500"
                role="progressbar"
              >
                <div
                  className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-50"
                  style={{ width: `${tech.percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center">
        <IconCloudGlobe />
        {/* <div className="">
          <TechnologyCards />
        </div> */}
      </div>
    </div>
  );
}
