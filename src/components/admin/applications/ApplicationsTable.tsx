"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import type { ApplicationDetail, ApplicationStatus } from "@/lib/types/application";
import { timeAgo } from "@/lib/utils/format";

type ApplicationsTableProps = {
  applications: ApplicationDetail[];
  onStatusChange: (id: string, status: ApplicationStatus) => void;
};

function getJobTitle(job: ApplicationDetail["job"]) {
  if (typeof job === "string") return "Unknown job";
  return job.title;
}

function getJobCompany(job: ApplicationDetail["job"]) {
  if (typeof job === "string") return "";
  return job.company;
}

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

export default function ApplicationsTable({
  applications,
  onStatusChange,
}: ApplicationsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-225 w-full text-left text-sm">
        <thead className="border-b border-slate-100 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-5 py-3 font-semibold">Candidate</th>
            <th className="px-5 py-3 font-semibold">Job</th>
            <th className="px-5 py-3 font-semibold">Email</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 font-semibold">Applied</th>
            <th className="px-5 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app._id}
              className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
            >
              <td className="px-5 py-3 font-medium text-slate-900">
                {app.name}
              </td>
              <td className="px-5 py-3 text-slate-600">
                <div className="font-medium text-slate-700">
                  {getJobTitle(app.job)}
                </div>
                <div className="text-xs text-slate-400">
                  {getJobCompany(app.job)}
                </div>
              </td>
              <td className="px-5 py-3 text-slate-600">{app.email}</td>
              <td className="px-5 py-3">
                <div className="flex flex-col gap-2">
                  <span className={statusBadge(app.status)}>{app.status}</span>
                  <select
                    value={app.status}
                    onChange={(event) =>
                      onStatusChange(
                        app._id,
                        event.target.value as ApplicationStatus,
                      )
                    }
                    className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </td>
              <td className="px-5 py-3 text-slate-500">
                {app.createdAt ? timeAgo(app.createdAt) : "-"}
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/applications/${app._id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
                    title="View details"
                  >
                    <Eye size={14} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
