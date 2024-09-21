import {
  getBlogBySlug,
  getBlogCategories,
  getBlogsByCategories,
  getRelatedBlogs,
} from "@/actions/blogs";
import { getSettings } from "@/actions/settings";
import BlogDetail from "@/components/BlogDetail";
import { notFound } from "next/navigation";
import React from "react";

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(slug);
  const siteSettings = await getSettings();
  const categories = (await getBlogsByCategories()) || [];
  if (!blog) {
    return notFound();
  }
  const relatedBlogs = await getRelatedBlogs(blog?.id);
  return (
    <BlogDetail
      categories={categories as any}
      relatedBlogs={relatedBlogs}
      blog={blog}
      settings={siteSettings}
    />
  );
}
