import { columns, Todo } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/prisma/client";

async function getData(): Promise<Todo[]> {
  // Fetch data from your API here.

  return await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
