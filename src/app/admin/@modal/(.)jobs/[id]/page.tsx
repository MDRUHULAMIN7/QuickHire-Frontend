"use client";

import { useRouter } from "next/navigation";
import JobDetailsPanel from "@/components/admin/jobs/JobDetailsPanel";

export default function AdminJobDetailsModal({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={() => router.back()}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
      />
      <div className="relative mx-4 w-full max-w-3xl">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Job details
            </h2>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>
          </div>
          <div className="px-6 py-5">
            <JobDetailsPanel jobId={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
