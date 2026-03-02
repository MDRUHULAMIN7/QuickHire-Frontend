"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import type { JobFormValues } from "@/lib/types/job";
import { EMPLOYMENT_TYPES, JOB_CATEGORIES } from "@/lib/utils/constants";

type JobFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialValues: JobFormValues;
  loading?: boolean;
  onSubmit: (values: JobFormValues) => void;
  onClose: () => void;
};

export default function JobFormModal({
  open,
  mode,
  initialValues,
  loading,
  onSubmit,
  onClose,
}: JobFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<JobFormValues>({
    defaultValues: initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    if (open) {
      trigger();
    }
  }, [open, trigger]);

  return (
    <Modal
      open={open}
      title={mode === "create" ? "Create job" : "Edit job"}
      description={
        mode === "create"
          ? "Publish a new job opening."
          : "Update job details."
      }
      onClose={onClose}
      maxWidthClassName="max-w-3xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-600">Title</label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" },
                setValueAs: (value) => value?.trim() ?? "",
              })}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              placeholder="Sr. Software Engineer"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Company
            </label>
            <input
              {...register("company", {
                required: "Company is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" },
                setValueAs: (value) => value?.trim() ?? "",
              })}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              placeholder="QuickHire"
            />
            {errors.company && (
              <p className="mt-1 text-xs text-red-600">
                {errors.company.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Location
            </label>
            <input
              {...register("location", {
                required: "Location is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" },
                setValueAs: (value) => value?.trim() ?? "",
              })}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              placeholder="Dhaka, Bangladesh"
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat.key} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Employment Type
            </label>
            <select
              {...register("employment_type", {
                required: "Employment type is required",
              })}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.employment_type && (
              <p className="mt-1 text-xs text-red-600">
                {errors.employment_type.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Company Logo URL
            </label>
            <input
              {...register("company_logo_url", {
                setValueAs: (value) => value?.trim() ?? "",
                validate: (value) => {
                  if (!value) return "Company logo URL is required";
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return "Enter a valid URL";
                  }
                },
              })}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              placeholder="https://..."
            />
            {errors.company_logo_url && (
              <p className="mt-1 text-xs text-red-600">
                {errors.company_logo_url.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              validate: (value) => {
                if (!value?.trim()) return "Description is required";
                if (value.trim().length < 10) return "Minimum 10 characters";
                return true;
              },
              setValueAs: (value) => value ?? "",
            })}
            rows={4}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            placeholder="Write a short summary of the role."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">
            Tags (comma separated)
          </label>
          <input
            {...register("tags", {
              setValueAs: (value) => value?.trim() ?? "",
              validate: (value) => {
                if (!value) return true;
                const tags = value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean);
                if (tags.length > 5) return "Maximum 5 tags";
                return true;
              },
            })}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            placeholder="React, TypeScript, Node.js"
          />
          {errors.tags && (
            <p className="mt-1 text-xs text-red-600">{errors.tags.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !isValid || isSubmitting}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading || isSubmitting
              ? "Saving..."
              : mode === "create"
                ? "Create job"
                : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
