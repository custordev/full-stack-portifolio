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
export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <SortableColumn column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "message",
    header: "View Message",
    cell: ({ row }) => {
      const message = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Message</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message from {message.firstName} </DialogTitle>
              <DialogDescription>
                <div className="py-4">{message.message}</div>
                <div className="border-t py-3">
                  <Link
                    className="flex items-center space-x-2"
                    target="_blank"
                    href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${message.email}&su=Your+Subject+Here&body=Your+Body+Text+Here`}
                  >
                    <Mail className="text-blue-500" />
                    <p>
                      {" "}
                      <span className="font-semibold">Reply</span> to{" "}
                      <span className="text-blue-500">{message.email}</span>
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
