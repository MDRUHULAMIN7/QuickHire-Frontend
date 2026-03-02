"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import JobDetailsPanel from "@/components/admin/jobs/JobDetailsPanel";

export default function AdminJobDetailsPage() {
  const params = useParams();
  const jobId = params?.id as string;

  return (
    <section className="space-y-4">
      <Link
        href="/admin/jobs"
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
      >
        Back to jobs
      </Link>
      <JobDetailsPanel jobId={jobId} />
    </section>
  );
}
