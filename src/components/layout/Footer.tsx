import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#202430] text-[#D6DDEB]  ">
      <div className="container-class py-6 md:py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-x-6 gap-y-10 lg:gap-y-0">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="QuickHire"
                width={34}
                height={24}
                unoptimized
              />
              <span className="font-brand font-bold text-2xl text-white">
                QuickHire
              </span>
            </Link>
            <p className=" text-[#D6DDEB] max-w-xs">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

        <div className="flex gap-x-24 lg:gap-x-30 ">
            <div>
            <h4 className=" font-semibold text-white">About</h4>
            <ul className="mt-4 space-y-2 ">
              <li>
                <Link href="#" className="text-white">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Advice
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className=" font-semibold text-white">Resources</h4>
            <ul className="mt-4 space-y-2 ">
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Help Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#D6DDEB]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

          <div className="space-y-4">
            <h4 className=" font-semibold text-white">
              Get job notifications
            </h4>
            <p className=" ">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="h-10 flex-1 max-w-lg  border border-slate-400 bg-[#FFFFFF] px-3 text-slate-200 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-10  bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-text-slate-400 pt-6 text-xs text-slate-400 md:flex-row md:items-center">
          <p>2021 (c) QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800  bg-slate-700 text-[#D6DDEB]"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </Link>
            <Link
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-700 text-[#D6DDEB]"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </Link>
            <Link
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-700 text-[#D6DDEB]"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </Link>
            <Link
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-700 text-[#D6DDEB]"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
