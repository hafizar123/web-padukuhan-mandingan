import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getTotalKependudukan } from "@/lib/data-kependudukan";
import { MapPin, Users, Newspaper, Calendar, Trash2, Phone, Sprout } from "lucide-react";

async function getBeritaTerbaru() {
  try {
    return await prisma.berita.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

const menuItems = [
  { href: "/profil", icon: MapPin, label: "Profil Padukuhan", desc: "Info wilayah, visi misi, dan struktur organisasi" },
  { href: "/kependudukan", icon: Users, label: "Kependudukan", desc: "Data penduduk dan statistik per RT" },
  { href: "/potensi", icon: Sprout, label: "Potensi Padukuhan", desc: "Pertanian, peternakan, kesenian, dan wisata edukasi" },
  { href: "/berita", icon: Newspaper, label: "Berita & Pengumuman", desc: "Info terkini dari padukuhan" },
  { href: "/agenda", icon: Calendar, label: "Agenda", desc: "Kegiatan dan event mendatang" },
  { href: "/monitoring", icon: Trash2, label: "Monitoring Trash Barrier", desc: "Pantau kondisi trash barrier" },
  { href: "/kontak", icon: Phone, label: "Kontak", desc: "Hubungi perangkat desa dan ketua RT" },
];

export default async function HomePage() {
  const [berita, penduduk] = await Promise.all([getBeritaTerbaru(), getTotalKependudukan()]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Selamat Datang di Padukuhan Mandingan
          </h1>
          <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-300 text-xl mb-4 tracking-widest">
            ꦥꦢꦸꦏꦸꦲꦤ꧀ꦩꦤ꧀ꦢꦶꦔꦤ꧀
          </p>
          <p className="text-green-100 text-lg mb-8">
            Portal informasi resmi Padukuhan Mandingan. Temukan informasi terkini
            seputar kegiatan, pelayanan, dan potensi padukuhan kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/profil">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold shadow-md transition-all duration-200 hover:scale-105"
              >
                Tentang Padukuhan
              </Button>
            </Link>
            <Link href="/monitoring">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold shadow-md transition-all duration-200 hover:scale-105"
              >
                Monitoring Trash Barrier
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistik Singkat */}
      <section className="bg-green-50 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-green-700">{penduduk.jumlahPenduduk ?? "-"}</p>
            <p className="text-sm text-gray-500 mt-1">Total Penduduk</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-green-700">{penduduk.jumlahKK ?? "-"}</p>
            <p className="text-sm text-gray-500 mt-1">Kepala Keluarga</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-green-700">4</p>
            <p className="text-sm text-gray-500 mt-1">Rukun Tetangga</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-green-700">5</p>
            <p className="text-sm text-gray-500 mt-1">Trash Barrier</p>
          </div>
        </div>
      </section>

      {/* Menu Utama */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Layanan & Informasi</h2>
          <p style={{ fontFamily: "var(--font-javanese)" }} className="text-center text-green-600/70 mb-8 tracking-widest">
            ꦭꦪꦤꦤ꧀꧈ꦲꦶꦤ꧀ꦥꦺꦴꦂꦩꦱꦶ
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-green-100 hover:border-green-300">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                      <item.icon className="text-green-700" size={20} />
                    </div>
                    <CardTitle className="text-base">{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      {berita.length > 0 && (
        <section className="bg-gray-50 py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Berita Terbaru</h2>
              <Link href="/berita">
                <Button variant="outline" size="sm">Lihat Semua</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {berita.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {item.thumbnail && (
                    <div className="h-40 bg-gray-200 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold line-clamp-2">{item.judul}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.konten}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
