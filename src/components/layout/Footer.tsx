import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mandingan.png" alt="Logo" className="w-7 h-7 object-contain" />
            Padukuhan Mandingan
          </h3>
          <p style={{ fontFamily: "var(--font-javanese)" }} className="text-sm text-green-300 mb-2 tracking-wider">
            ꦥꦢꦸꦏꦸꦲꦤ꧀ꦩꦤ꧀ꦢꦶꦔꦤ꧀
          </p>
          <p className="text-sm text-green-200">
            Website resmi Padukuhan Mandingan. Informasi terkini seputar kegiatan,
            potensi, dan layanan padukuhan.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Tautan Cepat</h4>
          <ul className="space-y-1 text-sm text-green-200">
            <li><Link href="/profil" className="hover:text-white">Profil Padukuhan</Link></li>
            <li><Link href="/potensi" className="hover:text-white">Potensi Padukuhan</Link></li>
            <li><Link href="/berita" className="hover:text-white">Berita & Pengumuman</Link></li>
            <li><Link href="/agenda" className="hover:text-white">Agenda</Link></li>
            <li><Link href="/monitoring" className="hover:text-white">Monitoring Trash Barrier</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Kontak</h4>
          <Link href="/kontak" className="text-sm text-green-200 hover:text-white">
            Kontak Dukuh
          </Link>
        </div>
      </div>
      <div className="border-t border-green-700 text-center text-xs text-green-300 py-4">
        © {new Date().getFullYear()} Padukuhan Mandingan. Dibuat oleh KKN UPNVYK 84.037
      </div>
    </footer>
  );
}
