"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardSkeleton from "@/components/ui/CardSkeleton";

type FeaturedJobsLoadingProps = {
  limit: number;
};

export default function FeaturedJobsLoading({ limit }: FeaturedJobsLoadingProps) {
  return (
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
              <CardSkeleton variant="featured" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: limit }).map((_, index) => (
          <CardSkeleton key={`featured-skeleton-${index}`} variant="featured" />
        ))}
      </div>
    </>
  );
}
