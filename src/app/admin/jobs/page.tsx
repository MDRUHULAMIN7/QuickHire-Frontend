"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type {
  JobDetail,
  JobFormValues,
  JobListResponse,
  JobPayload,
  JobSummary,
} from "@/lib/types/job";
import { EMPLOYMENT_TYPES, JOB_CATEGORIES } from "@/lib/utils/constants";
import {
  buildJobQuery,
  DEFAULT_JOB_FORM_VALUES,
  mapFormToPayload,
  mapJobToFormValues,
} from "@/lib/utils/adminJobs";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import JobsTable from "@/components/admin/jobs/JobsTable";
import JobFormModal from "@/components/admin/jobs/JobFormModal";
import ConfirmModal from "@/components/admin/jobs/ConfirmModal";

const LIMIT_OPTIONS = [5, 10, 20, 30];

export default function AdminJobsPage() {
  const queryClient = useQueryClient();
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
    readNumber(searchParams.get("limit"), 10),
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

  const [createOpen, setCreateOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<JobSummary | null>(null);

  const debouncedSearch = useDebouncedValue(searchTerm, 350);
  const hasMounted = useRef(false);

  useEffect(() => {
    const nextPage = readNumber(searchParams.get("page"), 1);
    const nextLimit = readNumber(searchParams.get("limit"), 10);
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
    queryKey: ["adminJobs", page, limit, debouncedSearch, category, employmentType],
    queryFn: () => getJobs(queryParams),
    placeholderData: (prev) => prev,
  });

  const jobs = data?.data ?? [];
  const meta = data?.meta;

  const editQuery = useQuery<ApiResponse<JobDetail>>({
    queryKey: ["adminJob", editId],
    queryFn: () => getJob(editId as string),
    enabled: Boolean(editId),
  });

  const createMutation = useMutation({
    mutationFn: (payload: JobPayload) => createJob(payload),
    onSuccess: () => {
      toast.success("Job created");
      setCreateOpen(false);
      setPage(1);
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create job");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: JobPayload }) =>
      updateJob(id, payload),
    onSuccess: () => {
      toast.success("Job updated");
      setEditId(null);
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update job");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      toast.success("Job deleted");
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete job");
    },
  });

  const handleCreateSubmit = useCallback(
    (values: JobFormValues) => {
      createMutation.mutate(mapFormToPayload(values));
    },
    [createMutation],
  );

  const handleEditSubmit = useCallback(
    (values: JobFormValues) => {
      if (!editId) return;
      updateMutation.mutate({ id: editId, payload: mapFormToPayload(values) });
    },
    [editId, updateMutation],
  );

  const paginationInfo = useMemo(() => {
    if (!meta) {
      return { start: 0, end: 0, total: 0, totalPage: 1 };
    }
    const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
    const end = Math.min(meta.page * meta.limit, meta.total);
    return { start, end, total: meta.total, totalPage: meta.totalPage };
  }, [meta]);

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget._id);
  }, [deleteMutation, deleteTarget]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Jobs</h1>
          <p className="text-sm text-slate-500">
            Manage job listings and track hiring pipelines.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
        >
          <Plus size={14} />
          Create job
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search title, company, location"
            className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-indigo-400 focus:outline-none"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
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
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
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
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
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
        <JobsTable
          jobs={jobs}
          onEdit={(id) => setEditId(id)}
          onDelete={(job) => setDeleteTarget(job)}
        />
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

      <JobFormModal
        open={createOpen}
        mode="create"
        initialValues={DEFAULT_JOB_FORM_VALUES}
        loading={createMutation.isPending}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <JobFormModal
        open={Boolean(editId)}
        mode="edit"
        initialValues={
          editQuery.data?.data
            ? mapJobToFormValues(editQuery.data.data)
            : DEFAULT_JOB_FORM_VALUES
        }
        loading={updateMutation.isPending || editQuery.isLoading}
        onClose={() => setEditId(null)}
        onSubmit={handleEditSubmit}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete job?"
        description={
          deleteTarget
            ? `This will permanently delete "${deleteTarget.title}".`
            : undefined
        }
        confirmLabel="Delete job"
        loading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </section>
  );
}

