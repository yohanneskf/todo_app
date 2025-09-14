import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  await prisma.todo.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const { title, description } = await req.json();
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, description },
  });
  return NextResponse.json(todo);
}
