'use cache';
import Hero from "@/components/hero/Hero";
import CompaniesBar from "@/components/company/CompaniesBar";
import ExploreByCategory from "@/components/jobs/ExploreByCategory";
import FeaturedJobs from "@/components/jobs/FeaturedJobs";
import LatestJobs from "@/components/jobs/LatestJobs";
import CTAPage from "./CTA/page";

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <CompaniesBar />
      <ExploreByCategory />
      <CTAPage/>
      <FeaturedJobs />
      <LatestJobs />
    </>
  );
}
