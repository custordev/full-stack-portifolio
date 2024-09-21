import { getExperienceById } from "@/actions/experience";
import { getProjectById, getProjectCategories } from "@/actions/projects";
import { getServiceById } from "@/actions/services";
import ExperienceForm from "@/components/Dashboard/Forms/ExperienceForm";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import ServiceForm from "@/components/Dashboard/Forms/ServiceForm";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const experience = await getExperienceById(id);

  return (
    <div>
      <ExperienceForm initialData={experience} editingId={id} />
    </div>
  );
}
