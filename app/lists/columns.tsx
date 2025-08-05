"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { title } from "process";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type Todo = {
  id: Number;
  title: string;
  description?: string | null;
};

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Document",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      const router = useRouter();
      const [dialogOpen, setDialogOpen] = useState(false);
      const [popoverOpen, setPopoverOpen] = useState(false);
      const [title, setTitle] = useState(payment.title);
      const [description, setDescription] = useState(payment.description ?? "");
      const [isVisible, setIsVisible] = useState(true);

      return (
        <div className="flex gap-2">
          {/* View Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setDialogOpen(true)}
                size="icon"
              >
                {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Update Popover */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-green-600"
                onClick={() => setPopoverOpen(true)}
              >
                Update
              </Button>
            </PopoverTrigger>
            {popoverOpen && (
              <PopoverContent className="w-80">
                <div className="grid gap-4 bg-gray-300 p-4 rounded-2xl shadow-2xl">
                  <Label htmlFor="title">{title}</Label>
                  <div className="grid gap-2">
                    <div className="grid w-full gap-3">
                      <Label htmlFor="message">Your message</Label>
                      <Textarea
                        value={description}
                        id="message"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600"
                    onClick={async () => {
                      await fetch(`/api/todo/${payment.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title, description }),
                      });
                      setPopoverOpen(false);
                      router.refresh();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </PopoverContent>
            )}
          </Popover>

          {/* Delete Button */}
          <Button
            variant="destructive"
            onClick={async () => {
              await fetch(`/api/todo/${payment.id}`, { method: "DELETE" });
              router.refresh();
            }}
          >
            DELETE
          </Button>
        </div>
      );
    },
  },
];
