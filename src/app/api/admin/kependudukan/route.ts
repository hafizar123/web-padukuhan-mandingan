import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { rt, jumlahKK, jumlahPenduduk, lakiLaki, perempuan } = await req.json();

  if (!rt || jumlahKK === undefined || jumlahPenduduk === undefined) {
    return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
  }

  const data = await prisma.dataKependudukan.upsert({
    where: { rt },
    update: { jumlahKK, jumlahPenduduk, lakiLaki, perempuan },
    create: { rt, jumlahKK, jumlahPenduduk, lakiLaki, perempuan },
  });

  return NextResponse.json(data);
}
