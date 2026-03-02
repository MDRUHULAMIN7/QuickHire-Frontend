"use client";

import { Suspense, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <Suspense
        fallback={
          <aside className="fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-white flex flex-col h-screen border-r border-slate-200 lg:static" />
        }
      >
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </Suspense>

      {/* Right column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Suspense
          fallback={
            <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80" />
          }
        >
          <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        </Suspense>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full px-6 py-6">
            {children}
          </div>
        </main>
      </div>
      {modal}
    </div>
  );
}
