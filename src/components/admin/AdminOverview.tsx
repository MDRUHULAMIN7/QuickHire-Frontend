"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { getJobs, getJobCategorySummary } from "@/lib/api/jobs";
import { getApplications } from "@/lib/api/applications";
import type { JobCategorySummary } from "@/lib/types/job";
import StateMessage from "@/components/ui/StateMessage";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const STATUS_ORDER = ["pending", "reviewed", "shortlisted", "rejected"] as const;
const STATUS_LABELS: Record<(typeof STATUS_ORDER)[number], string> = {
  pending: "Pending",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

const STATUS_COLORS = ["#F59E0B", "#3B82F6", "#22C55E", "#EF4444"];
const CATEGORY_COLORS = [
  "#60A5FA",
  "#A78BFA",
  "#F59E0B",
  "#22C55E",
  "#F97316",
  "#38BDF8",
  "#F43F5E",
  "#14B8A6",
];

type OverviewData = {
  totalJobs: number;
  totalApplications: number;
  statusCounts: Record<(typeof STATUS_ORDER)[number], number>;
  categories: JobCategorySummary[];
};

function StatCard({
  label,
  value,
  accentClass,
}: {
  label: string;
  value: number;
  accentClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${accentClass}`}>{value}</p>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`admin-overview-skeleton-${index}`}
          className="h-24 rounded-2xl border border-slate-200 bg-white p-5 animate-pulse"
        >
          <div className="h-3 w-20 rounded bg-slate-100" />
          <div className="mt-3 h-6 w-16 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function AdminOverview() {
  const { data, isLoading, isError } = useQuery<OverviewData>({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const [jobsRes, appsRes, categoriesRes, ...statusRes] =
        await Promise.all([
          getJobs({ page: 1, limit: 1 }),
          getApplications({ page: 1, limit: 1 }),
          getJobCategorySummary(),
          ...STATUS_ORDER.map((status) =>
            getApplications({ page: 1, limit: 1, status }),
          ),
        ]);

      const statusCounts = STATUS_ORDER.reduce(
        (acc, status, index) => {
          acc[status] = statusRes[index]?.meta?.total ?? 0;
          return acc;
        },
        {} as Record<(typeof STATUS_ORDER)[number], number>,
      );

      return {
        totalJobs: jobsRes.meta?.total ?? 0,
        totalApplications: appsRes.meta?.total ?? 0,
        statusCounts,
        categories: categoriesRes.data ?? [],
      };
    },
    staleTime: 60_000,
  });

  const statusData = useMemo(() => {
    const counts = data?.statusCounts ?? {
      pending: 0,
      reviewed: 0,
      shortlisted: 0,
      rejected: 0,
    };

    return {
      labels: STATUS_ORDER.map((status) => STATUS_LABELS[status]),
      datasets: [
        {
          data: STATUS_ORDER.map((status) => counts[status]),
          backgroundColor: STATUS_COLORS,
          borderWidth: 0,
        },
      ],
    };
  }, [data?.statusCounts]);

  const categoryData = useMemo(() => {
    const categories = data?.categories ?? [];
    return {
      labels: categories.map((item) => item.name),
      datasets: [
        {
          label: "Jobs",
          data: categories.map((item) => item.count),
          backgroundColor: categories.map(
            (_, index) => CATEGORY_COLORS[index % CATEGORY_COLORS.length],
          ),
          borderRadius: 8,
        },
      ],
    };
  }, [data?.categories]);

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (isError || !data) {
    return (
      <StateMessage
        variant="card"
        tone="error"
        message="Failed to load overview data."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total jobs"
          value={data.totalJobs}
          accentClass="text-slate-900"
        />
        <StatCard
          label="Total applications"
          value={data.totalApplications}
          accentClass="text-indigo-600"
        />
        <StatCard
          label="Pending applications"
          value={data.statusCounts.pending}
          accentClass="text-amber-600"
        />
        <StatCard
          label="Shortlisted"
          value={data.statusCounts.shortlisted}
          accentClass="text-emerald-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Applications by status
          </h3>
          <div className="mt-4 h-56 w-full md:h-64 lg:h-72">
            <Doughnut
              data={statusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 100,
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Jobs by category
          </h3>
          <div className="mt-4 h-56 w-full md:h-64 lg:h-72">
            <Bar
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 100,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false } },
                  y: { ticks: { precision: 0 } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
