"use client";

import { useState } from "react";
import AdminSidebar, { AdminSidebarMobileToggle } from "@/components/admin/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar dengan hamburger */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-40">
          <AdminSidebarMobileToggle onClick={() => setSidebarOpen(true)} />
          <span className="font-semibold text-gray-700 text-sm">Padukuhan Mandingan</span>
        </div>

        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
