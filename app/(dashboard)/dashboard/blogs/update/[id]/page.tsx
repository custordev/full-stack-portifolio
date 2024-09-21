import { getBlogById, getBlogCategories } from "@/actions/blogs";
import { getProjectById, getProjectCategories } from "@/actions/projects";
import BlogForm from "@/components/Dashboard/Forms/BlogForm";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const blog = await getBlogById(id);
  const categories = (await getBlogCategories()) || [];
  const blogCategories = categories.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  return (
    <div>
      <BlogForm
        initialData={blog}
        editingId={id}
        blogCategories={blogCategories}
      />
    </div>
  );
}
