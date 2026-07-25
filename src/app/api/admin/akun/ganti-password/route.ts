import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { passwordLama, passwordBaru } = await req.json();

  if (!passwordLama || !passwordBaru) {
    return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
  }

  if (passwordBaru.length < 6) {
    return NextResponse.json({ message: "Password baru minimal 6 karakter" }, { status: 400 });
  }

  // Ambil data admin dari DB
  const admin = await prisma.admin.findUnique({
    where: { id: session.user.id },
  });

  if (!admin) {
    return NextResponse.json({ message: "Akun tidak ditemukan" }, { status: 404 });
  }

  // Verifikasi password lama
  const isValid = await bcrypt.compare(passwordLama, admin.password);
  if (!isValid) {
    return NextResponse.json({ message: "Password lama salah" }, { status: 400 });
  }

  // Hash password baru
  const hashedPassword = await bcrypt.hash(passwordBaru, 10);

  // Update password
  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ success: true });
}
