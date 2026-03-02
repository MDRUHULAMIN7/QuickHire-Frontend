import JobsContainer from '@/components/jobs/JobsContainer';

export default function JobsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  return <JobsContainer initialQuery={searchParams ?? {}} />;
}
