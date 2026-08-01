import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { nama, kategori, lokasi, pimpinan, deskripsi, foto, urutan } = await req.json();
    if (!nama || !kategori || !deskripsi) return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });

    const data = await prisma.potensi.create({
      data: { nama, kategori, lokasi: lokasi || null, pimpinan: pimpinan || null, deskripsi, foto: foto ?? [], urutan: urutan ?? 0 },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
