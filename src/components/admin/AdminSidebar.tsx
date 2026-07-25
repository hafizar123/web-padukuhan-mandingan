"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  LayoutDashboard, Users, Newspaper, Calendar,
  Trash2, Phone, LogOut, Home, UserCircle, Network, Menu, X
} from "lucide-react";
import { useSession } from "next-auth/react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/struktur", icon: Network, label: "Struktur Organisasi" },
  { href: "/admin/kependudukan", icon: Users, label: "Kependudukan" },
  { href: "/admin/berita", icon: Newspaper, label: "Berita & Pengumuman" },
  { href: "/admin/agenda", icon: Calendar, label: "Agenda" },
  { href: "/admin/kontak", icon: Phone, label: "Kontak" },
  { href: "/admin/monitoring", icon: Trash2, label: "Trash Barrier" },
  { href: "/admin/akun", icon: UserCircle, label: "Akun Saya" },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AdminSidebar({ mobileOpen = false, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showLogout, setShowLogout] = useState(false);

  const sidebarContent = (
    <aside className="w-64 h-full bg-green-800 text-white flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-green-700 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-white font-bold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mandingan.png" alt="Logo" className="w-10 h-10 object-contain shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight whitespace-nowrap">Padukuhan Mandingan</p>
            <p style={{ fontFamily: "var(--font-javanese)" }} className="text-xs text-green-300 tracking-wider leading-tight">
              ꦥꦢꦸꦏꦸꦲꦤ꧀ꦩꦤ꧀ꦢꦶꦔꦤ꧀
            </p>
          </div>
        </Link>
        {/* Close button — visible only on mobile */}
        <button
          className="lg:hidden text-green-200 hover:text-white ml-2 shrink-0"
          onClick={onMobileClose}
          aria-label="Tutup menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* User Info */}
      {session?.user && (
        <div className="px-5 py-3 border-b border-green-700">
          <p className="text-sm font-semibold truncate">{session.user.name}</p>
          <p className="text-xs text-green-300">{session.user.role === "ADMIN" ? "Admin" : session.user.role}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-green-600 text-white"
                  : "text-green-100 hover:bg-green-700"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-green-700 space-y-1">
        <Link
          href="/"
          onClick={onMobileClose}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-green-100 hover:bg-green-700"
        >
          <Home size={16} /> Lihat Website
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-green-100 hover:bg-green-700 hover:text-white px-3"
          onClick={() => setShowLogout(true)}
        >
          <LogOut size={16} className="mr-3" /> Logout
        </Button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on lg+ */}
      <div className="hidden lg:flex w-64 min-h-screen shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Semi-transparent backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="relative z-10 flex flex-col h-full">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent className="sm:max-w-xs p-0 overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-green-600 to-green-400 w-full" />

          <div className="px-6 pt-5 pb-6">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut size={24} className="text-red-500" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Keluar dari panel admin?</h3>
              <p className="text-sm text-gray-500">Kamu perlu login ulang untuk mengakses dashboard.</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 h-10 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowLogout(false)}
              >
                Batal
              </Button>
              <Button
                className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AdminSidebarMobileToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
      onClick={onClick}
      aria-label="Buka menu sidebar"
    >
      <Menu size={22} />
    </button>
  );
}
