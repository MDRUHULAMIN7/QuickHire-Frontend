"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";
import { getJobs } from "@/lib/api/jobs";
import type { JobSummary } from "@/lib/types/job";
import HeroSearchModal from "@/components/hero/HeroSearchModal";

export default function HeroSearch() {
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
    <>
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
              <option value="Rajshahi, Bangladesh">Rajshahi, Bangladesh</option>
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

      <HeroSearchModal
        open={isModalOpen}
        isLoading={isLoading}
        error={error}
        results={results}
        lastSearchTerm={lastSearchTerm}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
