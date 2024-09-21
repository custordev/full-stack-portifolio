import { getProjectById, getProjectCategories } from "@/actions/projects";
import { getServiceById } from "@/actions/services";
import { getSkillById } from "@/actions/skills";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import ServiceForm from "@/components/Dashboard/Forms/ServiceForm";
import SkillForm from "@/components/Dashboard/Forms/SkillForm";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const skill = await getSkillById(id);

  return (
    <div>
      <SkillForm initialData={skill} editingId={id} />
    </div>
  );
}
