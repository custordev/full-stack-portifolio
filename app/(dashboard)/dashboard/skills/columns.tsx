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

import { Message, Project, Service, Skill } from "@prisma/client";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
export const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: "icon",
    header: "Skill Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="icon" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "percent",
    header: ({ column }) => <SortableColumn column={column} title="Percent" />,
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const skill = row.original;
      return (
        <ActionColumn
          row={row}
          model="service"
          editEndpoint={`skills/update/${skill.id}`}
          id={skill.id}
        />
      );
    },
  },
];
