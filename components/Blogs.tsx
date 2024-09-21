"use client";
import React, { useState } from "react";
import SectionSubHeading from "./SectionSubHeading";
import SectionHeading from "./SectionHeading";
import { Dumbbell, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Paragraph from "./Paragraph";
import { Blog, BlogCategory } from "@prisma/client";
import Image from "next/image";
import { getBlogDate } from "@/lib/getBlogDate";

interface IBlogCategory extends BlogCategory {
  blogs: Blog[];
}
export default function Blogs({
  blogCategories,
}: {
  blogCategories: IBlogCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState(blogCategories[0]);

  return (
    <div
      className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16"
      id="blogs"
    >
      <SectionSubHeading title="Blogs" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Exploring Our Blog" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-4">
        <div className="flex gap-4 flex-wrap">
          {blogCategories.map((category, i) => {
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "bg-slate-200 dark:bg-slate-500 py-2 px-6 rounded-full uppercase text-sm",
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
            {activeCategory.blogs.map((blog, i) => {
              return (
                <Link
                  href={`/blogs/${blog.slug}`}
                  key={i}
                  className="block rounded-2xl shadow p-8 pb-4 dark:border-gray-800 border"
                >
                  <Image
                    src={blog.imageUrl ?? ""}
                    alt={blog.title}
                    className="rounded-2xl"
                    width={1280}
                    height={720}
                  />
                  <span
                    className="py-1.5 inline-block px-4 rounded-full
                  border border-slate-300 dark:border-slate-700 text-xs mt-3"
                  >
                    {getBlogDate(blog.createdAt)}
                  </span>
                  <h2 className="font-bold text-xl lg:text-2xl py-2  hover:text-lime-500 transition-all duration-300">
                    {blog.title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
