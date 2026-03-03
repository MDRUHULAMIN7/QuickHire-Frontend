"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { JobDetail } from "@/lib/types/job";

type FeaturedJobCardProps = {
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

function truncate(text: string, max = 90) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

export default function FeaturedJobCard({ job }: FeaturedJobCardProps) {
  const tags = job.tags?.slice(0, 2) ?? [];

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group flex h-full flex-col border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200"
    >
      <div className="flex items-start justify-between gap-3">
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
        <span className="border border-indigo-200 px-3 py-2 text-xs font-semibold text-indigo-600">
          {job.employment_type}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
        {job.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {job.company} - {job.location}
      </p>
      <p className="mt-4 text-sm text-slate-500">
        {truncate(job.description)}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <span
              key={`${job._id}-${tag}`}
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-semibold",
                tag.toLowerCase().includes("design")
                  ? "bg-emerald-50 text-emerald-600"
                  : tag.toLowerCase().includes("marketing")
                    ? "bg-amber-50 text-amber-600"
                    : tag.toLowerCase().includes("business")
                      ? "bg-indigo-50 text-indigo-600"
                      : "bg-slate-100 text-slate-600",
              )}
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {job.category}
          </span>
        )}
      </div>
    </Link>
  );
}
