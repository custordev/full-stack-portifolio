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
import { ProjectProps } from "@/types/types";
import { Project } from "@prisma/client";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextArea";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormFooter from "@/components/FormInputs/FormFooter";
import FormHeader from "@/components/FormInputs/FormHeader";

import { Plus } from "lucide-react";
import ProjectCategoryForm from "./ProjectCategoryForm";
import { createProject, updateProjectById } from "@/actions/projects";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type ProjectFormProps = {
  editingId?: string | undefined;
  initialData?: Project | undefined | null;
  projectCategories: SelectOptionProps[];
};
export default function ProjectForm({
  editingId,
  initialData,
  projectCategories,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectProps>({
    defaultValues: {
      title: initialData?.title,
      description: initialData?.description || "",
      github: initialData?.github ?? "",
      hostedLink: initialData?.hostedLink ?? "",
      tags: initialData?.tags ?? "",
    },
  });
  const router = useRouter();
  const initialProjectCategoryId = initialData?.categoryId;
  const initialCategory = projectCategories.find(
    (item) => item.value === initialProjectCategoryId
  );
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<any>(initialCategory);
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveCategory(data: ProjectProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.title);
      data.imageUrl = imageUrl;
      data.categoryId = selectedMainCategory.value;
      if (editingId) {
        await updateProjectById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/projects");
        setImageUrl("/placeholder.svg");
      } else {
        await createProject(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        setImageUrl("/placeholder.svg");
        router.push("/dashboard/projects");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        href="/projects"
        parent=""
        title="Project"
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
                    label="Project Title"
                    name="title"
                  />
                </div>
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Project Tags(eg mongodb,prisma,typescript)"
                    name="tags"
                  />
                </div>
                <div className="grid gap-3 gap grid-cols-1 lg:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Project github Link"
                    name="github"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Project Hosted Link"
                    name="hostedLink"
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
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                <div className="flex space-x-2 items-end">
                  <FormSelectInput
                    label="Project Categories"
                    options={projectCategories}
                    option={selectedMainCategory}
                    setOption={setSelectedMainCategory}
                  />
                  <div className="">
                    <ProjectCategoryForm />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Project Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="projectImage"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/projects"
        editingId={editingId}
        loading={loading}
        title="Project"
        parent=""
      />
    </form>
  );
}
