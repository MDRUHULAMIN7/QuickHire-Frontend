"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { toast } from "react-hot-toast";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

// Derive readable title from pathname
function usePageTitle() {
  const pathname = usePathname();
  const map: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/jobs": "Job Listings",
    "/admin/applications": "Applications",
    "/admin/users": "Users",
    "/admin/settings": "Settings",
  };
  return map[pathname] ?? "Admin";
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const title = usePageTitle();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("qh_access_token");
    toast.success("Logged out");
    router.push("/login");
  };

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      {/* Left: menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Open sidebar"
        >
          <Menu size={16} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs font-medium">QuickHire</span>
          <span className="text-slate-300 text-xs">/</span>
          <span className="text-slate-700 text-xs font-medium">{title}</span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-[11px] font-bold text-white transition hover:bg-indigo-700"
        >
          <LogOut size={12} />
          Logout
        </button>
      </div>
    </header>
  );
}
