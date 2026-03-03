"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const { user, isLoggedIn, logout } = useAuth();

  const initials = useMemo(() => {
    const label = user?.name ?? user?.email ?? user?.id;
    if (!label) return "U";
    const parts = label.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "U";
  }, [user?.name, user?.email, user?.id]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur-md bg-white/70 shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className=" container-class  h-16 flex items-center justify-between">
        <div className="flex items-center  gap-x-12">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://i.ibb.co.com/3mH950nv/logo.png"
              alt="QuickHire"
              width={40}
              height={28}
              unoptimized
            />
            <span className="font-brand font-bold text-[24px]">QuickHire</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <Link href="/jobs" className="hover:text-indigo-600">
              Find Jobs
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Browse Companies
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-x-6">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-indigo-600 font-bold"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-white"
                onClick={() => setIsProfileOpen((v) => !v)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
              >
                {user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {initials}
                  </span>
                )}
                <ChevronDown size={16} />
              </button>
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border text-gray-700"
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div
        id="mobile-nav"
        className={[
          "md:hidden overflow-hidden border-t border-gray-100 bg-white/90 backdrop-blur-md transition-all duration-300",
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3 text-sm text-gray-700">
            <Link href="/jobs" className="hover:text-indigo-600">
              Find Jobs
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Browse Companies
            </Link>
          </nav>
          {!isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-indigo-200 px-4 py-2 text-indigo-700 font-semibold"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {initials}
                  </span>
                )}
                <span className="text-sm font-semibold text-gray-800">
                  {user?.name ?? user?.email ?? user?.id ?? "User"}
                </span>
              </div>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-gray-700 font-semibold"
              >
                Dashboard
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-gray-700 font-semibold"
                onClick={() => {
                  setIsMobileOpen(false);
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
