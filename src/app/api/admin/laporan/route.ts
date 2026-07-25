import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { barrierId, volume, catatan, foto } = await req.json();

  if (!barrierId || !volume) {
    return NextResponse.json({ message: "barrierId dan volume wajib diisi" }, { status: 400 });
  }

  // Verifikasi barrier ada
  const barrier = await prisma.trashBarrier.findUnique({ where: { id: barrierId } });
  if (!barrier) {
    return NextResponse.json({ message: "Barrier tidak ditemukan" }, { status: 404 });
  }

  const report = await prisma.trashReport.create({
    data: {
      barrierId,
      adminId: session.user.id,
      volume,
      catatan: catatan || null,
      foto: foto || null,
    },
  });

  return NextResponse.json(report, { status: 201 });
}
