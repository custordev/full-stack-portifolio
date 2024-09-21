import { LucideProps } from "lucide-react";
import React from "react";

export default function SectionSubHeading({
  title,
  icon,
}: {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) {
  const Icon = icon;
  return (
    <div className="inline-flex items-center space-x-2 py-2 px-6 rounded-full border uppercase tracking-widest">
      <Icon className="h-4 w-4 flex-shrink-0" />
      <h2 className="">{title}</h2>
    </div>
  );
}
