import { prisma } from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import PetaMap from "@/components/peta/PetaMap";

export const metadata = { title: "Peta Padukuhan - Padukuhan Mandingan" };

export default async function PetaPage() {
  let barriers: Awaited<ReturnType<typeof prisma.trashBarrier.findMany<{ include: { reports: { orderBy: { createdAt: "desc" }, take: 1 } } }>>> = [];
  try {
    barriers = await prisma.trashBarrier.findMany({
      orderBy: { rt: "asc" },
      include: { reports: { orderBy: { createdAt: "desc" }, take: 1 } },
    });
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Peta Padukuhan Mandingan</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-6 tracking-widest text-lg">
        ꦥꦺꦠꦥꦢꦸꦏꦸꦲꦤ꧀
      </p>
      <Separator className="mb-8" />

      {/* Peta */}
      <section className="mb-10">
        <PetaMap />
      </section>

      {/* Info Wilayah */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Batas Utara", value: "Kalurahan Karangtalun" },
            { label: "Batas Selatan", value: "Padukuhan Kanten" },
            { label: "Jumlah RT", value: "4 RT" },
          ].map((item) => (
            <div key={item.label} className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
              <MapPin size={16} className="text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legenda Trash Barrier */}
      {barriers.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Lokasi Trash Barrier</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {barriers.map((b) => {
              const lastReport = b.reports[0];
              return (
                <div key={b.id} className="bg-white border rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800">{b.nama}</p>
                    <Badge variant="outline" className="text-green-700 border-green-300">RT {b.rt}</Badge>
                  </div>
                  {b.lokasi && <p className="text-sm text-gray-500">{b.lokasi}</p>}
                  {lastReport ? (
                    <div className="mt-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        lastReport.volume === "PENUH" ? "bg-red-100 text-red-700" :
                        lastReport.volume === "TINGGI" ? "bg-orange-100 text-orange-700" :
                        lastReport.volume === "SEDANG" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {lastReport.volume}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 mt-2">Belum ada laporan</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
