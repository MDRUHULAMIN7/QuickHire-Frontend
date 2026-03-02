'use cache';
import Hero from '@/components/hero/Hero';
import CompaniesBar from '@/components/company/CompaniesBar';

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <CompaniesBar />
    </>
  );
}
