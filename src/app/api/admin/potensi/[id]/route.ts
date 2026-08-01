import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const { nama, kategori, lokasi, pimpinan, deskripsi, foto, urutan } = await req.json();
    const data = await prisma.potensi.update({
      where: { id },
      data: { nama, kategori, lokasi: lokasi || null, pimpinan: pimpinan || null, deskripsi, foto: foto ?? [], urutan: urutan ?? 0 },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.potensi.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
