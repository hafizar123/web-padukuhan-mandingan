import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { nama, jabatan, rt, noHp, email, urutan } = await req.json();

  const data = await prisma.kontak.update({ where: { id }, data: { nama, jabatan, rt, noHp, email, urutan } });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.kontak.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
