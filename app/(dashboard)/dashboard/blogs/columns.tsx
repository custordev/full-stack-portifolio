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

import { Blog, BlogCategory, Message, Project } from "@prisma/client";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
interface IBlog extends Blog {
  category: BlogCategory;
}
export const columns: ColumnDef<IBlog>[] = [
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
    accessorKey: "category",
    header: "Blog Category",
    cell: ({ row }) => {
      const blog = row.original;
      return <h2>{blog.category.title}</h2>;
    },
  },

  {
    accessorKey: "description",
    header: "View Project",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Blog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{blog.title} </DialogTitle>
              <DialogDescription>
                <div className="py-4">{blog.summary}</div>
                <div className="border-t py-3">
                  <Link
                    className="flex items-center space-x-2"
                    target="_blank"
                    href={`/blogs/${blog.slug}`}
                  >
                    <ExternalLink className="text-blue-500" />
                    <p>
                      {" "}
                      <span className="font-semibold">View</span> to{" "}
                      <span className="text-blue-500">Blog Details</span>
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
      const blog = row.original;
      return (
        <ActionColumn
          row={row}
          model="blog"
          editEndpoint={`blogs/update/${blog.id}`}
          id={blog.id}
        />
      );
    },
  },
];
