"use client";

import Image from "next/image";
import HeroSearch from "@/components/hero/HeroSearch";

export default function Hero() {
  return (
    <section
      className="relative h-180 overflow-hidden bg-[#F8F8FD] [clip-path:polygon(0%_0%,100%_0%,100%_100%,100%_100%,0%_100%,0%_0%)]
  md:[clip-path:polygon(0%_0%,100%_0%,100%_75%,80%_100%,0%_100%,0%_0%)]
  lg:[clip-path:polygon(0%_0%,100%_0%,100%_70%,78%_100%,0%_100%,0%_0%)]"
    >
      <div className="absolute inset-y-0 right-0 pointer-events-none select-none">
        <Image
          src="/images/hero/Pattern.png"
          alt="pattern"
          width={1264}
          height={768}
          className="h-full w-full "
          priority
        />
      </div>

      <div className="container-class h-full relative overflow-y-auto pr-2">
        <div className="relative max-w-2xl pt-16 md:pt-30 md:pb-18 ">
          <h1 className="font-clash text-6xl md:text-5xl xl:text-[80px] font-extrabold leading-tight text-gray-900">
            Discover
            <br /> more than
            <br />
            <span className="text-[#26A4FF] ">5000+ Jobs</span>
          </h1>
          <div className="-mt-1 mb-6">
            <Image
              src="/images/hero/Vector.png"
              alt=""
              width={455}
              height={133}
            />
          </div>
          <p className="font-epilogue text-gray-600 max-w-xl md:max-w-90 lg:max-w-xl text-xl">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
          <HeroSearch />
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Popular : UI Designer, UX Researcher, Android, Admin
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 hidden md:block md:w-[56%] lg:w-[52%] xl:w-[48%]  ">
        <Image
          src="/images/hero/hero_man.png"
          alt="Person"
          width={442}
          height={544}
          className="h-auto w-full md:max-w-110 xl:max-w-120 translate-x-6 lg:translate-x-20 xl:translate-x-26"
          priority
        />
      </div>
    </section>
  );
}
