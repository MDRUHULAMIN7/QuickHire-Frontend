"use client";

import clsx from "clsx";

type CardSkeletonProps = {
  variant?: "featured" | "latest";
  className?: string;
};

export default function CardSkeleton({
  variant = "featured",
  className,
}: CardSkeletonProps) {
  if (variant === "latest") {
    return (
      <div
        className={clsx(
          "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
          className,
        )}
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-100" />
          <div className="flex-1">
            <div className="h-4 w-1/2 rounded bg-slate-100" />
            <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-slate-100" />
          <div className="h-6 w-16 rounded-full bg-slate-100" />
          <div className="h-6 w-16 rounded-full bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "h-72 border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-slate-100" />
        <div className="h-6 w-20 rounded-full bg-slate-100" />
      </div>
      <div className="mt-6 h-5 w-3/4 rounded bg-slate-100" />
      <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />
      <div className="mt-4 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
      <div className="mt-6 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-slate-100" />
        <div className="h-6 w-16 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}
