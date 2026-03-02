import JobDetailContainer from "@/components/jobs/JobDetailContainer";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobDetailContainer id={id} />;
}
