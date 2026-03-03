"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getLatestJobs } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobDetail } from "@/lib/types/job";
import CardSkeleton from "@/components/ui/CardSkeleton";
import LatestJobCard from "@/components/jobs/LatestJobCard";
import StateMessage from "@/components/ui/StateMessage";
import AllJobsLink from "@/components/ui/AllJobsLink";

const DEFAULT_LIMIT = 8;

export default function LatestJobs() {
  const { data, isLoading } = useQuery<ApiResponse<JobDetail[]>>({
    queryKey: ["latestJobs"],
    queryFn: () => getLatestJobs(DEFAULT_LIMIT),
    staleTime: 60_000,
  });

  const jobs = data?.data ?? [];

  return (
    <section
      className="relative overflow-hidden bg-slate-50 mt-8
    [clip-path:polygon(7%_0%,100%_0%,100%_100%,100%_100%,0%_100%,0%_8%)]"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%] opacity-60">
        <Image
          src="/images/hero/Pattern.png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="60vw"
          priority={false}
        />
      </div>

      <div className="container-class py-14 pt-18 relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-clash text-3xl md:text-[48px] font-bold text-slate-900">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <AllJobsLink />
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
              <CardSkeleton key={`latest-skeleton-${index}`} variant="latest" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <StateMessage
            variant="card"
            message="No latest jobs available."
            className="mt-8"
          />
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <LatestJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
