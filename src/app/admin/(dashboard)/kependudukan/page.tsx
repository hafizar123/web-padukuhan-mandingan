import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";
import KependudukanForm from "@/components/admin/KependudukanForm";

export const metadata = { title: "Kependudukan - Admin Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

export default async function AdminKependudukanPage() {
  let data: Awaited<ReturnType<typeof prisma.dataKependudukan.findMany>> = [];
  let total = 0;
  try {
    data = await prisma.dataKependudukan.findMany({ orderBy: { rt: "asc" } });
    const agg = await prisma.dataKependudukan.aggregate({ _sum: { jumlahPenduduk: true } });
    total = agg._sum.jumlahPenduduk ?? 0;
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Kependudukan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data kependudukan per RT</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3 flex items-center gap-3">
          <div className="bg-green-50 p-2 rounded-xl">
            <Users size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Penduduk</p>
            <p className="text-xl font-bold text-green-700">{total}</p>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-6">
        <p className="text-sm text-blue-700 font-medium">Petunjuk</p>
        <p className="text-xs text-blue-600 mt-1">
          Masukkan jumlah penduduk untuk setiap RT. Data akan langsung tersimpan saat Anda klik tombol Simpan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((rt) => {
          const existing = data.find((d) => d.rt === rt);
          return (
            <div key={rt} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-700 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{rt}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">RT {rt}</p>
                  {existing && (
                    <p className="text-xs text-gray-500">{existing.jumlahPenduduk} penduduk terdaftar</p>
                  )}
                </div>
              </div>
              <div className="p-5">
                <KependudukanForm rt={rt} existing={existing ?? null} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
