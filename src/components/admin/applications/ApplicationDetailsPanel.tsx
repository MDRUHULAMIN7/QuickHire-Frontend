"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { getApplication, updateApplicationStatus } from "@/lib/api/applications";
import type { ApiResponse } from "@/lib/types/api";
import type { ApplicationDetail, ApplicationStatus } from "@/lib/types/application";
import { timeAgo } from "@/lib/utils/format";

type ApplicationDetailsPanelProps = {
  applicationId: string;
};

function statusBadge(status: ApplicationStatus) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold";
  switch (status) {
    case "reviewed":
      return `${base} bg-blue-50 text-blue-600`;
    case "shortlisted":
      return `${base} bg-emerald-50 text-emerald-600`;
    case "rejected":
      return `${base} bg-rose-50 text-rose-600`;
    default:
      return `${base} bg-amber-50 text-amber-600`;
  }
}

function getJobName(job: ApplicationDetail["job"]) {
  if (typeof job === "string") return "Unknown job";
  return job.title;
}

function getJobMeta(job: ApplicationDetail["job"]) {
  if (typeof job === "string") return "";
  return `${job.company} - ${job.location}`;
}

export default function ApplicationDetailsPanel({
  applicationId,
}: ApplicationDetailsPanelProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<ApiResponse<ApplicationDetail>>({
    queryKey: ["adminApplication", applicationId],
    queryFn: () => getApplication(applicationId),
  });

  const mutation = useMutation({
    mutationFn: (status: ApplicationStatus) =>
      updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminApplications"] });
      queryClient.invalidateQueries({ queryKey: ["adminApplication", applicationId] });
    },
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
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Unable to load application details.
      </div>
    );
  }

  const app = data.data;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {app.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{app.email}</p>
        </div>
        <div className="text-xs text-slate-400">
          Applied {app.createdAt ? timeAgo(app.createdAt) : "recently"}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Job
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {getJobName(app.job)}
          </p>
          <p className="mt-1 text-xs text-slate-500">{getJobMeta(app.job)}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Status
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className={statusBadge(app.status)}>{app.status}</span>
            <select
              value={app.status}
              onChange={(event) =>
                mutation.mutate(event.target.value as ApplicationStatus)
              }
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs"
            >
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-semibold text-slate-900">Resume</h2>
        <a
          href={app.resumeLink}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          View resume
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-semibold text-slate-900">Cover note</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 whitespace-pre-line">
          {app.coverNote}
        </p>
      </div>
    </div>
  );
}
