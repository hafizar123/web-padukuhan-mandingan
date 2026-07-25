import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import InputLaporanForm from "@/components/admin/InputLaporanForm";

export const metadata = { title: "Trash Barrier - Admin Padukuhan Mandingan" };

export default async function AdminMonitoringPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  let barriers: Awaited<ReturnType<typeof prisma.trashBarrier.findMany<{ include: { reports: { orderBy: { createdAt: "desc" }, take: 1 } } }>>> = [];
  try {
    barriers = await prisma.trashBarrier.findMany({
      orderBy: [{ rt: "asc" }, { nama: "asc" }],
      include: { reports: { orderBy: { createdAt: "desc" }, take: 1 } },
    });
  } catch { /* DB tidak tersedia */ }

  const volumeColor: Record<string, string> = {
    RENDAH: "bg-green-100 text-green-700",
    SEDANG: "bg-yellow-100 text-yellow-700",
    TINGGI: "bg-orange-100 text-orange-700",
    PENUH: "bg-red-100 text-red-700",
  };

  const volumeBar: Record<string, string> = {
    RENDAH: "bg-green-500",
    SEDANG: "bg-yellow-400",
    TINGGI: "bg-orange-400",
    PENUH: "bg-red-500",
  };

  const volumePercent: Record<string, number> = {
    RENDAH: 25,
    SEDANG: 50,
    TINGGI: 75,
    PENUH: 100,
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Monitoring Trash Barrier</h1>
        <p className="text-sm text-gray-500 mt-1">Input laporan kondisi trash barrier Padukuhan Mandingan</p>
      </div>

      {/* Status Cards */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900">Status Terkini</h2>
          <p className="text-xs text-gray-500 mt-0.5">Kondisi terakhir setiap barrier</p>
        </div>
        {barriers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-400 italic">Belum ada data barrier.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {barriers.map((b) => {
              const last = b.reports[0];
              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{b.nama}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{b.lokasi ?? `RT ${b.rt}`}</p>
                    </div>
                    {last && (
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${volumeColor[last.volume]}`}>
                        {last.volume}
                      </span>
                    )}
                  </div>
                  {last ? (
                    <>
                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${volumeBar[last.volume]}`}
                          style={{ width: `${volumePercent[last.volume]}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400">
                        Diperbarui:{" "}
                        {new Date(last.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Belum ada laporan</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Form Input */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900">Input Laporan Baru</h2>
          <p className="text-xs text-gray-500 mt-0.5">Pilih barrier dan masukkan kondisi terkini</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <InputLaporanForm
            barriers={barriers.map((b) => ({ id: b.id, nama: b.nama, rt: b.rt }))}
          />
        </div>
      </section>
    </div>
  );
}
