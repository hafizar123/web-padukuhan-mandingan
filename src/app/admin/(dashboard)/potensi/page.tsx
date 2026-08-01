import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Potensi - Admin Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

const kategoriBadge: Record<string, string> = {
  pertanian: "bg-green-100 text-green-700",
  peternakan: "bg-amber-100 text-amber-700",
  kesenian: "bg-purple-100 text-purple-700",
  wisata: "bg-blue-100 text-blue-700",
};

const kategoriLabel: Record<string, string> = {
  pertanian: "Pertanian",
  peternakan: "Peternakan",
  kesenian: "Kesenian",
  wisata: "Wisata",
};

export default async function AdminPotensiPage() {
  let potensi: Awaited<ReturnType<typeof prisma.potensi.findMany>> = [];
  try {
    potensi = await prisma.potensi.findMany({ orderBy: [{ urutan: "asc" }, { createdAt: "asc" }] });
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Potensi Padukuhan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola potensi pertanian, peternakan, kesenian, dan wisata</p>
        </div>
        <Link href="/admin/potensi/tambah">
          <Button size="sm" className="bg-green-700 hover:bg-green-800 rounded-xl">
            <Plus size={14} className="mr-1" /> Tambah Potensi
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Kategori</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Lokasi</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {potensi.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-400 italic">
                  Belum ada data potensi. Klik &quot;Tambah Potensi&quot; untuk menambahkan.
                </td>
              </tr>
            ) : (
              potensi.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{item.nama}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${kategoriBadge[item.kategori] ?? "bg-gray-100 text-gray-600"}`}>
                      {kategoriLabel[item.kategori] ?? item.kategori}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{item.lokasi ?? "-"}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/admin/potensi/${item.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gray-100">
                          <Pencil size={14} />
                        </Button>
                      </Link>
                      <DeleteButton id={item.id} type="potensi" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
