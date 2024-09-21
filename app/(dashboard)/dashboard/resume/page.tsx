import React from "react";
import { columns } from "./columns";
import { getMessages } from "@/actions/messages";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getProjects } from "@/actions/projects";
import { getServices } from "@/actions/services";
import { getExperiences } from "@/actions/experience";

export default async function page() {
  const experiences = (await getExperiences()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Experience"
        linkTitle="Add Experience"
        href="/dashboard/resume/new"
        data={experiences}
        model="Experience"
      />
      <div className="py-8">
        <DataTable data={experiences} columns={columns} />
      </div>
    </div>
  );
}
