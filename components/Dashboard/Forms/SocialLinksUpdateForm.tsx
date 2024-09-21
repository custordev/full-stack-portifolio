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

export default function SocialLinksUpdateForm({
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
      linkedin: settings?.linkedin,
      instagram: settings?.instagram,
      twitter: settings?.twitter,
      github: settings?.github,
      youTube: settings?.youTube,
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  async function saveContact(data: SettingProps) {
    setLoading(true);
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
            <CardTitle>Update Website Social Links</CardTitle>
            <CardDescription>
              These are the Social Media Links Used on different section of the
              site
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
                  label="Linkedin"
                  name="linkedin"
                  icon={Linkedin}
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Twitter"
                  name="twitter"
                  icon={Twitter}
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Instagram"
                  name="instagram"
                  icon={Instagram}
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="YouTube"
                  name="youTube"
                  icon={Youtube}
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
