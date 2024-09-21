"use client";
import DateColumn from "@/components/DataTableColumns/DateColumn";

import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Experience, Message, Project, Service } from "@prisma/client";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
export const columns: ColumnDef<Experience>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "period",
    header: ({ column }) => <SortableColumn column={column} title="Period" />,
  },
  {
    accessorKey: "company",
    header: ({ column }) => <SortableColumn column={column} title="Company" />,
  },

  {
    accessorKey: "description",
    header: "View Service",
    cell: ({ row }) => {
      const experience = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Experience</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Experience: {experience.title} </DialogTitle>
              <DialogDescription>
                <div className="py-4">{experience.description}</div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const experience = row.original;
      return (
        <ActionColumn
          row={row}
          model="experience"
          editEndpoint={`resume/update/${experience.id}`}
          id={experience.id}
        />
      );
    },
  },
];
