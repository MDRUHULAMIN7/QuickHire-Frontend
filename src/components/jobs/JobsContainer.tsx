"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search } from "lucide-react";
import { getJobs } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobListResponse, JobSummary } from "@/lib/types/job";
import { buildJobQuery } from "@/lib/utils/adminJobs";
import { EMPLOYMENT_TYPES, JOB_CATEGORIES } from "@/lib/utils/constants";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import JobQuickViewModal from "@/components/jobs/JobQuickViewModal";

const LIMIT_OPTIONS = [6, 12, 24];

type JobCardProps = {
  job: JobSummary;
  onQuickView: (id: string) => void;
};

function JobCard({ job, onQuickView }: JobCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onQuickView(job._id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onQuickView(job._id);
        }
      }}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-indigo-600">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {job.company} • {job.location}
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {job.employment_type}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded-full border border-slate-200 px-2 py-1">
          {job.category}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="inline-flex items-center gap-2 font-semibold text-indigo-600">
          Quick view
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
        <Link
          href={`/jobs/${job._id}`}
          onClick={(event) => event.stopPropagation()}
          className="font-semibold text-slate-500 hover:text-indigo-600"
        >
          Open full page
        </Link>
      </div>
    </div>
  );
}

export default function JobsContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const readNumber = useCallback((value: string | null, fallback: number) => {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
    return fallback;
  }, []);

  const [page, setPage] = useState(() =>
    readNumber(searchParams.get("page"), 1),
  );
  const [limit, setLimit] = useState(() =>
    readNumber(searchParams.get("limit"), LIMIT_OPTIONS[0]),
  );
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("searchTerm") ?? "",
  );
  const [category, setCategory] = useState(
    () => searchParams.get("category") ?? "all",
  );
  const [employmentType, setEmploymentType] = useState(
    () => searchParams.get("employment_type") ?? "all",
  );
  const [previewId, setPreviewId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(searchTerm, 350);
  const hasMounted = useRef(false);

  useEffect(() => {
    const nextPage = readNumber(searchParams.get("page"), 1);
    const nextLimit = readNumber(
      searchParams.get("limit"),
      LIMIT_OPTIONS[0],
    );
    const nextSearch = searchParams.get("searchTerm") ?? "";
    const nextCategory = searchParams.get("category") ?? "all";
    const nextEmployment = searchParams.get("employment_type") ?? "all";

    setPage((prev) => (prev === nextPage ? prev : nextPage));
    setLimit((prev) => (prev === nextLimit ? prev : nextLimit));
    setSearchTerm((prev) => (prev === nextSearch ? prev : nextSearch));
    setCategory((prev) => (prev === nextCategory ? prev : nextCategory));
    setEmploymentType((prev) =>
      prev === nextEmployment ? prev : nextEmployment,
    );
  }, [readNumber, searchParams]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setPage(1);
  }, [debouncedSearch, category, employmentType, limit]);

  const urlQuery = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("searchTerm", debouncedSearch.trim());
    params.set("category", category);
    params.set("employment_type", employmentType);
    return params.toString();
  }, [page, limit, debouncedSearch, category, employmentType]);

  useEffect(() => {
    const current = searchParams.toString();
    if (current !== urlQuery) {
      router.replace(`${pathname}?${urlQuery}`, { scroll: false });
    }
  }, [pathname, router, searchParams, urlQuery]);

  const queryParams = useMemo(
    () =>
      buildJobQuery({
        page,
        limit,
        searchTerm: debouncedSearch,
        category,
        employment_type: employmentType,
      }),
    [page, limit, debouncedSearch, category, employmentType],
  );

  const { data, isLoading, isFetching } = useQuery<
    ApiResponse<JobListResponse["data"]>
  >({
    queryKey: ["publicJobs", page, limit, debouncedSearch, category, employmentType],
    queryFn: () => getJobs(queryParams),
    placeholderData: (prev) => prev,
  });

  const jobs = data?.data ?? [];
  const meta = data?.meta;

  const paginationInfo = useMemo(() => {
    if (!meta) {
      return { start: 0, end: 0, total: 0, totalPage: 1 };
    }
    const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
    const end = Math.min(meta.page * meta.limit, meta.total);
    return { start, end, total: meta.total, totalPage: meta.totalPage };
  }, [meta]);

  return (
    <section className="container-class py-18 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className=" text-slate-500">Find your next role</p>
          <h1 className="font-clash text-3xl font-bold text-slate-900">
            All Jobs
          </h1>
        </div>
        <Link
          href="/"
          className=" font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Back to home
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-55">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title, company, location"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="all">All categories</option>
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat.key} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={employmentType}
            onChange={(event) => setEmploymentType(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="all">All types</option>
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm"
          >
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          No jobs found.
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onQuickView={(id) => setPreviewId(id)}
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span>
          Showing {paginationInfo.start}-{paginationInfo.end} of{" "}
          {paginationInfo.total}
          {isFetching && " • Updating..."}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={!meta || meta.page <= 1}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs font-semibold text-slate-600">
            Page {meta?.page ?? 1} of {paginationInfo.totalPage}
          </span>
          <button
            type="button"
            onClick={() =>
              setPage((prev) =>
                meta ? Math.min(meta.totalPage, prev + 1) : prev,
              )
            }
            disabled={!meta || meta.page >= meta.totalPage}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <JobQuickViewModal
        open={Boolean(previewId)}
        jobId={previewId}
        onClose={() => setPreviewId(null)}
      />
    </section>
  );
}
