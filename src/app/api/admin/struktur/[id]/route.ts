import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Hanya update nama yang diizinkan
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { jabatan, nama } = await req.json();

  if (!nama) return NextResponse.json({ message: "Nama wajib diisi" }, { status: 400 });

  const data = await prisma.strukturOrganisasi.update({
    where: { id },
    data: { jabatan, nama },
  });
  return NextResponse.json(data);
}

// Tidak diizinkan hapus
export async function DELETE() {
  return NextResponse.json({ message: "Tidak diizinkan" }, { status: 403 });
}
