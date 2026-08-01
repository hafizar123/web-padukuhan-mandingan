import { Separator } from "@/components/ui/separator";
import { Wheat, Beef, Music, Landmark } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Potensi Padukuhan - Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

const kategori = [
  { id: "pertanian", label: "Pertanian", icon: Wheat, color: "bg-green-100 text-green-700 border-green-200" },
  { id: "peternakan", label: "Peternakan", icon: Beef, color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "kesenian", label: "Kesenian & Budaya", icon: Music, color: "bg-purple-100 text-purple-700 border-purple-200" },
  { id: "wisata", label: "Wisata Edukasi", icon: Landmark, color: "bg-blue-100 text-blue-700 border-blue-200" },
];

const potensi = [
  {
    id: 1,
    nama: 'Kelompok Tani "Karya"',
    kategori: "pertanian",
    lokasi: "Bulak Karya Selatan, Padukuhan Mandingan",
    pimpinan: "Bapak Mujiyono",
    deskripsi: `Kelompok Tani "Karya" berlokasi di Bulak Karya Selatan, Padukuhan Mandingan dan dipimpin oleh Bapak Mujiyono. Kelompok ini dibentuk dengan tujuan untuk meningkatkan kemampuan, kemandirian, dan efisiensi para petani melalui pengembangan pengetahuan, keterampilan, serta sikap anggota. Selain itu, Kelompok Tani "Karya" juga menyediakan berbagai sarana pendukung pertanian, seperti traktor, benih, dan pupuk.

Kelompok Tani "Karya" berperan sebagai wadah penyuluhan yang mendorong inovasi serta memperkuat kerja sama antara petani dan berbagai pihak terkait. Keberadaan kelompok ini diharapkan dapat meningkatkan kesejahteraan petani sekaligus menjaga keberlangsungan tradisi pertanian di Padukuhan Mandingan.`,
  },
  {
    id: 2,
    nama: 'Kelompok Ternak "Sarono Rukun"',
    kategori: "peternakan",
    lokasi: "RT 01 Dusun Wolosono, Padukuhan Mandingan",
    pimpinan: null,
    deskripsi: `Kelompok Ternak "Sarono Rukun" berlokasi di RT 01 Dusun Wolosono, Padukuhan Mandingan dan berdiri pada tahun 2025. Pada awal pembentukannya, kelompok ini memiliki kandang berkapasitas 6 petak dengan jumlah ternak sebanyak 11 ekor kambing yang terdiri atas 10 ekor betina dan 1 ekor jantan. Saat ini, kelompok tersebut telah berkembang dengan kapasitas kandang sebanyak 12 petak yang tersebar di dua lokasi serta memiliki total populasi ternak mencapai 25 ekor kambing.

Kelompok Ternak "Sarono Rukun" memiliki 20 anggota terdaftar dengan 7 anggota yang masih aktif. Kegiatan kelompok meliputi musyawarah rutin setiap satu bulan sekali serta perawatan kandang secara berkala untuk menjaga kesehatan dan produktivitas ternak.`,
  },
  {
    id: 3,
    nama: 'Kelompok Ternak "Sido Renggeng"',
    kategori: "peternakan",
    lokasi: "RT 02 Dusun Mandingan, Padukuhan Mandingan",
    pimpinan: null,
    deskripsi: `Kelompok Ternak "Sido Renggeng" berlokasi di RT 02 Dusun Mandingan, Padukuhan Mandingan dan berdiri pada akhir tahun 2023. Pembentukan kelompok ini diawali dengan bantuan dari Dinas Peternakan, Kelautan, dan Perikanan Kabupaten Bantul berupa 11 ekor kambing. Seiring dengan perkembangan kelompok, jumlah ternak yang dikelola saat ini telah meningkat menjadi 25 ekor kambing.

Kelompok Ternak "Sido Renggeng" dibentuk sebagai wadah kerja sama antarpeternak dalam pengelolaan ternak, pelaksanaan pelatihan, serta peningkatan akses terhadap sumber daya dan pasar. Keberadaan kelompok ini diharapkan dapat meningkatkan produktivitas dan kesejahteraan para peternak di Padukuhan Mandingan.`,
  },
  {
    id: 4,
    nama: 'Gejog Lesung "Gemah Ripah"',
    kategori: "kesenian",
    lokasi: "RT 03 Dusun Candran, Padukuhan Mandingan",
    pimpinan: "Bapak Slamet",
    deskripsi: `Kelompok kesenian Gejog Lesung "Gemah Ripah" berlokasi di RT 03 Dusun Candran, Padukuhan Mandingan dan menjadi salah satu kesenian tradisional yang digunakan sebagai bentuk penyambutan bagi tamu yang berkunjung ke Padukuhan Mandingan. Kelompok kesenian ini dipimpin oleh Bapak Slamet dan dibentuk sebagai wadah untuk mengenalkan serta mengembangkan seni dan budaya tradisional kepada generasi muda.

Gejog Lesung "Gemah Ripah" berperan dalam melatih dan membimbing generasi muda agar dapat menjaga, melestarikan, serta meneruskan keberadaan kesenian tradisional. Keberadaan kelompok ini menjadi salah satu bentuk upaya pelestarian budaya lokal di Padukuhan Mandingan.`,
  },
  {
    id: 5,
    nama: 'Hadroh "As-Syifa"',
    kategori: "kesenian",
    lokasi: "RT 03 Dusun Candran, Padukuhan Mandingan",
    pimpinan: "Ibu Siti Nurjanah",
    deskripsi: `Kelompok Hadroh "As-Syifa" berlokasi di RT 03 Dusun Candran, Padukuhan Mandingan dan dibentuk pada tahun 2023. Nama "As-Syifa" dipilih dengan harapan bahwa kegiatan bershalawat dapat menjadi sarana penyembuhan fisik maupun mental. Kelompok ini dipimpin oleh Ibu Siti Nurjanah dengan jumlah anggota sebanyak 11 orang.

Hadroh "As-Syifa" dibentuk sebagai wadah untuk mendidik generasi muda mengenai nilai-nilai agama, seni, dan budaya tradisional. Kegiatan latihan rutin dilaksanakan setiap malam Selasa, sedangkan pementasan dilakukan pada pengajian rutin malam Ahad Pahing maupun kegiatan masyarakat lainnya. Kelompok ini juga telah memiliki Nomor Induk Berusaha (NIB) dari Dinas Kebudayaan.`,
  },
  {
    id: 6,
    nama: 'Karawitan "Agung Wiromo"',
    kategori: "kesenian",
    lokasi: "RT 01 Dusun Wolosono, Padukuhan Mandingan",
    pimpinan: "Ibu Sudiwiranto",
    deskripsi: `Kelompok Karawitan "Agung Wiromo" berlokasi di RT 01 Dusun Wolosono, Padukuhan Mandingan dan merupakan salah satu kesenian tradisional yang telah berkembang sejak tahun 1918. Kesenian ini pertama kali digagas oleh Ibu Sudiwiranto dengan menggunakan perangkat gamelan milik pribadi. Kelompok ini memiliki 24 personil terdaftar dengan sekitar 20 anggota yang masih aktif, terdiri atas 12 penabuh serta 8 anggota sebagai girong dan sinden.

Keberadaan Karawitan "Agung Wiromo" menjadi salah satu bentuk upaya pelestarian seni dan budaya tradisional di Padukuhan Mandingan.`,
  },
  {
    id: 7,
    nama: "Museum Tani Jawa Indonesia",
    kategori: "wisata",
    lokasi: "Dusun Candran, Padukuhan Mandingan",
    pimpinan: "Kristya Bintara (Pendiri)",
    foto: ["/museum-tani-1.jpeg", "/museum-tani-2.jpeg"],
    deskripsi: `Museum Tani Jawa Indonesia berlokasi di Dusun Candran, Padukuhan Mandingan dan didirikan oleh Kristya Bintara, mantan Lurah Desa Kebonagung, pada tahun 1998. Museum ini dibangun sebagai tempat pelestarian budaya pertanian Jawa dan mulai mengumpulkan berbagai alat pertanian tradisional sejak tahun 2005. Bangunan sempat mengalami kerusakan akibat gempa Yogyakarta tahun 2006, kemudian dibangun kembali dan diresmikan pada 4 Mei 2007.

Hingga saat ini, Museum Tani Jawa Indonesia menyimpan lebih dari 620 koleksi alat pertanian tradisional Jawa dari berbagai zaman dengan bahan berupa batu, besi, bambu, kayu, dan aluminium. Selain sebagai tempat penyimpanan artefak budaya, museum ini juga menjadi sarana edukasi bagi masyarakat dan wisatawan untuk mengenal sejarah, tradisi, serta kearifan lokal dalam kehidupan agraris masyarakat Jawa.`,
  },
];

