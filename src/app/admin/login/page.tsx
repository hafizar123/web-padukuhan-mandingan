import LoginForm from "@/components/admin/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Login Admin - Padukuhan Mandingan" };

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-green-700 to-green-900 p-12 text-white">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mandingan.png" alt="Logo" className="w-12 h-12 object-contain" />
          <div>
            <span className="text-xl font-bold tracking-tight block">Padukuhan Mandingan</span>
            <span style={{ fontFamily: "var(--font-javanese)" }} className="text-sm text-green-300 tracking-wider">
              ꦥꦢꦸꦏꦸꦲꦤ꧀ꦩꦤ꧀ꦢꦶꦔꦤ꧀
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight mb-2">
            Portal Admin<br />Padukuhan Mandingan
          </h1>
          <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-300 text-lg mb-4 tracking-widest">
            ꦥꦢꦸꦏꦸꦲꦤ꧀ꦩꦤ꧀ꦢꦶꦔꦤ꧀
          </p>
          <p className="text-green-200 text-lg leading-relaxed">
            Kelola informasi desa, data kependudukan, berita, dan monitoring
            trash barrier dari satu tempat.
          </p>
        </div>

        <div className="space-y-3">
          {[
            "Kelola berita & pengumuman desa",
            "Monitor kondisi trash barrier",
            "Update data kependudukan",
            "Atur agenda kegiatan desa",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-green-100">
              <div className="w-5 h-5 rounded-full bg-green-500/40 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mandingan.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <span className="text-xl font-bold text-green-800 block">Padukuhan Mandingan</span>
            <span style={{ fontFamily: "var(--font-javanese)" }} className="text-sm text-green-600 tracking-wider">
              ꦥꦢꦸꦏꦸꦲꦤ꧀ꦩꦤ꧀ꦢꦶꦔꦤ꧀
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Selamat datang</h2>
            <p className="text-gray-500 mt-1 text-sm">Masuk ke panel admin desa</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors"
            >
              <ArrowLeft size={14} />
              Kembali ke halaman utama
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            © {new Date().getFullYear()} Padukuhan Mandingan · KKN UPNVYK 84.037
          </p>
        </div>
      </div>
    </div>
  );
}
