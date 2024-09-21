import React from "react";
import { columns } from "./columns";
import { getMessages } from "@/actions/messages";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getProjects } from "@/actions/projects";
import { getBlogs } from "@/actions/blogs";

export default async function page() {
  const blogs = (await getBlogs()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Blogs"
        linkTitle="Add Blog"
        href="/dashboard/blogs/new"
        data={blogs}
        model="blog"
      />
      <div className="py-8">
        <DataTable data={blogs} columns={columns} />
      </div>
    </div>
  );
}
