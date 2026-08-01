import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Struktur Organisasi - Admin Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

// Data fallback kalau DB belum terisi
const strukturFallback = [
  { id: "1", jabatan: "Lurah", nama: "Marjiyem", urutan: 1 },
  { id: "2", jabatan: "Dukuh", nama: "Suradi Wiyono", urutan: 2 },
  { id: "3", jabatan: "Ketua RT 01", nama: "Jumawal", urutan: 3 },
  { id: "4", jabatan: "Ketua RT 02", nama: "Sardi", urutan: 4 },
  { id: "5", jabatan: "Ketua RT 03", nama: "Saryanta", urutan: 5 },
  { id: "6", jabatan: "Ketua RT 04", nama: "Purwanta", urutan: 6 },
];

export default async function AdminStrukturPage() {
  let struktur: { id: string; jabatan: string; nama: string; urutan: number }[] = [];
  try {
    const data = await prisma.strukturOrganisasi.findMany({ orderBy: { urutan: "asc" } });
    struktur = data.length > 0 ? data : strukturFallback;
  } catch {
    struktur = strukturFallback;
  }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Struktur Organisasi</h1>
        <p className="text-sm text-gray-500 mt-1">Edit nama pejabat padukuhan</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-xl">
        {struktur.map((s, i) => (
          <div
            key={s.id}
            className={`flex items-center justify-between px-5 py-4 ${
              i !== struktur.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">{s.jabatan}</p>
              <p className="text-base font-semibold text-gray-800 mt-0.5">{s.nama}</p>
            </div>
            <Link href={`/admin/struktur/${s.id}`}>
              <Button size="sm" variant="ghost" className="text-gray-500 hover:text-green-700 hover:bg-green-50">
                <Pencil size={14} className="mr-1.5" /> Edit Nama
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        * Struktur jabatan bersifat tetap. Hanya nama yang dapat diubah.
      </p>
    </div>
  );
}
