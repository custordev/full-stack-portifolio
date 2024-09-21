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

import { Message, Project, Service } from "@prisma/client";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "imageUrl",
    header: "Service Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },

  {
    accessorKey: "description",
    header: "View Service",
    cell: ({ row }) => {
      const service = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Service: {service.title} </DialogTitle>
              <DialogDescription>
                <div className="py-4">{service.description}</div>
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
      const service = row.original;
      return (
        <ActionColumn
          row={row}
          model="service"
          editEndpoint={`services/update/${service.id}`}
          id={service.id}
        />
      );
    },
  },
];
