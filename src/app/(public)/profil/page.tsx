import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { User } from "lucide-react";

export const metadata = { title: "Profil Padukuhan - Padukuhan Mandingan" };

const strukturFallback = [
  { id: "1", jabatan: "Lurah", nama: "Marjiyem", urutan: 1, foto: null, level: "top" },
  { id: "2", jabatan: "Dukuh", nama: "Suradi Wiyono", urutan: 2, foto: null, level: "middle" },
  { id: "3", jabatan: "Ketua RT 01", nama: "Jumawal", urutan: 3, foto: null, level: "bottom" },
  { id: "4", jabatan: "Ketua RT 02", nama: "Sardi", urutan: 4, foto: null, level: "bottom" },
  { id: "5", jabatan: "Ketua RT 03", nama: "Saryanta", urutan: 5, foto: null, level: "bottom" },
  { id: "6", jabatan: "Ketua RT 04", nama: "Purwanta", urutan: 6, foto: null, level: "bottom" },
];

const misi = [
  "Menjaga kerukunan dan persatuan warga padukuhan dengan selalu menjalin komunikasi di semua segmen masyarakat.",
  "Mendorong warga padukuhan untuk tertib administrasi kependudukan, pajak dan pertanahan dengan memfasilitasi pembuatan, pemutakhiran maupun data.",
  "Bersama menjaga warga padukuhan dalam hal keamanan, ketertiban dengan Jaga Warga.",
  "Menjaga kesehatan warga padukuhan dengan Posyandu rutin dan kegiatan kesehatan lainnya.",
  "Menjaga keharmonisan kehidupan beragama dengan pengajian dan kegiatan keagamaan rutin.",
  "Menjaga hubungan baik warga padukuhan dengan pemerintah Kalurahan Kebonagung.",
  "Mendorong tumbuhnya usaha ekonomi kreatif dan UMKM dengan adanya pelatihan dan kelompok usaha bersama dalam bidang pertanian, peternakan dan industri kecil lainnya.",
];

export default async function ProfilPage() {
  let strukturDB: { id: string; jabatan: string; nama: string; urutan: number; foto: string | null }[] = [];
  try {
    strukturDB = await prisma.strukturOrganisasi.findMany({ orderBy: { urutan: "asc" } });
  } catch { /* DB tidak tersedia */ }

  // Pakai data DB kalau ada, fallback ke hardcode
  const struktur = strukturDB.length > 0 ? strukturDB : strukturFallback;

  // Ambil nama dinamis dari struktur
  const namaDukuh = struktur.find(s => s.jabatan === "Dukuh")?.nama ?? "Suradi Wiyono";
  const namaLurah = struktur.find(s => s.jabatan === "Lurah")?.nama ?? "Marjiyem";

  // Tentukan level berdasarkan urutan
  const lurah = struktur[0];
  const dukuh = struktur[1];
  const rtList = struktur.slice(2);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Profil Padukuhan Mandingan</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-6 tracking-widest text-lg">
        ꦥꦼꦂꦥꦶꦭꦤ꧀ꦥꦢꦸꦏꦸꦲꦤ꧀
      </p>
      <Separator className="mb-10" />

      {/* Logo + Info Singkat */}
      <section className="mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mandingan.png"
            alt="Logo Padukuhan Mandingan"
            className="w-48 h-48 object-contain"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-green-800 mb-3">Padukuhan Mandingan</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Padukuhan Mandingan berada di paling ujung utara Kalurahan Kebonagung dan berbatasan
            wilayah dengan Kalurahan Karangtalun di bagian utara, serta Padukuhan Kanten di bagian
            selatan. Padukuhan Mandingan dikepalai oleh <strong>Bapak Suradi Wiyono</strong> dan
            memiliki wilayah yang meliputi 4 Rukun Tetangga (RT).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Luas Wilayah", value: "41,9 Ha" },
              { label: "Luas Pemukiman", value: "14,28 Ha" },
              { label: "Luas Persawahan", value: "34,82 Ha" },
              { label: "Jumlah RT", value: "4 RT" },
              { label: "Dukuh", value: namaDukuh },
              { label: "Lurah", value: namaLurah },
            ].map((item) => (
              <div key={item.label} className="bg-green-50 border border-green-100 rounded-xl p-3">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-semibold text-green-800 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Visi & Misi</h2>
        <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/60 mb-4 tracking-widest text-base">
          ꦮꦶꦱꦶ꧈ꦩꦶꦱꦶ
        </p>
        <div className="bg-white border border-green-100 rounded-2xl p-6 mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3">Visi</p>
          <p className="text-lg font-semibold text-gray-800 leading-snug">
            Menjadi pedukuhan yang <span className="text-green-700">Teguh</span>,{" "}
            <span className="text-green-700">Teratur</span>,{" "}
            <span className="text-green-700">Unggul</span> dan{" "}
            <span className="text-green-700">Harmonis</span>.
          </p>
        </div>
        <div className="bg-white border border-green-100 rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-4">Misi</p>
          <ol className="space-y-3">
            {misi.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                <span className="shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Struktur Organisasi</h2>
        <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/60 mb-6 tracking-widest text-base">
          ꦱ꧀ꦠꦿꦸꦏ꧀ꦠꦸꦂꦲꦺꦴꦂꦒꦤꦶꦱꦱꦶ
        </p>

        <div className="flex flex-col items-center">
          {/* Lurah */}
          {lurah && (
            <>
              <OrgCard jabatan={lurah.jabatan} nama={lurah.nama} color="bg-amber-700" foto={lurah.foto} />
              <OrgConnector />
            </>
          )}

          {/* Dukuh */}
          {dukuh && (
            <>
              <OrgCard jabatan={dukuh.jabatan} nama={dukuh.nama} color="bg-green-700" foto={dukuh.foto} />
              <OrgConnector />
            </>
          )}

          {/* RT List */}
          {rtList.length > 0 && (
            <div className="w-full max-w-2xl">
              <div className="relative flex justify-between mb-0">
                <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-gray-300" />
                {rtList.map((_, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div className="w-px h-4 bg-gray-300" />
                  </div>
                ))}
              </div>
              <div className={`grid gap-3 ${rtList.length <= 2 ? "grid-cols-2" : rtList.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
                {rtList.map((s) => (
                  <div key={s.id} className="bg-white border-2 border-green-200 rounded-xl p-3 text-center shadow-sm">
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">{s.jabatan}</p>
                    <div className="w-8 h-8 bg-green-100 rounded-full mx-auto my-2 overflow-hidden flex items-center justify-center">
                      {s.foto
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={s.foto} alt={s.nama} className="w-full h-full object-cover" />
                        : <User size={16} className="text-green-700" />
                      }
                    </div>
                    <p className="text-sm font-bold text-gray-800">{s.nama}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function OrgCard({ jabatan, nama, color, foto }: { jabatan: string; nama: string; color: string; foto: string | null }) {
  return (
    <div className={`${color} text-white rounded-xl px-8 py-3 text-center shadow-md min-w-48`}>
      {foto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto} alt={nama} className="w-8 h-8 rounded-full object-cover mx-auto mb-1" />
      )}
      <p className="text-xs font-semibold uppercase tracking-widest opacity-80">{jabatan}</p>
      <p className="text-base font-bold mt-0.5">{nama}</p>
    </div>
  );
}

function OrgConnector() {
  return <div className="w-px h-6 bg-gray-300" />;
}
