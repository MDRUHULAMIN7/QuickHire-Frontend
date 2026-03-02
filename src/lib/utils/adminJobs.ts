import type { JobDetail, JobFormValues, JobPayload, JobQueryParams } from "../types/job";

export const JOB_TABLE_FIELDS =
  "title,company,location,category,employment_type,createdAt";

export const DEFAULT_JOB_FORM_VALUES: JobFormValues = {
  title: "Sr. Software Engineer",
  company: "QuickHire",
  location: "Dhaka, Bangladesh",
  category: "Engineering",
  employment_type: "Full Time",
  description:
    "We are looking for a Sr. Software Engineer to build scalable hiring workflows.",
  tags: "TypeScript, React, Node.js",
  company_logo_url: "",
};

export function buildJobQuery(params: JobQueryParams) {
  return {
    ...params,
    searchTerm: params.searchTerm?.trim() || undefined,
    category: params.category === "all" ? undefined : params.category,
    employment_type:
      params.employment_type === "all" ? undefined : params.employment_type,
    fields: params.fields || JOB_TABLE_FIELDS,
    sort: params.sort || "-createdAt",
  };
}

export function mapJobToFormValues(job: JobDetail): JobFormValues {
  return {
    title: job.title,
    company: job.company,
    location: job.location,
    category: job.category,
    employment_type: job.employment_type,
    description: job.description,
    tags: job.tags?.join(", ") ?? "",
    company_logo_url: job.company_logo_url ?? "",
  };
}

export function mapFormToPayload(values: JobFormValues): JobPayload {
  const tags = values.tags
    ? values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : undefined;

  return {
    title: values.title.trim(),
    company: values.company.trim(),
    location: values.location.trim(),
    category: values.category,
    employment_type: values.employment_type,
    description: values.description.trim(),
    tags,
    company_logo_url: values.company_logo_url?.trim() || "",
  };
}
