"use client";


import StateMessage from "@/components/ui/StateMessage";
import { HeroSearchModalProps } from "@/lib/types/hero";
import { useRouter } from "next/navigation";


export default function HeroSearchModal({
  open,
  isLoading,
  error,
  results,
  lastSearchTerm,
  onClose,
}: HeroSearchModalProps) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 px-4 py-8"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Search results
            </h3>
            {lastSearchTerm ? (
              <p className="text-xs text-slate-500">
                Showing results for "{lastSearchTerm}"
              </p>
            ) : (
              <p className="text-xs text-slate-500">Showing latest jobs</p>
            )}
          </div>
        </div>
        <div className="px-5 py-4 flex-1 overflow-y-auto">
          {isLoading ? (
            <StateMessage message="Loading jobs..." />
          ) : error ? (
            <StateMessage tone="error" message={error} />
          ) : results.length === 0 ? (
            <StateMessage message="No jobs found." />
          ) : (
            <ul className="space-y-3">
              {results.map((job) => (
                <li
                  key={job._id}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {job.company} • {job.location}
                      </p>
                      <p className="text-xs text-indigo-600">
                        {job.employment_type}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push(`/jobs/${job._id}`)}
                      className="shrink-0 rounded-md border border-indigo-200 px-3 py-1.5 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              router.push(
                `/jobs${
                  lastSearchTerm
                    ? `?searchTerm=${encodeURIComponent(lastSearchTerm)}`
                    : ""
                }`,
              )
            }
            className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            View all jobs
          </button>
        </div>
      </div>
    </div>
  );
}
