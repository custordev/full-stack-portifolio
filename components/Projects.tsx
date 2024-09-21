"use client";
import React, { useState } from "react";
import SectionSubHeading from "./SectionSubHeading";
import SectionHeading from "./SectionHeading";
import { Dumbbell, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Paragraph from "./Paragraph";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Project, ProjectCategory } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
export interface IProjectCategory extends ProjectCategory {
  products: Project[];
}
export default function Projects({
  projectCategories,
}: {
  projectCategories: IProjectCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState(projectCategories[0]);

  return (
    <div
      className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16"
      id="projects"
    >
      <SectionSubHeading title="Projects" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Explore Portfolio By Technology" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-4">
        <div className="flex gap-4 flex-wrap">
          {projectCategories.map((category, i) => {
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "bg-slate-300 dark:bg-slate-500 py-2 px-6 rounded-full uppercase text-sm",
                  activeCategory.slug === category.slug &&
                    "bg-lime-500 dark:bg-lime-500"
                )}
              >
                {category.title}
              </button>
            );
          })}
          {/* <button className="bg-lime-500 py-2 px-6 rounded-full">Sql</button> */}
        </div>
        <div className="py-4">
          <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeCategory.products.map((project, i) => {
              return (
                <>
                  <div
                    key={i}
                    className="rounded-2xl shadow p-8 dark:border-gray-800 border"
                  >
                    <Link href={project?.hostedLink ?? ""}>
                      <Image
                        src={project?.imageUrl ?? ""}
                        alt={project.title}
                        className="rounded-2xl"
                        width={300}
                        height={300}
                      />
                    </Link>
                    {/* <Link
                      href={project.hostedLink ?? "#"}
                      className="font-bold text-2xl py-2 block hover:text-lime-500 transition-all duration-300"
                    >
                      {project.title}
                    </Link> */}
                    <Dialog>
                      <DialogTrigger>
                        <h2 className="font-bold text-2xl py-2 block hover:text-lime-500 transition-all duration-300 cursor-pointer">
                          {project.title}
                        </h2>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>{project.title}</DialogTitle>
                          <DialogDescription>
                            <div className="py-2">{project.description}</div>
                          </DialogDescription>
                        </DialogHeader>
                        <div
                          key={i}
                          className="rounded-2xl shadow p-4 dark:border-gray-800 border"
                        >
                          <Link href={project?.hostedLink ?? ""}>
                            <Image
                              src={project?.imageUrl ?? ""}
                              alt={project.title}
                              className="rounded-2xl h-28 object-cover w-full"
                              width={300}
                              height={300}
                            />
                          </Link>
                          <Link
                            href={project.hostedLink ?? "#"}
                            className="font-bold text-2xl py-2 block hover:text-lime-500 transition-all duration-300"
                          >
                            {project.title}
                          </Link>
                          <div className="flex items-center justify-between">
                            {project.tags && (
                              <div className="flex flex-wrap space-x-1 gap-2">
                                {project?.tags.split(",").map((item, i) => {
                                  return (
                                    <button
                                      className="bg-slate-300 hover:bg-lime-500 duration-300 py-1.5 px-3 text-xs rounded-full uppercase dark:bg-slate-700 dark:hover:bg-lime-500"
                                      key={i}
                                    >
                                      {item}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                            <div className="">
                              <Link
                                target="_blank"
                                href={project?.hostedLink ?? "#"}
                                className="p-3 dark:bg-slate-800 rounded-full inline-block dark:hover:bg-lime-500 bg-slate-300 hover:bg-lime-500"
                              >
                                <MoveUpRight className="w-4 h-4 " />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <div className="flex items-center justify-between">
                      {project.tags && (
                        <div className="flex flex-wrap space-x-1 gap-2">
                          {project?.tags.split(",").map((item, i) => {
                            return (
                              <button
                                className="bg-slate-300 hover:bg-lime-500 duration-300 py-1.5 px-3 text-xs rounded-full uppercase dark:bg-slate-700 dark:hover:bg-lime-500"
                                key={i}
                              >
                                {item}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      <div className="">
                        <Link
                          target="_blank"
                          href={project?.hostedLink ?? "#"}
                          className="p-3 dark:bg-slate-800 rounded-full inline-block dark:hover:bg-lime-500 bg-slate-300 hover:bg-lime-500"
                        >
                          <MoveUpRight className="w-4 h-4 " />
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
