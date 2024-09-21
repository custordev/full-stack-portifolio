"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import Select from "react-tailwindcss-select";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";

import toast from "react-hot-toast";

import {
  Options,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import {
  ExperienceProps,
  ProjectProps,
  ServiceProps,
  SkillProps,
} from "@/types/types";
import { Experience, Project, Service, Skill } from "@prisma/client";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextArea";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormFooter from "@/components/FormInputs/FormFooter";
import FormHeader from "@/components/FormInputs/FormHeader";

import { Plus } from "lucide-react";
import ProjectCategoryForm from "./ProjectCategoryForm";
import { createProject, updateProjectById } from "@/actions/projects";
import { createSkill, updateSkillById } from "@/actions/skills";
import { createService, updateServiceById } from "@/actions/services";
import { createExperience, updateExperienceById } from "@/actions/experience";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SkillFormProps = {
  editingId?: string | undefined;
  initialData?: Experience | undefined | null;
};
export default function ExperienceForm({
  editingId,
  initialData,
}: SkillFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceProps>({
    defaultValues: {
      title: initialData?.title,
      description: initialData?.description || "",
      period: initialData?.period ?? "",
      company: initialData?.company ?? "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveCategory(data: ExperienceProps) {
    try {
      setLoading(true);
      if (editingId) {
        await updateExperienceById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/resume");
      } else {
        await createExperience(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        router.push("/dashboard/resume");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        href="/resume"
        parent=""
        title="Experience"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3 pt-4">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Job Title"
                    name="title"
                  />
                </div>
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Company"
                    name="company"
                  />
                </div>
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Period Range"
                    name="period"
                  />
                </div>
                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Description"
                    name="description"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FormFooter
        href="/resume"
        editingId={editingId}
        loading={loading}
        title="Experience"
        parent=""
      />
    </form>
  );
}
