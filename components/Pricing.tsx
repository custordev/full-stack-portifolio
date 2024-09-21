import React from "react";
import SectionSubHeading from "./SectionSubHeading";
import SectionHeading from "./SectionHeading";
import { Check, Dumbbell, X } from "lucide-react";
import Link from "next/link";
import Paragraph from "./Paragraph";
import { Button } from "./ui/button";

export default function Pricing() {
  const plans = [
    {
      price: 29,
      mode: "hour",
      href: "#",
      features: [
        {
          title: "Feature 1",
          isIncluded: true,
        },
        {
          title: "Feature 2",
          isIncluded: true,
        },
        {
          title: "Feature 3",
          isIncluded: true,
        },
        {
          title: "Feature 4",
          isIncluded: false,
        },
        {
          title: "Feature 5",
          isIncluded: true,
        },
      ],
    },
    {
      price: 119,
      mode: "day",
      href: "#",
      features: [
        {
          title: "Feature 1",
          isIncluded: true,
        },
        {
          title: "Feature 2",
          isIncluded: true,
        },
        {
          title: "Feature 3",
          isIncluded: true,
        },
        {
          title: "Feature 4",
          isIncluded: true,
        },
        {
          title: "Feature 5",
          isIncluded: true,
        },
      ],
    },
  ];
  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 rounded-tr-2xl px-8 py-16">
      <SectionSubHeading title="Pricing" icon={Dumbbell} />
      <div className="py-2">
        <SectionHeading title="Amazing Pricing For Your Projects" />
      </div>
      <Paragraph
        text="I have been a full stack web developer since 2022 and I love building
      Software and Sharing, but it wasn't always like that. I went through a
      four-year Mechanical Engineering Course and it had nothing to do with
      Software development."
      />
      <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan, i) => {
          return (
            <div
              key={i}
              className="rounded-2xl shadow p-8 dark:border-gray-800 border"
            >
              <div className="flex justify-end">
                <div className="rounded-full lg:px-5 px-3 lg:py-3 py-1.5 bg-lime-500 inline-block uppercase text-slate-800 lg:text-sm text-xs cursor-pointer">
                  per {plan.mode}
                </div>
              </div>
              <div className="flex justify-start">
                <div className=" font-bold text-3xl lg:text-5xl inline-block uppercase text-lime-500 py-3">
                  $ {plan.price}
                </div>
              </div>
              <div className="py-6">
                <Button asChild>
                  <Link className="w-full" href="#">
                    Order Now
                  </Link>
                </Button>
              </div>
              <div className="py-3  space-y-2 lg:space-y-4">
                {plan.features.map((feature, i) => {
                  return (
                    <div
                      className="flex items-center lg:text-sm text-xs "
                      key={i}
                    >
                      {feature.isIncluded ? (
                        <Check className="w-4 h-4 mr-2 flex-shrink-0 text-lime-500" />
                      ) : (
                        <X className="w-4 h-4 mr-2 flex-shrink-0 text-pink-500" />
                      )}
                      {feature.isIncluded ? (
                        <span>{feature.title}</span>
                      ) : (
                        <span className="line-through">{feature.title}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
