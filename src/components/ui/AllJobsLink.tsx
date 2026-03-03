"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type AllJobsLinkProps = {
  label?: string;
  href?: string;
  className?: string;
};

export default function AllJobsLink({
  label = "Show all jobs",
  href = "/jobs",
  className,
}: AllJobsLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700",
        className,
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
