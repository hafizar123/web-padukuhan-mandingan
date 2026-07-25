import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { judul, deskripsi, tanggal, lokasi } = await req.json();
    if (!judul || !tanggal) return NextResponse.json({ message: "Judul dan tanggal wajib diisi" }, { status: 400 });

    const data = await prisma.agenda.create({
      data: { judul, deskripsi: deskripsi || null, tanggal: new Date(tanggal), lokasi: lokasi || null },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating agenda:", error);
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
