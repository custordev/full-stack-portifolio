import React from "react";
import { columns } from "./columns";
import { getMessages } from "@/actions/messages";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";

export default async function page() {
  const messages = (await getMessages()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Messages"
        linkTitle="Add Contact"
        href="/dashboard/categories/new"
        data={messages}
        model="contact"
      />
      <div className="py-8">
        <DataTable data={messages} columns={columns} />
      </div>
    </div>
  );
}
