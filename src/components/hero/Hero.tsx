import Image from "next/image";
import { Search, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
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

      <div className="container mx-auto px-4 h-full relative">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center gap-10 h-full">
          <div className="relative md:pb-28">
            <h1 className="font-clash text-6xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
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
            <p className="font-epilogue text-gray-600 max-w-xl text-xl">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            <div className="mt-8 md:mt-0 md:absolute md:bottom-6 md:left-0 md:w-180  xl:w-225 md:max-w-none rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.08)] bg-white md:z-20">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 ">
                  <Search className="text-gray-800" size={22} />
                  <input
                    placeholder="Job title or keyword"
                    className="flex-1 outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 px-4 py-3">
                  <MapPin className="text-gray-800" size={22} />
                  <select className="flex-1 outline-none bg-transparent text-gray-400">
                    <option>Florence, Italy</option>
                    <option>San Francisco, US</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div className="px-4 py-3">
                  <button className="w-full md:w-auto  bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700">
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
            <Image
              src="/images/hero/hero_man.png"
              alt="Person"
              width={542}
              height={744}
              className="max-w-full h-auto md:translate-x-8 lg:translate-x-16 xl:translate-x-24"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
