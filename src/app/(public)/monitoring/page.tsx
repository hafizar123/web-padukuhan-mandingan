import { prisma } from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonitoringChart from "@/components/monitoring/MonitoringChart";
import RiwayatLaporan from "@/components/monitoring/RiwayatLaporan";

export const metadata = { title: "Monitoring Trash Barrier - Padukuhan Mandingan" };

const volumeConfig: Record<string, { label: string; color: string }> = {
  RENDAH: { label: "Rendah", color: "bg-green-100 text-green-700" },
  SEDANG: { label: "Sedang", color: "bg-yellow-100 text-yellow-700" },
  TINGGI: { label: "Tinggi", color: "bg-orange-100 text-orange-700" },
  PENUH: { label: "Penuh", color: "bg-red-100 text-red-700" },
};

export default async function MonitoringPage() {
  let barriers: Awaited<ReturnType<typeof prisma.trashBarrier.findMany<{ include: { reports: { orderBy: { createdAt: "desc" }, include: { admin: { select: { name: true, role: true } } } } } }>>> = [];
  try {
    barriers = await prisma.trashBarrier.findMany({
      orderBy: { rt: "asc" },
      include: {
        reports: {
          orderBy: { createdAt: "desc" },
          include: { admin: { select: { name: true, role: true } } },
        },
      },
    });
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Monitoring Trash Barrier</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-6 tracking-widest text-lg">
        ꦩꦺꦴꦤꦶꦠꦺꦴꦫꦶꦁꦠꦿꦺꦱ꧀ꦧꦺꦂꦫꦶꦪꦼꦂ
      </p>
      <p className="text-gray-500 mb-4">Pantau kondisi 5 titik trash barrier Padukuhan Mandingan secara real-time</p>
      <Separator className="mb-8" />

      {/* Status Terkini tiap Barrier */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Terkini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {barriers.map((b) => {
            const last = b.reports[0];
            const vol = last ? volumeConfig[last.volume] : null;
            return (
              <Card key={b.id} className="border-l-4" style={{
                borderLeftColor: last
                  ? last.volume === "PENUH" ? "#ef4444"
                  : last.volume === "TINGGI" ? "#f97316"
                  : last.volume === "SEDANG" ? "#eab308"
                  : "#22c55e"
                  : "#d1d5db"
              }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{b.nama}</CardTitle>
                    <Badge variant="outline" className="text-xs">RT {b.rt}</Badge>
                  </div>
                  {b.lokasi && <p className="text-xs text-gray-400">{b.lokasi}</p>}
                </CardHeader>
                <CardContent>
                  {last ? (
                    <>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${vol?.color}`}>
                        {vol?.label}
                      </span>
                      {last.foto && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={last.foto}
                          alt="Foto kondisi barrier"
                          className="mt-3 w-full h-32 object-cover rounded-lg"
                        />
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Diperbarui: {new Date(last.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric"
                        })} oleh {last.admin.name}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Belum ada laporan</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Grafik Tren Volume */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tren Volume Sampah</h2>
        <MonitoringChart barriers={barriers} />
      </section>

      {/* Riwayat Laporan per Barrier */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Riwayat Laporan</h2>
        <RiwayatLaporan barriers={barriers} />
      </section>
    </div>
  );
}
