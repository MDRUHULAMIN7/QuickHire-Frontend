import Image from "next/image";
import { Search, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-[800px]">
      <div className="absolute inset-y-0 right-0 pointer-events-none select-none">
        <Image
          src="/images/hero/Pattern.png"
          alt="pattern"
          width={964}
          height={768}
          className="h-full w-auto "
          priority
        />
      </div>

      <div className="container mx-auto px-4 h-full relative">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 h-full">
          <div>
            <h1 className="font-clash text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Discover
              <br /> more than
              <br />
              <span className="text-indigo-600">5000+ Jobs</span>
            </h1>
            <div className="-mt-1 mb-6">
              <Image
                src="/images/hero/underline.svg"
                alt=""
                width={455}
                height={33}
              />
            </div>
            <p className="font-epilogue text-gray-600 max-w-xl">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            <div className="mt-8 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.08)] bg-white">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r">
                  <Search className="text-gray-500" size={18} />
                  <input
                    placeholder="Job title or keyword"
                    className="flex-1 outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r">
                  <MapPin className="text-gray-500" size={18} />
                  <select className="flex-1 outline-none bg-transparent">
                    <option>Florence, Italy</option>
                    <option>San Francisco, US</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div className="px-4 py-3">
                  <button className="w-full md:w-auto rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700">
                    Search my job
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Popular : UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -left-20 top-10 -z-10">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="58"
                  stroke="#D0D7FF"
                  strokeWidth="4"
                  strokeDasharray="6 10"
                />
              </svg>
            </div>
            <Image
              src="/images/hero/hero_man.png"
              alt="Person"
              width={542}
              height={744}
              className="max-w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
