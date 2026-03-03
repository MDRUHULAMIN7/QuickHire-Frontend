import type { JobSummary } from "@/lib/types/job";

export type HeroSearchModalProps = {
  open: boolean;
  isLoading: boolean;
  error: string;
  results: JobSummary[];
  lastSearchTerm: string;
  onClose: () => void;
};