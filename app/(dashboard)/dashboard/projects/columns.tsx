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

import { Message, Project } from "@prisma/client";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "imageUrl",
    header: "Project Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },

  {
    accessorKey: "description",
    header: "View Project",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Project: {project.title} </DialogTitle>
              <DialogDescription>
                <div className="py-4">{project.description}</div>
                <div className="border-t py-3">
                  <Link
                    className="flex items-center space-x-2"
                    target="_blank"
                    href={`${project.hostedLink}`}
                  >
                    <ExternalLink className="text-blue-500" />
                    <p>
                      {" "}
                      <span className="font-semibold">Visit</span> to{" "}
                      <span className="text-blue-500">
                        {project.hostedLink}
                      </span>
                    </p>
                  </Link>
                </div>
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
      const project = row.original;
      return (
        <ActionColumn
          row={row}
          model="project"
          editEndpoint={`projects/update/${project.id}`}
          id={project.id}
        />
      );
    },
  },
];
