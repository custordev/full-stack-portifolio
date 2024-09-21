import React from "react";
import SectionSubHeading from "./SectionSubHeading";
import { Dumbbell, Headset, Mail, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Separator } from "./ui/separator";
import ContactForm from "./ContactForm";
import Paragraph from "./Paragraph";
import Link from "next/link";
import { Settings } from "@prisma/client";

export default function Contact({
  siteSettings,
}: {
  siteSettings: Settings | null;
}) {
  const contacts = [
    {
      label: "Email",
      icon: Mail,
      contact: `${siteSettings?.email}`,
      href: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${siteSettings?.email}&su=Your+Subject+Here&body=Your+Body+Text+Here`,
    },
    {
      label: "Phone",
      icon: Headset,
      contact: `${siteSettings?.phone}`,
      href: `tel:${siteSettings?.phone}`,
    },
    {
      label: "Location",
      icon: MapPin,
      contact: `${siteSettings?.location}`,
      href: `https://maps.app.goo.gl/y2biMi3wyrDWDqubA`,
    },
  ];
  return (
    <div
      className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16"
      id="contact"
    >
      <SectionSubHeading title="Contact" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Let's Get in Touch!" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {contacts.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center space-x-2 border p-4 rounded border-slate-300 dark:border-slate-700"
              >
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <Icon className="w-6 h-6" />
                </span>

                <div className="">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    {item.label}
                  </h2>
                  <Link
                    href={item.href}
                    className=" text-blue-500 dark:text-blue-400"
                  >
                    {item.contact}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="py-4">
          <Separator />
        </div>
        <div className="py-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
