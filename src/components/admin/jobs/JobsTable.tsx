"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { JobSummary } from "@/lib/types/job";
import { timeAgo } from "@/lib/utils/format";

type JobsTableProps = {
  jobs: JobSummary[];
  onEdit: (jobId: string) => void;
  onDelete: (job: JobSummary) => void;
};

export default function JobsTable({ jobs, onEdit, onDelete }: JobsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-225 w-full text-left text-sm">
        <thead className="border-b border-slate-100 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-5 py-3 font-semibold">Title</th>
            <th className="px-5 py-3 font-semibold">Company</th>
            <th className="px-5 py-3 font-semibold">Location</th>
            <th className="px-5 py-3 font-semibold">Category</th>
            <th className="px-5 py-3 font-semibold">Type</th>
            <th className="px-5 py-3 font-semibold">Created</th>
            <th className="px-5 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
            >
              <td className="px-5 py-3 font-medium text-slate-900">
                {job.title}
              </td>
              <td className="px-5 py-3 text-slate-600">{job.company}</td>
              <td className="px-5 py-3 text-slate-600">{job.location}</td>
              <td className="px-5 py-3 text-slate-600">{job.category}</td>
              <td className="px-5 py-3 text-slate-600">
                {job.employment_type}
              </td>
              <td className="px-5 py-3 text-slate-500">
                {job.createdAt ? timeAgo(job.createdAt) : "—"}
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/jobs/${job._id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
                    title="View details"
                  >
                    <Eye size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onEdit(job._id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
                    title="Edit job"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(job)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
                    title="Delete job"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
