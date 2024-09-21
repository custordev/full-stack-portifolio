import { getProjectById, getProjectCategories } from "@/actions/projects";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProjectById(id);
  const categories = (await getProjectCategories()) || [];
  const projectCategories = categories.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  return (
    <div>
      <ProjectForm
        initialData={project}
        editingId={id}
        projectCategories={projectCategories}
      />
    </div>
  );
}
