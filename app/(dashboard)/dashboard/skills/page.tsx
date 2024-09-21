import React from "react";
import { columns } from "./columns";
import { getMessages } from "@/actions/messages";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getProjects } from "@/actions/projects";
import { getServices } from "@/actions/services";
import { getSkills } from "@/actions/skills";

export default async function page() {
  const skills = (await getSkills()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Skill"
        linkTitle="Add Skill"
        href="/dashboard/skills/new"
        data={skills}
        model="skill"
      />
      <div className="py-8">
        <DataTable data={skills} columns={columns} />
      </div>
    </div>
  );
}
