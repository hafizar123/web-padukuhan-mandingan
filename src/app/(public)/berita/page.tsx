import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata = { title: "Berita & Pengumuman - Padukuhan Mandingan" };

export default async function BeritaPage() {
  let berita: Awaited<ReturnType<typeof prisma.berita.findMany>> = [];
  let pengumuman: Awaited<ReturnType<typeof prisma.pengumuman.findMany>> = [];
  try {
    [berita, pengumuman] = await Promise.all([
      prisma.berita.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
      prisma.pengumuman.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
    ]);
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Berita & Pengumuman</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-6 tracking-widest text-lg">
        ꦧꦼꦫꦶꦠ꧈ꦥꦼꦔꦸꦩꦸꦩꦤ꧀
      </p>
      <Separator className="mb-8" />

      {/* Pengumuman */}
      {pengumuman.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pengumuman Terkini</h2>
          <div className="space-y-3">
            {pengumuman.map((p) => (
              <div key={p.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{p.judul}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.konten}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">Pengumuman</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(p.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Berita */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Berita Desa</h2>
        {berita.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {berita.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {item.thumbnail && (
                  <div className="h-44 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-base line-clamp-2">{item.judul}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 line-clamp-3">{item.konten}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">Belum ada berita yang dipublikasikan.</p>
        )}
      </section>
    </div>
  );
}
