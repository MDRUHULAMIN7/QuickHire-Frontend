"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { JobDetail } from "@/lib/types/job";

type LatestJobCardProps = {
  job: JobDetail;
};

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

export default function LatestJobCard({ job }: LatestJobCardProps) {
  const tags = job.tags?.slice(0, 2) ?? [];

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="flex flex-col items-start gap-3  border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 sm:flex-row sm:gap-4 sm:p-7"
    >
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-600 sm:h-12 sm:w-12">
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
        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
          {job.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {job.company} • {job.location}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={clsx(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs",
              chipClass(job.employment_type),
            )}
          >
            {job.employment_type}
          </span>

          <span
            className={clsx(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs",
              chipClass(job.category),
            )}
          >
            {job.category}
          </span>
          {tags.length > 0 ? (
            tags.slice(0, 1).map((tag) => (
              <span
                key={`${job._id}-${tag}`}
                className={clsx(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs",
                  chipClass(tag),
                )}
              >
                {tag}
              </span>
            ))
          ) : null}
        </div>
      </div>
    </Link>
  );
}
