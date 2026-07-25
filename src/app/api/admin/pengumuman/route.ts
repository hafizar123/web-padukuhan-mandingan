import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { judul, konten, published } = await req.json();
  if (!judul || !konten) return NextResponse.json({ message: "Judul dan konten wajib diisi" }, { status: 400 });

  const data = await prisma.pengumuman.create({ data: { judul, konten, published: published ?? true } });
  return NextResponse.json(data, { status: 201 });
}
