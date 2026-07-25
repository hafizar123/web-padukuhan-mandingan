import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { nama, jabatan, rt, noHp, email, urutan } = await req.json();
  if (!nama || !jabatan) return NextResponse.json({ message: "Nama dan jabatan wajib diisi" }, { status: 400 });

  const data = await prisma.kontak.create({ data: { nama, jabatan, rt: rt ?? null, noHp, email, urutan: urutan ?? 0 } });
  return NextResponse.json(data, { status: 201 });
}
