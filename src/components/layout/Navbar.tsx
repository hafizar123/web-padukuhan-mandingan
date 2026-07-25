"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/kependudukan", label: "Kependudukan" },
  { href: "/potensi", label: "Potensi" },
  { href: "/berita", label: "Berita & Pengumuman" },
  { href: "/agenda", label: "Agenda" },
  { href: "/peta", label: "Peta" },
  { href: "/monitoring", label: "Monitoring" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-24 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-bold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mandingan.png" alt="Logo" className="w-16 h-16 object-contain drop-shadow-md shrink-0" />
          <div className="flex flex-col">
            <span className="text-lg leading-tight">Padukuhan Mandingan</span>
            <span style={{ fontFamily: "var(--font-javanese)" }} className="text-xs text-green-200 tracking-wider leading-tight">
              ꦥꦢꦸꦏꦸꦲꦤ꧀ꦩꦤ꧀ꦢꦶꦔꦤ꧀
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm hover:bg-green-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin/login">
            <Button variant="secondary" size="sm" className="ml-2">
              Login Admin
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-green-800 px-4 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin/login" onClick={() => setMobileOpen(false)}>
            <Button variant="secondary" size="sm" className="mt-2 w-full">
              Login Admin
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
