import { getProjectCategories } from "@/actions/projects";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import React from "react";

export default async function page() {
  const categories = (await getProjectCategories()) || [];
  const projectCategories = categories.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  return (
    <div>
      <ProjectForm projectCategories={projectCategories} />
    </div>
  );
}
