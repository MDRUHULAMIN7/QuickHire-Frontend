"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, MapPin, X } from "lucide-react";
import { getJob } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobDetail } from "@/lib/types/job";
import Link from "next/link";

type JobQuickViewModalProps = {
  open: boolean;
  jobId: string | null;
  onClose: () => void;
};

export default function JobQuickViewModal({
  open,
  jobId,
  onClose,
}: JobQuickViewModalProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const { data, isLoading, isError } = useQuery<ApiResponse<JobDetail>>({
    queryKey: ["jobQuickView", jobId],
    queryFn: () => getJob(jobId as string),
    enabled: open && Boolean(jobId),
  });

  if (!open) return null;

  const job = data?.data;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {isLoading ? (
          <p className="text-sm text-slate-500">Loading job...</p>
        ) : isError || !job ? (
          <p className="text-sm text-slate-500">Job not found.</p>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-slate-900">
              {job.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {job.company} • {job.location}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {job.employment_type}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                {job.category}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-6">
              {job.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/jobs/${job._id}`}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                View full details
              </Link>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Apply now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
