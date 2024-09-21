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

import { Message } from "@prisma/client";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";
import { ReviewCardProps } from "@/actions/reviews";
import { timeAgo } from "@/lib/timeAgo";
export const columns: ColumnDef<ReviewCardProps>[] = [
  {
    accessorKey: "reviewerName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Reviewer Name" />
    ),
  },
  {
    accessorKey: "reviewerTitle",
    header: ({ column }) => (
      <SortableColumn column={column} title="Reviewer Title" />
    ),
  },
  {
    accessorKey: "comment",
    header: "View Comment",
    cell: ({ row }) => {
      const message = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Comment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message from {message.reviewerName} </DialogTitle>
              <DialogDescription>
                <div className="py-4">{message.comment}</div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "createAt",
    header: "Created Date",
    cell: ({ row }) => {
      const message = row.original;
      return <p>{timeAgo(message.createdAt)}</p>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionColumn
          row={row}
          model="category"
          editEndpoint={`categories/update/${category.id}`}
          id={category.id}
        />
      );
    },
  },
];
