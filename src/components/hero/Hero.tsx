"use client";

import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { getJobs } from "@/lib/api/jobs";
import type { JobSummary } from "@/lib/types/job";

export default function Hero() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<JobSummary[]>([]);
  const [error, setError] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  useEffect(() => {
    const handlePageShow = () => {
      if (sessionStorage.getItem("qh_hero_reset") === "1") {
        setKeyword("");
        setLocation("");
        sessionStorage.removeItem("qh_hero_reset");
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevBodyOverflow || "";
      document.documentElement.style.overflow = prevHtmlOverflow || "";
    }
    return () => {
      document.body.style.overflow = prevBodyOverflow || "";
      document.documentElement.style.overflow = prevHtmlOverflow || "";
    };
  }, [isModalOpen]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keywordValue = keyword.trim();
    const locationValue = location.trim();
    const searchTerm = keywordValue;
    const displayTerm = [keywordValue, locationValue]
      .filter(Boolean)
      .join(" • ");
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    }
    setLastSearchTerm(displayTerm);
    setIsModalOpen(true);
    setIsLoading(true);
    setError("");
    try {
      const res = await getJobs({
        searchTerm,
        location: locationValue || undefined,
        page: 1,
        limit: 6,
        sort: "-createdAt",
        fields: "title,company,location,employment_type,category",
      });
      setResults(res.data ?? []);
    } catch (err: any) {
      setResults([]);
      setError(err?.response?.data?.message || "Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#F8F8FD] md:min-h-180 [clip-path:polygon(0%_0%,100%_0%,100%_100%,100%_100%,0%_100%,0%_0%)]
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

      <div className="container-class h-full relative">
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

          <form
            onSubmit={handleSearch}
            className="mt-12 md:mt-0 md:absolute md:-bottom-2 md:left-0 md:w-180  xl:w-245 md:max-w-none rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.08)] bg-white md:z-20"
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 ">
                <Search className="text-gray-800" size={22} />
                <input
                  name="keyword"
                  placeholder="Job title or keyword"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  className="flex-1 outline-none placeholder:text-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-3">
                <MapPin className="text-gray-800" size={22} />
                <select
                  name="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="flex-1 outline-none bg-transparent text-gray-400"
                >
                  <option value="">Select location</option>
                  <option value="Dhaka, Bangladesh">Dhaka, Bangladesh</option>
                  <option value="Rajshahi, Bangladesh">
                    Rajshahi, Bangladesh
                  </option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="px-4 py-3">
                <button
                  type="submit"
                  className="w-full md:w-auto  bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
                >
                  Search my job
                </button>
              </div>
            </div>
          </form>
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 px-4 py-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Search results
                </h3>
                {lastSearchTerm ? (
                  <p className="text-xs text-slate-500">
                    Showing results for "{lastSearchTerm}"
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">Showing latest jobs</p>
                )}
              </div>
            </div>
            <div className="px-5 py-4">
              {isLoading ? (
                <div className="text-sm text-slate-500">Loading jobs...</div>
              ) : error ? (
                <div className="text-sm text-rose-500">{error}</div>
              ) : results.length === 0 ? (
                <div className="text-sm text-slate-500">No jobs found.</div>
              ) : (
                <ul className="space-y-3">
                  {results.map((job) => (
                    <li
                      key={job._id}
                      className="rounded-xl border border-slate-200 px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {job.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {job.company} • {job.location}
                          </p>
                          <p className="text-xs text-indigo-600">
                            {job.employment_type}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => router.push(`/jobs/${job._id}`)}
                          className="shrink-0 rounded-md border border-indigo-200 px-3 py-1.5 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50"
                        >
                          Details
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/jobs${
                      lastSearchTerm
                        ? `?searchTerm=${encodeURIComponent(lastSearchTerm)}`
                        : ""
                    }`,
                  )
                }
                className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                View all jobs
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
