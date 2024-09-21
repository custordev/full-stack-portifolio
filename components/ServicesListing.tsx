import React from "react";
import SectionSubHeading from "./SectionSubHeading";
import { Dumbbell } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { FaPython } from "react-icons/fa6";
import Link from "next/link";
import Paragraph from "./Paragraph";
import { Service } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function ServicesListing({ services }: { services: Service[] }) {
  return (
    <div
      className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16"
      id="services"
    >
      <SectionSubHeading title="Services" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="What Services I Provide?" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-8 grid lg:grid-cols-2 grid-cols-1 gap-6">
        {services.map((service, i) => {
          return (
            <div
              key={i}
              className="rounded-2xl shadow p-4 lg:p-6 dark:border-gray-800 border"
            >
              <div className="flex  flex-col ">
                <Image
                  src={service.imageUrl ?? ""}
                  alt={service.title}
                  className="w-full h-28 object-cover rounded"
                  width={800}
                  height={800}
                />
                <div className="py-2">
                  <h2 className="text-base lg:text-xl font-semibold">
                    {service.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {service.slogan}
                  </p>
                </div>
              </div>
              <div className="py-2 md:text-sm text-muted-foreground text-xs line-clamp-2">
                <p>{service.description}</p>
              </div>
              <div className="py-2 flex items-center justify-between">
                <Button asChild variant={"outline"}>
                  <Link href={`/contact`} className="">
                    Get Started
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>
                        <h2 className="font-bold text-2xl py-2 block hover:text-lime-500 transition-all duration-300">
                          {service.title}
                        </h2>
                      </DialogTitle>
                      <DialogDescription>
                        <div className="py-2">{service.description}</div>
                      </DialogDescription>
                    </DialogHeader>
                    <div
                      key={i}
                      className="rounded-2xl shadow p-3 dark:border-gray-800 border"
                    >
                      <Image
                        src={service?.imageUrl ?? ""}
                        alt={service.title}
                        className="rounded-2xl object-cover w-full h-28"
                        width={300}
                        height={300}
                      />
                    </div>
                    <DialogFooter className="flex justify-between">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button asChild type="button">
                          <Link href="/book">Book this Service</Link>
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
