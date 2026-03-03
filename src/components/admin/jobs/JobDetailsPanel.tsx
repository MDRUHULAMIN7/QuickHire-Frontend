"use client";

import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobDetail } from "@/lib/types/job";
import { timeAgo } from "@/lib/utils/format";
import StateMessage from "@/components/ui/StateMessage";

type JobDetailsPanelProps = {
  jobId: string;
};

export default function JobDetailsPanel({ jobId }: JobDetailsPanelProps) {
  const { data, isLoading, isError } = useQuery<ApiResponse<JobDetail>>({
    queryKey: ["adminJob", jobId],
    queryFn: () => getJob(jobId),
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <StateMessage
        variant="card"
        message="Unable to load job details."
      />
    );
  }

  const job = data.data;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{job.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {job.company} • {job.location}
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Posted {job.createdAt ? timeAgo(job.createdAt) : "recently"}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Category
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {job.category}
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Employment
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {job.employment_type}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-semibold text-slate-900">Description</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {job.description}
        </p>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Tags
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
