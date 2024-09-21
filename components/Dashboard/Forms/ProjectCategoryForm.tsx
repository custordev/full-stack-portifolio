"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContactProps } from "@/types/types";
import { createMessage } from "@/actions/messages";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { Plus } from "lucide-react";
import { createProjectCategory } from "@/actions/projects";
import toast from "react-hot-toast";
import { generateSlug } from "@/lib/generateSlug";
export type ProjectCategoryProps = {
  title: string;
  slug: string;
};
export default function ProjectCategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectCategoryProps>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  async function saveContact(data: ProjectCategoryProps) {
    setLoading(true);
    data.slug = generateSlug(data.title);
    try {
      await createProjectCategory(data);
      setLoading(false);
      reset();
      setSuccess(true);
      toast.success("Category Created Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" size={"sm"}>
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Add</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Project Category</SheetTitle>
        </SheetHeader>
        <div className="w-full max-w-3xl mx-auto p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8  dark:border-gray-700">
          <form className="" onSubmit={handleSubmit(saveContact)}>
            <div className="grid grid-cols-12 gap-6">
              <div className=" col-span-full space-y-3">
                <div className="grid gap-6">
                  <div className="grid gap-3 ">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Project Category Title"
                      name="title"
                    />
                  </div>
                </div>
              </div>
            </div>

            <SheetFooter>
              <div className="py-4">
                <SubmitButton title="Add Category" loading={loading} />
              </div>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
