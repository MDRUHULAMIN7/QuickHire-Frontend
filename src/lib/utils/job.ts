
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Code2,
  Megaphone,
  Monitor,
  PenTool,
  Users,
  Wallet,
} from "lucide-react";
export const CATEGORY_ICONS = {
  design: PenTool,
  sales: BarChart3,
  marketing: Megaphone,
  finance: Wallet,
  technology: Monitor,
  engineering: Code2,
  business: Briefcase,
  hr: Users,
} as const;

export const FEATURED_CATEGORY = "marketing";