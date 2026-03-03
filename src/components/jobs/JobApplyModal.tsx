"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { createApplication } from "@/lib/api/applications";
import type { ApplicationPayload } from "@/lib/types/application";

type JobApplyModalProps = {
  open: boolean;
  jobId: string;
  jobTitle: string;
  company: string;
  onClose: () => void;
};

type FormValues = Omit<ApplicationPayload, "job">;

export default function JobApplyModal({
  open,
  jobId,
  jobTitle,
  company,
  onClose,
}: JobApplyModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      resumeLink: "",
      coverNote: "",
    },
  });

  const [serverError, setServerError] = useState("");

  const mutation = useMutation({
    mutationFn: (payload: ApplicationPayload) => createApplication(payload),
    onSuccess: () => {
      toast.success("Application submitted");
      setServerError("");
      reset();
      onClose();
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || "Failed to submit";
      setServerError(message);
      toast.error(message);
    },
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const onSubmit = (values: FormValues) => {
    mutation.mutate({ ...values, job: jobId });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            Apply for {jobTitle}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{company}</p>
        </div>
        {serverError && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-600">
              Full name
              <input
                {...register("name", { required: "Name is required" })}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="Your name"
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.name.message}
                </span>
              )}
            </label>
            <label className="text-sm font-semibold text-slate-600">
              Email
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>

          <label className="text-sm font-semibold text-slate-600">
            Resume link
            <input
              {...register("resumeLink", {
                required: "Resume link is required",
                pattern: {
                  value: /^https?:\/\//i,
                  message: "URL must start with http/https",
                },
              })}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-indigo-400 focus:outline-none"
              placeholder="https://drive.google.com/..."
            />
            {errors.resumeLink && (
              <span className="mt-1 block text-xs text-rose-500">
                {errors.resumeLink.message}
              </span>
            )}
          </label>

          <label className="text-sm font-semibold text-slate-600">
            Cover note
            <textarea
              {...register("coverNote", {
                required: "Cover note is required",
                minLength: {
                  value: 50,
                  message: "Cover note must be at least 50 characters",
                },
              })}
              rows={5}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
              placeholder="Why are you a great fit?"
            />
            {errors.coverNote && (
              <span className="mt-1 block text-xs text-rose-500">
                {errors.coverNote.message}
              </span>
            )}
          </label>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {mutation.isPending ? "Submitting..." : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