const katConfig: Record<string, { label: string; icon: React.ComponentType<{ size?: number; className?: string }>; bg: string; border: string; text: string; badge: string }> = {
  pertanian: { label: "Pertanian", icon: Wheat, bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-700" },
  peternakan: { label: "Peternakan", icon: Beef, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", badge: "bg-amber-100 text-amber-700" },
  kesenian: { label: "Kesenian & Budaya", icon: Music, bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-100 text-purple-700" },
  wisata: { label: "Wisata Edukasi", icon: Landmark, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
};

export default async function PotensiPage() {
  // Coba ambil dari DB, fallback ke hardcode
  let potensiData: { id: string | number; nama: string; kategori: string; lokasi: string | null; pimpinan: string | null; deskripsi: string; foto?: string[] }[] = [];
  try {
    const dbData = await prisma.potensi.findMany({ orderBy: [{ urutan: "asc" }, { createdAt: "asc" }] });
    potensiData = dbData.length > 0 ? dbData : potensi;
  } catch {
    potensiData = potensi;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Potensi Padukuhan</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-6 tracking-widest text-lg">
        ꦥꦺꦴꦠꦼꦤ꧀ꦱꦶꦥꦢꦸꦏꦸꦲꦤ꧀
      </p>
      <Separator className="mb-10" />

      {/* Kategori Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {kategori.map((kat) => {
          const count = potensiData.filter(p => p.kategori === kat.id).length;
          return (
            <div key={kat.id} className={`${kat.color} border rounded-2xl p-4 text-center`}>
              <kat.icon size={24} className="mx-auto mb-2" />
              <p className="text-sm font-semibold">{kat.label}</p>
              <p className="text-2xl font-bold mt-1">{count}</p>
              <p className="text-xs opacity-70">kelompok</p>
            </div>
          );
        })}
      </div>

      {/* List per Kategori */}
      {Object.entries(katConfig).map(([katId, config]) => {
        const items = potensiData.filter(p => p.kategori === katId);
        if (items.length === 0) return null;
        const Icon = config.icon;
        return (
          <section key={katId} className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <div className={`w-8 h-8 rounded-lg ${config.bg} ${config.border} border flex items-center justify-center`}>
                <Icon size={16} className={config.text} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{config.label}</h2>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className={`${config.bg} border ${config.border} rounded-2xl p-6`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{item.nama}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badge}`}>
                      {config.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {item.lokasi}
                    </span>
                    {item.pimpinan && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        {item.pimpinan}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.deskripsi}</p>

                  {"foto" in item && Array.isArray(item.foto) && item.foto.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {(item.foto as string[]).map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={src}
                          alt={`${item.nama} ${i + 1}`}
                          className="w-full h-auto object-contain rounded-xl bg-white"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
