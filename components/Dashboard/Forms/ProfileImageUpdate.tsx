"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createMessage } from "@/actions/messages";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { CheckCheck, Headphones, Mail, MapPin } from "lucide-react";
import { Settings } from "@prisma/client";
import { updateSettings } from "@/actions/settings";
import { SettingProps } from "@/types/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import ImageInput from "@/components/FormInputs/ImageInput";
import FileInput from "@/components/FormInputs/FileInput";

export type ContactSettingsProps = {
  email: string;
  phone: string;
  location: string;
};
export default function ProfileImageUpdate({
  settings,
}: {
  settings: Settings | null;
}) {
  const initialImage = settings?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const initialCvUrl = settings?.cvUrl || "/placeholder.svg";
  const [fileUrl, setFileUrl] = useState(initialCvUrl);
  // firstName,LastName,email,message
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingProps>({
    defaultValues: {
      email: settings?.email,
      phone: settings?.phone,
      location: settings?.location,
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  async function saveContact(data: SettingProps) {
    setLoading(true);
    data.cvUrl = fileUrl;
    data.imageUrl = imageUrl;
    try {
      await updateSettings(settings?.id ?? "", data);
      setLoading(false);
      reset();
      toast.success("Settings Updated Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="w-full max-w-3xl  p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8  dark:border-gray-700">
      <form className="" onSubmit={handleSubmit(saveContact)}>
        <Card>
          <CardHeader>
            <CardTitle>Update Website Profile Image</CardTitle>
            <CardDescription>
              Here you can Update Profile Image and Upload your CV
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-12 gap-6 pt-3 pb-8">
          <div className=" col-span-full space-y-3">
            <div className="grid gap-6">
              <div className="grid gap-3 ">
                <ImageInput
                  title="Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="profileImage"
                />
              </div>
              <div className="grid gap-3 ">
                <FileInput
                  title="Upload your Cv"
                  fileUrl={fileUrl}
                  setFileUrl={setFileUrl}
                  endpoint="cvUpload"
                />
              </div>
            </div>
          </div>
        </div>
        <SubmitButton
          buttonIcon={CheckCheck}
          title="Update Settings"
          loading={loading}
        />
      </form>
    </div>
  );
}
