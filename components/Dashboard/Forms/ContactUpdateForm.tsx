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

export type ContactSettingsProps = {
  email: string;
  phone: string;
  location: string;
};
export default function ContactUpdateForm({
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
      email: settings?.email,
      phone: settings?.phone,
      location: settings?.location,
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
            <CardTitle>Update Website Contact Section</CardTitle>
            <CardDescription>
              These are the Contact details found on the Contact Form Section
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
                  label="Phone"
                  name="phone"
                  icon={Headphones}
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={Mail}
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Location"
                  name="location"
                  icon={MapPin}
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
