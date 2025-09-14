import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    await prisma.todo.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Failed to update todo:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
