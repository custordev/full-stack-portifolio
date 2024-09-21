import React from "react";
import { columns } from "./columns";
import { getMessages } from "@/actions/messages";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getProjects } from "@/actions/projects";
import { getServices } from "@/actions/services";

export default async function page() {
  const services = (await getServices()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Services"
        linkTitle="Add Service"
        href="/dashboard/services/new"
        data={services}
        model="service"
      />
      <div className="py-8">
        <DataTable data={services} columns={columns} />
      </div>
    </div>
  );
}
