import { getProjectById, getProjectCategories } from "@/actions/projects";
import { getServiceById } from "@/actions/services";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import ServiceForm from "@/components/Dashboard/Forms/ServiceForm";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const service = await getServiceById(id);

  return (
    <div>
      <ServiceForm initialData={service} editingId={id} />
    </div>
  );
}
