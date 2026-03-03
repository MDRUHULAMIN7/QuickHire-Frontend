"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { getLatestJobs } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobDetail } from "@/lib/types/job";

const DEFAULT_LIMIT = 8;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function chipClass(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("design")) return "bg-emerald-50 text-emerald-600";
  if (lower.includes("marketing")) return "bg-amber-50 text-amber-600";
  if (lower.includes("business")) return "bg-indigo-50 text-indigo-600";
  if (lower.includes("full")) return "bg-cyan-50 text-cyan-600";
  return "bg-slate-100 text-slate-600";
}

export default function LatestJobs() {
  const { data, isLoading } = useQuery<ApiResponse<JobDetail[]>>({
    queryKey: ["latestJobs"],
    queryFn: () => getLatestJobs(DEFAULT_LIMIT),
    staleTime: 60_000,
  });

  const jobs = data?.data ?? [];

  return (
    <section className="relative overflow-hidden bg-slate-50 mt-8">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%] opacity-60">
        <Image
          src="/images/hero/Pattern.png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="60vw"
          priority={false}
        />
      </div>

      <div className="container-class  py-14 pt-18 relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-clash text-3xl md:text-[48px] font-bold text-slate-900">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
              <div
                key={`latest-skeleton-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100" />
                  <div className="flex-1">
                    <div className="h-4 w-1/2 rounded bg-slate-100" />
                    <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-slate-100" />
                  <div className="h-6 w-16 rounded-full bg-slate-100" />
                  <div className="h-6 w-16 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            No latest jobs available.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {jobs.map((job) => {
              const tags = job.tags?.slice(0, 2) ?? [];
              return (
                <Link
                  key={job._id}
                  href={`/jobs/${job._id}`}
                  className="flex items-start gap-4   bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                    {job.company_logo_url ? (
                      job.company_logo_url.startsWith("/") ? (
                        <Image
                          src={job.company_logo_url}
                          alt={job.company}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={job.company_logo_url}
                          alt={job.company}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )
                    ) : (
                      getInitials(job.company)
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {job.company} • {job.location}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span
                        className={clsx(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          chipClass(job.employment_type),
                        )}
                      >
                        {job.employment_type}
                      </span>
                    
                      <span
                          className={clsx(
                            "rounded-full px-3 py-1 text-xs font-semibold",
                            chipClass(job.category),
                          )}
                        >
                          {job.category}
                        </span>
                          {tags.length > 0 ? (
                        tags?.slice(0, 1).map((tag) => (
                          <span
                            key={`${job._id}-${tag}`}
                            className={clsx(
                              "rounded-full px-3 py-1 text-xs font-semibold",
                              chipClass(tag),
                            )}
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span
                     
                        >
                        </span>
                      )} 
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
