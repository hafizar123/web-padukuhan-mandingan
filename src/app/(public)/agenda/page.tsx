import { prisma } from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

export const metadata = { title: "Agenda - Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

type AgendaItem = Awaited<ReturnType<typeof prisma.agenda.findMany>>[number];

export default async function AgendaPage() {
  const now = new Date();
  let mendatang: AgendaItem[] = [];
  let selesai: AgendaItem[] = [];
  try {
    [mendatang, selesai] = await Promise.all([
      prisma.agenda.findMany({ where: { tanggal: { gte: now } }, orderBy: { tanggal: "asc" } }),
      prisma.agenda.findMany({ where: { tanggal: { lt: now } }, orderBy: { tanggal: "desc" }, take: 10 }),
    ]);
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Agenda Kegiatan</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-6 tracking-widest text-lg">
        ꦄꦒꦼꦤ꧀ꦢꦏꦼꦒꦶꦪꦠꦤ꧀
      </p>
      <Separator className="mb-8" />

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Agenda Mendatang</h2>
        {mendatang.length > 0 ? (
          <div className="space-y-4">
            {mendatang.map((a: AgendaItem) => (
              <div key={a.id} className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 text-lg">{a.judul}</h3>
                  <Badge className="bg-green-600 shrink-0">Mendatang</Badge>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(a.tanggal).toLocaleDateString("id-ID", {
                      weekday: "long", day: "numeric", month: "long", year: "numeric"
                    })}
                  </span>
                  {a.lokasi && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {a.lokasi}
                    </span>
                  )}
                </div>
                {a.deskripsi && <p className="text-sm text-gray-600 mt-2">{a.deskripsi}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">Tidak ada agenda mendatang saat ini.</p>
        )}
      </section>

      {selesai.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Agenda Selesai</h2>
          <div className="space-y-3">
            {selesai.map((a: AgendaItem) => (
              <div key={a.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-700">{a.judul}</h3>
                  <Badge variant="secondary" className="shrink-0">Selesai</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(a.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                  {a.lokasi && ` • ${a.lokasi}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
