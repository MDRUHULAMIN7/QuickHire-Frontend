import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className=" bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center  gap-x-12">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="QuickHire" width={40} height={28} />
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
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-indigo-600 font-bold"
          > Login
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2  bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
          >
             Sign Up
          </Link>
        </div>
        <button className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border text-gray-700"> 
          <Menu />
        </button>
      </div>
    </header>
  );
}
