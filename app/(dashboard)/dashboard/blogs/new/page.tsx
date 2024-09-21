import { getBlogCategories } from "@/actions/blogs";
import { getProjectCategories } from "@/actions/projects";
import BlogForm from "@/components/Dashboard/Forms/BlogForm";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import React from "react";

export default async function page() {
  const categories = (await getBlogCategories()) || [];
  const blogCategories = categories.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  return (
    <div>
      <BlogForm blogCategories={blogCategories} />
    </div>
  );
}
