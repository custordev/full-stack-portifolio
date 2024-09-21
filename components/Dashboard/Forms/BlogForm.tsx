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
import { Blog, Project } from "@prisma/client";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextArea";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormFooter from "@/components/FormInputs/FormFooter";
import FormHeader from "@/components/FormInputs/FormHeader";

import { Plus } from "lucide-react";
import ProjectCategoryForm from "./ProjectCategoryForm";
import { createProject, updateProjectById } from "@/actions/projects";
import { BlogProps, createBlog, updateBlogById } from "@/actions/blogs";
import BlogCategoryForm from "./BlogCategoryForm";
import dynamic from "next/dynamic";
import Link from "next/link";
// import QuillEditor from "@/components/FormInputs/QuilEditor";
const QuillEditor = dynamic(
  () => import("@/components/FormInputs/QuilEditor"),
  {
    ssr: false,
  }
);
export type SelectOptionProps = {
  label: string;
  value: string;
};
type BlogFormProps = {
  editingId?: string | undefined;
  initialData?: Blog | undefined | null;
  blogCategories: SelectOptionProps[];
};
export default function BlogForm({
  editingId,
  initialData,
  blogCategories,
}: BlogFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogProps>({
    defaultValues: {
      title: initialData?.title,
      summary: initialData?.summary || "",
      content: initialData?.content ?? "",
      tags: initialData?.tags ?? "",
    },
  });
  const router = useRouter();
  const initialProjectCategoryId = initialData?.categoryId;
  const initialCategory = blogCategories.find(
    (item) => item.value === initialProjectCategoryId
  );
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<any>(initialCategory);
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const initialContent = initialData?.content;
  const [content, setContent] = useState(initialContent);
  const [steps, setSteps] = useState(1);

  function nextStep() {
    if (steps < 3) {
      setSteps((prev) => prev + 1);
    }
  }

  function prevStep() {
    if (steps > 1) {
      setSteps((prev) => prev - 1);
    }
  }
  async function saveCategory(data: BlogProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.title);
      data.imageUrl = imageUrl;
      data.content = content ?? "";
      data.categoryId = selectedMainCategory.value;
      if (editingId) {
        await updateBlogById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/blogs");
        setImageUrl("/placeholder.svg");
      } else {
        await createBlog(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        setImageUrl("/placeholder.svg");
        router.push("/dashboard/blogs");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveCategory)}>
      {steps == 2 ? (
        <FormHeader
          href="/blogs"
          parent=""
          title="Blog"
          editingId={editingId}
          loading={loading}
        />
      ) : (
        <div className="flex items-center justify-between">
          <h2>Create Blog</h2>
          <Button type="button" onClick={nextStep}>
            Next Step
          </Button>
        </div>
      )}

      {steps === 1 && (
        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="lg:col-span-8 col-span-full space-y-3">
            <Card>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3 pt-4">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Blog Title"
                      name="title"
                    />
                  </div>
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Blog Tags(eg mongodb,prisma,typescript)"
                      name="tags"
                    />
                  </div>

                  <div className="grid gap-3">
                    <TextArea
                      register={register}
                      errors={errors}
                      label="Blog Summary"
                      name="summary"
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
                      label="Blog Categories"
                      options={blogCategories}
                      option={selectedMainCategory}
                      setOption={setSelectedMainCategory}
                    />
                    <div className="">
                      <BlogCategoryForm />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-full ">
            <div className="grid auto-rows-max items-start gap-4 ">
              <ImageInput
                title="Blog Banner Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="blogImage"
              />
            </div>
          </div>
        </div>
      )}
      {steps === 2 && (
        <>
          <div className="flex py-3 items-center justify-between">
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              onClick={prevStep}
            >
              Previous Step
            </Button>
          </div>
          <QuillEditor
            label="Write your Blog Content"
            className=""
            value={content}
            onChange={setContent}
          />
        </>
      )}

      {steps == 2 ? (
        <FormFooter
          href="/blogs"
          editingId={editingId}
          loading={loading}
          title="Blog"
          parent=""
        />
      ) : (
        <div className="flex justify-between items-center">
          <Button variant={"outline"} asChild type="button">
            <Link href="/dashboard/blogs">Close</Link>
          </Button>
          <Button type="button" onClick={nextStep}>
            Next Step
          </Button>
        </div>
      )}
    </form>
  );
}
