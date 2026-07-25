import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, Newspaper, Calendar, Trash2 } from "lucide-react";

export const metadata = { title: "Dashboard Admin - Padukuhan Mandingan" };

export default async function DashboardPage() {
  const session = await auth();

  let totalBerita = 0, totalAgenda = 0;
  let totalPenduduk = { _sum: { jumlahPenduduk: null as number | null } };
  let laporanTerbaru: Awaited<ReturnType<typeof prisma.trashReport.findMany<{ include: { barrier: true; admin: { select: { name: true } } } }>>> = [];

  try {
    [totalBerita, totalAgenda, totalPenduduk, laporanTerbaru] = await Promise.all([
      prisma.berita.count(),
      prisma.agenda.count(),
      prisma.dataKependudukan.aggregate({ _sum: { jumlahPenduduk: true } }),
      prisma.trashReport.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { barrier: true, admin: { select: { name: true } } },
      }),
    ]);
  } catch { /* DB tidak tersedia */ }

  const volumeColor: Record<string, string> = {
    RENDAH: "bg-green-100 text-green-700",
    SEDANG: "bg-yellow-100 text-yellow-700",
    TINGGI: "bg-orange-100 text-orange-700",
    PENUH: "bg-red-100 text-red-700",
  };

  const stats = [
    {
      label: "Total Penduduk",
      value: totalPenduduk._sum.jumlahPenduduk ?? 0,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
      valueColor: "text-green-700",
    },
    {
      label: "Total Berita",
      value: totalBerita,
      icon: Newspaper,
      color: "text-blue-600",
      bg: "bg-blue-50",
      valueColor: "text-blue-700",
    },
    {
      label: "Total Agenda",
      value: totalAgenda,
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
      valueColor: "text-purple-700",
    },
    {
      label: "Laporan Barrier",
      value: laporanTerbaru.length,
      icon: Trash2,
      color: "text-orange-600",
      bg: "bg-orange-50",
      valueColor: "text-orange-700",
    },
  ];

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Selamat datang kembali, {session?.user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              <div className={`${s.bg} p-2 rounded-xl`}>
                <s.icon size={18} className={s.color} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${s.valueColor}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Laporan Terbaru */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900">Laporan Trash Barrier Terbaru</h2>
          <p className="text-xs text-gray-500 mt-0.5">5 laporan terakhir yang masuk</p>
        </div>
        {laporanTerbaru.length > 0 ? (
          <div className="space-y-3">
            {laporanTerbaru.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{l.barrier.nama}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(l.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })} &middot; {l.admin.name}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${volumeColor[l.volume]}`}>
                  {l.volume}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic py-4 text-center">Belum ada laporan.</p>
        )}
      </div>
    </div>
  );
}
