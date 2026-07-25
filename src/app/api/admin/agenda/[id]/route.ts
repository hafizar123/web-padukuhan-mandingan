import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { judul, deskripsi, tanggal, lokasi } = await req.json();

  const data = await prisma.agenda.update({
    where: { id },
    data: { judul, deskripsi, tanggal: tanggal ? new Date(tanggal) : undefined, lokasi },
  });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.agenda.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
