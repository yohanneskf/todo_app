"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// The corrected type for our data, using 'number' instead of 'Number'.
export type Todo = {
  id: number;
  title: string;
  description?: string | null;
};

// A new component to handle the actions for each row.
// This is a React component, so it can use hooks.
import { Row } from "@tanstack/react-table";

const TodoActionsCell = ({ row }: { row: Row<Todo> }) => {
  const payment = row.original;
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [description, setDescription] = useState(payment.description ?? "");

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
            {/* The icon can be dynamically changed based on a state if needed */}
            <Eye size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{payment.title}</DialogTitle>
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
              <Label htmlFor="title">{payment.title}</Label>
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
                    body: JSON.stringify({ title: payment.title, description }),
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
};

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Document",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TodoActionsCell row={row} />,
  },
];
