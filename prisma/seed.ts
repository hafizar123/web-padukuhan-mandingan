import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // 2 Admin dengan akses penuh
  const admins = [
    { name: "Admin 1", email: "admin1@mandingan.id", role: "ADMIN" as const },
    { name: "Admin 2", email: "admin2@mandingan.id", role: "ADMIN" as const },
  ];

  for (const admin of admins) {
    const hashed = await bcrypt.hash("admin123", 10);
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: { ...admin, password: hashed },
    });
    console.log(`✅ ${admin.name} dibuat`);
  }

  // 5 trash barrier (RT2: 2 titik, RT3: 3 titik)
  const barriers = [
    { nama: "Barrier Parit A", rt: 2, lokasi: "Parit RT 2 Barat" },
    { nama: "Barrier Parit B", rt: 2, lokasi: "Parit RT 2 Timur" },
    { nama: "Barrier Parit C", rt: 3, lokasi: "Parit Perbatasan Wolosono" },
    { nama: "Barrier Parit D", rt: 3, lokasi: "Parit Samping Soto Utara" },
    { nama: "Barrier Parit E", rt: 3, lokasi: "Parit Samping Soto Selatan" },
  ];

  for (const b of barriers) {
    const existing = await prisma.trashBarrier.findFirst({ where: { nama: b.nama } });
    if (!existing) {
      await prisma.trashBarrier.create({ data: b });
      console.log(`✅ Trash barrier ${b.nama} dibuat`);
    }
  }

  // Data kontak perangkat & ketua RT
  const kontakData = [
    { nama: "Marjiyem", jabatan: "Lurah Kebonagung", rt: null, urutan: 1 },
    { nama: "Suradi Wiyono", jabatan: "Dukuh Mandingan", rt: null, urutan: 2 },
    { nama: "Jumawal", jabatan: "Ketua RT 01", rt: 1, urutan: 1 },
    { nama: "Sardi", jabatan: "Ketua RT 02", rt: 2, urutan: 1 },
    { nama: "Saryanta", jabatan: "Ketua RT 03", rt: 3, urutan: 1 },
    { nama: "Purwanta", jabatan: "Ketua RT 04", rt: 4, urutan: 1 },
  ];

  for (const k of kontakData) {
    const existing = await prisma.kontak.findFirst({ where: { nama: k.nama } });
    if (!existing) {
      await prisma.kontak.create({ data: k });
      console.log(`✅ Kontak ${k.nama} dibuat`);
    }
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📧 Admin 1: admin1@mandingan.id");
  console.log("📧 Admin 2: admin2@mandingan.id");
  console.log("🔑 Password default: admin123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
