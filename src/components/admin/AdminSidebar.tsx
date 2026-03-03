"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  Users,
  Settings,
  ChevronRight,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | null;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Manage",
    items: [
      { href: "/admin/jobs", label: "Jobs", icon: Briefcase, badge: null },
      {
        href: "/admin/applications",
        label: "Applications",
        icon: ClipboardList,
      },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const handleNavClick = () => {
    if (open) {
      onClose();
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-white flex flex-col h-screen border-r border-slate-200 transform transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 shrink-0">
        <Link href="/" className="flex items-center gap-2" onClick={handleNavClick}>
          <Image
            src="https://i.ibb.co.com/3mH950nv/logo.png"
            alt="QuickHire"
            width={40}
            height={28}
            unoptimized
          />
          <span className="font-brand font-bold text-[20px] text-slate-900">
            QuickHire
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden inline-flex items-center justify-center h-8 w-8 rounded-md border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Close sidebar"
        >
          <X size={14} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-1.5">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon, badge }) => {
                const isActive =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(href);

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={handleNavClick}
                      className={`
                        relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm
                        transition-all duration-150 group
                        ${
                          isActive
                            ? "bg-indigo-50 text-slate-900"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                        }
                      `}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-500 rounded-r-full" />
                      )}

                      <Icon
                        size={15}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      />

                      <span className="flex-1 font-medium tracking-tight">
                        {label}
                      </span>

                      {badge && (
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full border border-indigo-200">
                          {badge}
                        </span>
                      )}

                      {isActive && (
                        <ChevronRight
                          size={12}
                          className="text-indigo-500/70 shrink-0"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom User area */}
      <div className="shrink-0 p-3 border-t border-slate-200">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-100/70 transition-colors cursor-pointer group">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-indigo-600 to-slate-700 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate leading-none mb-0.5">
              Admin
            </p>
            <p className="text-[10px] text-slate-400 truncate leading-none">
              admin@quickhire.com
            </p>
          </div>
          <Settings
            size={13}
            className="text-slate-400 group-hover:text-slate-600 transition-colors shrink-0"
          />
        </div>
      </div>
    </aside>
  );
}
