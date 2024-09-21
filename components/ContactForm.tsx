"use client";

import { useForm } from "react-hook-form";
import FormFooter from "./FormInputs/FormFooter";
import TextArea from "./FormInputs/TextArea";
import TextInput from "./FormInputs/TextInput";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContactProps } from "@/types/types";
import SubmitButton from "./FormInputs/SubmitButton";
import { createMessage } from "@/actions/messages";

export default function ContactForm() {
  // firstName,LastName,email,message
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactProps>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  async function saveContact(data: ContactProps) {
    setLoading(true);
    try {
      await createMessage(data);
      setLoading(false);
      reset();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8  dark:border-gray-700">
      <form className="" onSubmit={handleSubmit(saveContact)}>
        {success && (
          <div className="bg-green-50 border-l-2 border-green-500 p-3 rounded-md">
            <p>
              <span className="text-green-600 font-semibold">
                Your message has been successfully sent.
              </span>{" "}
              We appreciate you reaching out to us and will get back to you as
              soon as possible.
            </p>
          </div>
        )}
        <div className="grid grid-cols-12 gap-6 py-8">
          <div className=" col-span-full space-y-3">
            <div className="grid gap-6">
              <div className="grid gap-3 lg:grid-cols-2 grid-cols-1">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Fist Name"
                  name="firstName"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Last Name"
                  name="lastName"
                />
              </div>
              <div className="grid gap-3 ">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Email Address"
                  name="email"
                  type="email"
                />
              </div>
              <div className="grid gap-3">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Message"
                  name="message"
                />
              </div>
            </div>
          </div>
        </div>
        <SubmitButton title="Submit Message" loading={loading} />
      </form>
    </div>
  );
}
