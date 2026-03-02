'use cache';
import Hero from "@/components/hero/Hero";
import CompaniesBar from "@/components/company/CompaniesBar";
import ExploreByCategory from "@/components/jobs/ExploreByCategory";
import CTAPage from "./CTA/page";

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <CompaniesBar />
      <ExploreByCategory />
      <CTAPage/>
    </>
  );
}
