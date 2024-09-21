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
import { ProjectProps, SkillProps } from "@/types/types";
import { Project, Skill } from "@prisma/client";
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

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SkillFormProps = {
  editingId?: string | undefined;
  initialData?: Skill | undefined | null;
};
export default function SkillForm({ editingId, initialData }: SkillFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillProps>({
    defaultValues: {
      title: initialData?.title,
      percent: initialData?.percent || 0,
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.icon || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveCategory(data: SkillProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.title);
      data.icon = imageUrl;
      data.percent = Number(data.percent);
      if (editingId) {
        await updateSkillById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/skills");
        setImageUrl("/placeholder.svg");
      } else {
        await createSkill(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        setImageUrl("/placeholder.svg");
        router.push("/dashboard/skills");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        href="/skills"
        parent=""
        title="Skill"
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
                    label="Skill Title"
                    name="title"
                  />
                </div>
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Skill Percent"
                    name="percent"
                    type="number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Skill Logo"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="skillLogo"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/skills"
        editingId={editingId}
        loading={loading}
        title="Skill"
        parent=""
      />
    </form>
  );
}
