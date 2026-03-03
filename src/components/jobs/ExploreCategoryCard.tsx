"use client";

import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import clsx from "clsx";
import { ExploreCategoryCardProps } from "@/lib/types/job";



function formatCount(value?: number) {
  if (typeof value !== "number") return "0";
  return value.toLocaleString();
}

export default function ExploreCategoryCard({
  href,
  name,
  count,
  Icon = Briefcase,
  isFeatured = false,
  isLoading = false,
  isError = false,
}: ExploreCategoryCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group flex items-center justify-between gap-4 border px-5 py-4 transition duration-200 md:flex-col md:items-start md:justify-between md:gap-6 md:px-6 md:py-6",
        isFeatured
          ? "border-indigo-600 bg-indigo-600 text-white shadow-lg"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg",
      )}
    >
      <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-4">
        <div
          className={clsx(
            "inline-flex h-12 w-12 items-center justify-center transition",
            isFeatured
              ? "text-white"
              : "text-indigo-600 group-hover:text-white",
          )}
        >
          <Icon className="h-10 md:h-12 w-10 md:w-12" />
        </div>
        <div className="space-y-1 md:hidden">
          <h3
            className={clsx(
              "text-xl font-semibold leading-tight",
              isFeatured
                ? "text-white"
                : "text-slate-900 group-hover:text-white",
            )}
          >
            {name}
          </h3>
          <span
            className={clsx(
              "text-xs text-slate-500",
              isFeatured ? "text-white/70" : "group-hover:text-white/70",
            )}
          >
            {isLoading
              ? "Loading jobs..."
              : isError
                ? "Counts unavailable"
                : `${formatCount(count)} jobs available`}
          </span>
        </div>
      </div>

      <ArrowRight
        className={clsx(
          "h-4 w-4 shrink-0 md:hidden",
          isFeatured ? "text-white/90" : "text-slate-800 group-hover:text-white/90",
        )}
      />

      <div className="hidden w-full md:block">
        <h3
          className={clsx(
            "text-xl font-semibold leading-tight",
            isFeatured ? "text-white" : "text-slate-900 group-hover:text-white",
          )}
        >
          {name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span
            className={clsx(
              "text-xs text-slate-500",
              isFeatured ? "text-white/70" : "group-hover:text-white/70",
            )}
          >
            {isLoading
              ? "Loading jobs..."
              : isError
                ? "Counts unavailable"
                : `${formatCount(count)} jobs available`}
          </span>
          <ArrowRight
          className={clsx(
            "h-4 w-4 shrink-0",
            isFeatured
              ? "text-white/90"
              : "text-slate-800 group-hover:text-white/90",
          )}
          />
        </div>
      </div>
    </Link>
  );
}
