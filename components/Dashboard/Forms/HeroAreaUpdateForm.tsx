"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createMessage } from "@/actions/messages";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {
  CheckCheck,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";
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
import TextArea from "@/components/FormInputs/TextArea";

export default function HeroAreaUpdateForm({
  settings,
}: {
  settings: Settings | null;
}) {
  console.log(settings);
  // firstName,LastName,email,message
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingProps>({
    defaultValues: {
      profileLineOne: settings?.profileLineOne,
      profileLineTwo: settings?.profileLineTwo,
      profileLineThree: settings?.profileLineThree,
      profileName: settings?.profileName,
      profileDescription: settings?.profileDescription,
      animatedText: settings?.animatedText,
      yearsOfExperience: settings?.yearsOfExperience,
      clients: settings?.clients,
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  async function saveContact(data: SettingProps) {
    setLoading(true);
    data.yearsOfExperience = Number(data.yearsOfExperience);
    data.clients = Number(data.clients);
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
            <CardTitle>Update Website Hero Section</CardTitle>
            <CardDescription>
              This is the content for the Welcome section of the Site
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-12 gap-6 pt-3 pb-8">
          <div className=" col-span-full space-y-3">
            <div className="grid gap-6">
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Profile Name"
                  name="profileName"
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Profile Line One"
                  name="profileLineOne"
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Profile Line Two"
                  name="profileLineTwo"
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Profile Line Three"
                  name="profileLineThree"
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Hero Animated Text (Words should be separated by Comma)"
                  name="animatedText"
                />
              </div>
              <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Total Number of Clients"
                  name="clients"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Years of Experience"
                  name="yearsOfExperience"
                />
              </div>
              <div className="grid gap-3">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Hero profile Description"
                  name="profileDescription"
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
