import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();
  const todo = await prisma.todo.create({
    data: { title, description },
  });
  return NextResponse.json(todo);
}
