import { getBlogCategoryBySlug, getOtherCategories } from "@/actions/blogs";
import { Button } from "@/components/ui/button";
import { getBlogDate } from "@/lib/getBlogDate";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const category = await getBlogCategoryBySlug(slug);
  if (!category) {
    return notFound();
  }
  const otherCategories = await getOtherCategories(category.id);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:container">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-8 p-6 col-span-full ">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-3">
              {category.title}
            </h1>
            <div className="py-6">
              <div className="py-4">
                <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.blogs.map((blog, i) => {
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
          <div className="lg:col-span-4 col-span-full  p-6">
            {/* Social Links */}
            {/* Categories Links */}
            {/* Related Blogs */}
            {otherCategories && otherCategories.length > 0 && (
              <div className="">
                <h2 className="font-semibold border-b pb-2 mb-3">Categories</h2>
                <div className="inline-flex flex-col gap-3 pb-3">
                  {otherCategories.map((cat, i) => {
                    return (
                      <Button className="" key={i} variant={"outline"} asChild>
                        <Link
                          href={`/blogs/category/${cat.slug}`}
                          className="flex space-x-2"
                        >
                          <p>
                            {cat.title}(
                            {cat.blogs.length.toString().padStart(2, "0")}){" "}
                          </p>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
