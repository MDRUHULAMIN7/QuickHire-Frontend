"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getApplications, updateApplicationStatus } from "@/lib/api/applications";
import type { ApiResponse } from "@/lib/types/api";
import type {
  ApplicationDetail,
  ApplicationListResponse,
  ApplicationStatus,
} from "@/lib/types/application";
import { buildApplicationQuery, APPLICATION_STATUSES } from "@/lib/utils/adminApplications";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import ApplicationsTable from "@/components/admin/applications/ApplicationsTable";

const LIMIT_OPTIONS = [5, 10, 20, 30];

export default function AdminApplicationsPage() {
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
  const [status, setStatus] = useState(
    () => (searchParams.get("status") as ApplicationStatus | "all") ?? "all",
  );

  const debouncedSearch = useDebouncedValue(searchTerm, 350);
  const hasMounted = useRef(false);

  useEffect(() => {
    const nextPage = readNumber(searchParams.get("page"), 1);
    const nextLimit = readNumber(searchParams.get("limit"), 10);
    const nextSearch = searchParams.get("searchTerm") ?? "";
    const nextStatus =
      (searchParams.get("status") as ApplicationStatus | "all") ?? "all";

    setPage((prev) => (prev === nextPage ? prev : nextPage));
    setLimit((prev) => (prev === nextLimit ? prev : nextLimit));
    setSearchTerm((prev) => (prev === nextSearch ? prev : nextSearch));
    setStatus((prev) => (prev === nextStatus ? prev : nextStatus));
  }, [readNumber, searchParams]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setPage(1);
  }, [debouncedSearch, status, limit]);

  const urlQuery = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("searchTerm", debouncedSearch.trim());
    params.set("status", status);
    return params.toString();
  }, [page, limit, debouncedSearch, status]);

  useEffect(() => {
    const current = searchParams.toString();
    if (current !== urlQuery) {
      router.replace(`${pathname}?${urlQuery}`, { scroll: false });
    }
  }, [pathname, router, searchParams, urlQuery]);

  const queryParams = useMemo(
    () =>
      buildApplicationQuery({
        page,
        limit,
        searchTerm: debouncedSearch,
        status,
      }),
    [page, limit, debouncedSearch, status],
  );

  const { data, isLoading, isFetching } = useQuery<
    ApiResponse<ApplicationListResponse["data"]>
  >({
    queryKey: ["adminApplications", page, limit, debouncedSearch, status],
    queryFn: () => getApplications(queryParams),
    placeholderData: (prev) => prev,
  });

  const apps = data?.data ?? [];
  const meta = data?.meta;

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["adminApplications"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update status");
    },
  });

  const paginationInfo = useMemo(() => {
    if (!meta) {
      return { start: 0, end: 0, total: 0, totalPage: 1 };
    }
    const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
    const end = Math.min(meta.page * meta.limit, meta.total);
    return { start, end, total: meta.total, totalPage: meta.totalPage };
  }, [meta]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Applications</h1>
        <p className="text-sm text-slate-500">
          Review and manage candidate applications.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search name, email, status"
            className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-indigo-400 focus:outline-none"
          />
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ApplicationStatus | "all")
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="all">All status</option>
            {APPLICATION_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
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
          Loading applications...
        </div>
      ) : apps.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          No applications found.
        </div>
      ) : (
        <ApplicationsTable
          applications={apps}
          onStatusChange={(id, nextStatus) =>
            updateMutation.mutate({ id, status: nextStatus })
          }
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
    </section>
  );
}
