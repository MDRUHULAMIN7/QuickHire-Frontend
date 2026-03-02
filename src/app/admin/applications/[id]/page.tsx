"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ApplicationDetailsPanel from "@/components/admin/applications/ApplicationDetailsPanel";

export default function AdminApplicationDetailsPage() {
  const params = useParams();
  const applicationId = params?.id as string;

  return (
    <section className="space-y-4">
      <Link
        href="/admin/applications"
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
      >
        Back to applications
      </Link>
      <ApplicationDetailsPanel applicationId={applicationId} />
    </section>
  );
}
