import { getProjectCategories } from "@/actions/projects";
import ProjectForm from "@/components/Dashboard/Forms/ProjectForm";
import ServiceForm from "@/components/Dashboard/Forms/ServiceForm";
import React from "react";

export default async function page() {
  return (
    <div>
      <ServiceForm />
    </div>
  );
}
