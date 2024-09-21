import { Blog, BlogCategory, Settings } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { getBlogDate } from "@/lib/getBlogDate";
import Link from "next/link";
import parse from "html-react-parser";
import { Calendar } from "lucide-react";
import ShareBlog from "./ShareBlog";
interface IBlog extends Blog {
  category: BlogCategory;
}
interface IBlogCategory extends Blog {
  blogs: Blog[];
}
export default function BlogDetail({
  blog,
  relatedBlogs,
  categories,
  settings,
}: {
  blog: IBlog;
  relatedBlogs: Blog[];
  categories: IBlogCategory[];
  settings: Settings | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const blogUrl = `${baseUrl}/blogs/${blog.slug}`;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:container">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-8 p-6 col-span-full ">
            <Button>{blog.category.title}</Button>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-3">
              {blog.title}
            </h1>
            <div className=" flex items-center space-x-7 py-4 mt-3 border-t ">
              <Link href="/#about" className="flex items-center space-x-2">
                <Image
                  src={settings?.imageUrl ?? "/[laceholder.svg"}
                  alt={settings?.profileName ?? ""}
                  width={400}
                  height={400}
                  className="w-10 h-10 rounded-full"
                />
                <p>{settings?.profileName}</p>
              </Link>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <p>{getBlogDate(blog.createdAt)}</p>
              </div>
              <ShareBlog productUrl={blogUrl} />
            </div>
            <div className="py-3">
              <Image
                src={blog.imageUrl ?? ""}
                alt={blog.title}
                width={1280}
                height={720}
                className="w-full rounded-lg"
              />
            </div>
            <div className="py-6 prose lg:prose-xl">
              {parse(blog.content ?? "")}
            </div>
          </div>
          <div className="lg:col-span-4 col-span-full  p-6">
            {/* Social Links */}
            {/* Categories Links */}
            {/* Related Blogs */}
            <div className="pb-8">
              {relatedBlogs && relatedBlogs.length > 0 && (
                <div className="">
                  <h2 className="font-semibold border-b pb-2 mb-3">
                    Related Blogs
                  </h2>
                  {relatedBlogs.map((blog, i) => {
                    return (
                      <Link
                        key={i}
                        href={`/blogs/${blog.slug}`}
                        className="flex space-x-2"
                      >
                        <Image
                          src={blog.imageUrl ?? ""}
                          alt={blog.title}
                          width={1280}
                          height={720}
                          className="rounded-2xl w-20 h-20"
                        />
                        <div className="">
                          <h2>{blog.title}</h2>
                          <p className="text-sm text-muted-foreground">
                            {getBlogDate(blog.createdAt)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            {categories && categories.length > 0 && (
              <div className="">
                <h2 className="font-semibold border-b pb-2 mb-3">Categories</h2>
                <div className="inline-flex flex-col gap-3 pb-3">
                  {categories.map((cat, i) => {
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
