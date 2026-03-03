"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Code2,
  Megaphone,
  Monitor,
  PenTool,
  Users,
  Wallet,
} from "lucide-react";
import clsx from "clsx";
import { getJobCategorySummary } from "@/lib/api/jobs";
import type { JobCategorySummary } from "@/lib/types/job";
import { JOB_CATEGORIES } from "@/lib/utils/constants";

const CATEGORY_ICONS = {
  design: PenTool,
  sales: BarChart3,
  marketing: Megaphone,
  finance: Wallet,
  technology: Monitor,
  engineering: Code2,
  business: Briefcase,
  hr: Users,
} as const;

const FEATURED_CATEGORY = "marketing";

function formatCount(value?: number) {
  if (typeof value !== "number") return "0";
  return value.toLocaleString();
}

export default function ExploreByCategory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobCategorySummary"],
    queryFn: () => getJobCategorySummary(),
    staleTime: 60_000,
  });
  const categories = useMemo(() => {
    const summary = data?.data ?? [];
    const map = new Map<string, JobCategorySummary>(
      summary.map((item) => [item.key, item]),
    );
    return JOB_CATEGORIES.map((category) => ({
      ...category,
      count: map.get(category.key)?.count ?? 0,
    }));
  }, [data?.data]);
  return (
    <section className="container-class">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-clash text-5xl font-semibold text-slate-900">
          Explore by <span className="text-[#26A4FF]">category</span>
        </h2>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Show all jobs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.key] ?? Briefcase;
          const isFeatured = category.key === FEATURED_CATEGORY;
          const count = category.count;

          return (
            <Link
              key={category.key}
              href={{ pathname: "/jobs", query: { category: category.name } }}
              className={clsx(
                "group flex h-full flex-col  border px-5 py-5 transition duration-200",
                isFeatured
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-lg"
                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg",
              )}
            >
              <div
                className={clsx(
                  "inline-flex h-12 w-12 items-center justify-center  transition",
                  isFeatured
                    ? " text-white"
                    : " text-indigo-600  group-hover:text-white",
                )}
              >
                <Icon className="h-12 w-12" />
              </div>

              <h3
                className={clsx(
                  "mt-6 text-2xl font-semibold",
                  isFeatured
                    ? "text-white"
                    : "text-slate-900 group-hover:text-white",
                )}
              >
                {category.name}
              </h3>

              <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm">
                <span
                  className={clsx(
                    "text-slate-500",
                    isFeatured
                      ? "text-white/70"
                      : "group-hover:text-white/70",
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
                    "h-4 w-4",
                    isFeatured
                      ? "text-white/90"
                      : "text-slate-800 group-hover:text-white/90",
                  )}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
