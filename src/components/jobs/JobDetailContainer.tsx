"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import { getJob } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobDetail } from "@/lib/types/job";
import JobApplyModal from "@/components/jobs/JobApplyModal";

type JobDetailContainerProps = {
  id: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function JobDetailContainer({ id }: JobDetailContainerProps) {
  const [applyOpen, setApplyOpen] = useState(false);
  const { data, isLoading, isError } = useQuery<ApiResponse<JobDetail>>({
    queryKey: ["jobDetail", id],
    queryFn: () => getJob(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });

  const job = data?.data;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#apply") {
      setApplyOpen(true);
    }
  }, []);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading job...
        </div>
      </section>
    );
  }

  if (isError || !job) {
    return (
      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Job not found.
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10 space-y-6">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
              {job.company_logo_url ? (
                job.company_logo_url.startsWith("/") ? (
                  <Image
                    src={job.company_logo_url}
                    alt={job.company}
                    width={56}
                    height={56}
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
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {job.title}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {job.company}
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
            </div>
          </div>

          <button
            type="button"
            onClick={() => setApplyOpen(true)}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Apply now
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Job details</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 whitespace-pre-line">
          {job.description}
        </p>

        {job.tags && job.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={`${job._id}-${tag}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {job && (
        <JobApplyModal
          open={applyOpen}
          jobId={job._id}
          jobTitle={job.title}
          company={job.company}
          onClose={() => setApplyOpen(false)}
        />
      )}
    </section>
  );
}
