import React from "react";
import { columns } from "./columns";
import { getMessages } from "@/actions/messages";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getProjects } from "@/actions/projects";

export default async function page() {
  const projects = (await getProjects()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Projects"
        linkTitle="Add Project"
        href="/dashboard/projects/new"
        data={projects}
        model="project"
      />
      <div className="py-8">
        <DataTable data={projects} columns={columns} />
      </div>
    </div>
  );
}
