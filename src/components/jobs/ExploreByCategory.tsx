"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getJobCategorySummary } from "@/lib/api/jobs";
import type { JobCategorySummary } from "@/lib/types/job";
import { JOB_CATEGORIES } from "@/lib/utils/constants";
import ExploreCategoryCard from "@/components/jobs/ExploreCategoryCard";
import { CATEGORY_ICONS, FEATURED_CATEGORY } from "@/lib/utils/job";
import { Briefcase } from "lucide-react";
import AllJobsLink from "@/components/ui/AllJobsLink";



export default function ExploreByCategory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobCategorySummary"],
    queryFn: () => getJobCategorySummary(),
    staleTime: 60_000,
  });
  const categories = useMemo(() => {
    const summary = data?.data ?? [];
    const map = new Map<string, JobCategorySummary>(
      summary.map((item) => [item.key, item]),
    );
    return JOB_CATEGORIES.map((category) => ({
      ...category,
      count: map.get(category.key)?.count ?? 0,
    }));
  }, [data?.data]);
  return (
    <section className="container-class">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-clash text-5xl font-semibold text-slate-900">
          Explore by <span className="text-[#26A4FF]">category</span>
        </h2>
        <AllJobsLink />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.key] ?? Briefcase;
          const isFeatured = category.key === FEATURED_CATEGORY;
          const count = category.count;

          return (
            <ExploreCategoryCard
              key={category.key}
              href={{ pathname: "/jobs", query: { category: category.name } }}
              name={category.name}
              count={count}
              Icon={Icon}
              isFeatured={isFeatured}
              isLoading={isLoading}
              isError={isError}
            />
          );
        })}
      </div>
    </section>
  );
}
