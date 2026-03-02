"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import clsx from "clsx";
import { getFeaturedJobs } from "@/lib/api/jobs";
import type { ApiResponse } from "@/lib/types/api";
import type { JobDetail } from "@/lib/types/job";

const DEFAULT_LIMIT = 8;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function truncate(text: string, max = 90) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function FeaturedSkeletonCard() {
  return (
    <div className="h-72 border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-slate-100" />
        <div className="h-6 w-20 rounded-full bg-slate-100" />
      </div>
      <div className="mt-6 h-5 w-3/4 rounded bg-slate-100" />
      <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />
      <div className="mt-4 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
      <div className="mt-6 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-slate-100" />
        <div className="h-6 w-16 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

export default function FeaturedJobs() {
  const { data, isLoading } = useQuery<ApiResponse<JobDetail[]>>({
    queryKey: ["featuredJobs"],
    queryFn: () => getFeaturedJobs(DEFAULT_LIMIT),
    staleTime: 60_000,
  });

  const jobs = data?.data ?? [];

  const cards = jobs.map((job) => {
    const tags = job.tags?.slice(0, 2) ?? [];

    return (
      <Link
        key={job._id}
        href={`/jobs/${job._id}`}
        className="group flex h-full flex-col border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
            {job.company_logo_url ? (
              job.company_logo_url.startsWith("/") ? (
                <Image
                  src={job.company_logo_url}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={job.company_logo_url}
                  alt={job.company}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )
            ) : (
              getInitials(job.company)
            )}
          </div>
          <span className="border border-indigo-200 px-3 py-2 text-xs font-semibold text-indigo-600">
            {job.employment_type}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
          {job.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {job.company} - {job.location}
        </p>
        <p className="mt-4 text-sm text-slate-500">
          {truncate(job.description)}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={`${job._id}-${tag}`}
                className={clsx(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  tag.toLowerCase().includes("design")
                    ? "bg-emerald-50 text-emerald-600"
                    : tag.toLowerCase().includes("marketing")
                      ? "bg-amber-50 text-amber-600"
                      : tag.toLowerCase().includes("business")
                        ? "bg-indigo-50 text-indigo-600"
                        : "bg-slate-100 text-slate-600",
                )}
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {job.category}
            </span>
          )}
        </div>
      </Link>
    );
  });

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-clash text-3xl md:text-[48px] font-bold text-slate-900">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Show all jobs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
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
              {Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={`featured-skeleton-mobile-${index}`}>
                  <FeaturedSkeletonCard />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
              <FeaturedSkeletonCard key={`featured-skeleton-${index}`} />
            ))}
          </div>
        </>
      ) : jobs.length === 0 ? (
        <div className="mt-8 border border-slate-200 bg-white p-6 text-sm text-slate-500">
          No featured jobs available.
        </div>
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
              {cards.map((card) => (
                <SwiperSlide key={(card as any).key}>{card}</SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {cards}
          </div>
        </>
      )}
    </section>
  );
}
