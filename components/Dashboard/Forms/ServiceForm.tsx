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
import { ProjectProps, ServiceProps, SkillProps } from "@/types/types";
import { Project, Service, Skill } from "@prisma/client";
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

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SkillFormProps = {
  editingId?: string | undefined;
  initialData?: Service | undefined | null;
};
export default function ServiceForm({
  editingId,
  initialData,
}: SkillFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceProps>({
    defaultValues: {
      title: initialData?.title,
      description: initialData?.description || "",
      slogan: initialData?.slogan ?? "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveCategory(data: ServiceProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.title);
      data.imageUrl = imageUrl;
      if (editingId) {
        await updateServiceById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/services");
        setImageUrl("/placeholder.svg");
      } else {
        await createService(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        setImageUrl("/placeholder.svg");
        router.push("/dashboard/services");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        href="/services"
        parent=""
        title="Service"
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
                    label="Service Title"
                    name="title"
                  />
                </div>
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Slogan"
                    name="slogan"
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
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Service Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="serviceImage"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/services"
        editingId={editingId}
        loading={loading}
        title="Service"
        parent=""
      />
    </form>
  );
}
