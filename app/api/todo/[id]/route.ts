import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

// DELETE handler to delete a ToDo item by its ID.
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deletedTodo) {
      return NextResponse.json(
        { error: "ToDo item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete ToDo item." },
      { status: 500 }
    );
  }
}

// PUT handler to update a ToDo item by its ID.
export async function PUT(
  request: Request,
  context: { params: { id: string } } // ✅ use "context" here
) {
  try {
    const { params } = context;
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update ToDo item." },
      { status: 500 }
    );
  }
}
