import { NextResponse } from "next/server";

// Struktur organisasi bersifat tetap, tidak bisa ditambah via API
export async function POST() {
  return NextResponse.json({ message: "Tidak diizinkan" }, { status: 403 });
}
