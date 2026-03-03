"use client";

import { useQuery } from "@tanstack/react-query";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { getFeaturedJobs } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobDetail } from "@/lib/types/job";
import FeaturedJobCard from "@/components/jobs/FeaturedJobCard";
import FeaturedJobsLoading from "@/components/jobs/FeaturedJobsLoading";
import StateMessage from "@/components/ui/StateMessage";
import AllJobsLink from "@/components/ui/AllJobsLink";

const DEFAULT_LIMIT = 8;

export default function FeaturedJobs() {
  const { data, isLoading } = useQuery<ApiResponse<JobDetail[]>>({
    queryKey: ["featuredJobs"],
    queryFn: () => getFeaturedJobs(DEFAULT_LIMIT),
    staleTime: 60_000,
  });

  const jobs = data?.data ?? [];

  return (
    <section className="container-class">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-clash text-3xl md:text-[48px] font-bold text-slate-900">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>
        <AllJobsLink />
      </div>

      {isLoading ? (
        <FeaturedJobsLoading limit={DEFAULT_LIMIT} />
      ) : jobs.length === 0 ? (
        <StateMessage
          variant="card"
          message="No featured jobs available."
          className="mt-8"
        />
      ) : (
        <>
          <div className="mt-8 sm:hidden">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1.1}
              className="featured-swiper"
              breakpoints={{
                480: { slidesPerView: 1.2 },
                640: { slidesPerView: 1.6 },
              }}
            >
              {jobs.map((job) => (
                <SwiperSlide key={job._id}>
                  <FeaturedJobCard job={job} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => (
              <FeaturedJobCard key={job._id} job={job} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
