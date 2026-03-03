import clsx from "clsx";

type StateMessageProps = {
  message: string;
  variant?: "card" | "inline";
  tone?: "neutral" | "error";
  className?: string;
};

export default function StateMessage({
  message,
  variant = "inline",
  tone = "neutral",
  className,
}: StateMessageProps) {
  const base =
    variant === "card"
      ? "rounded-2xl border border-slate-200 bg-white p-6 text-sm"
      : "text-sm";
  const toneClass = tone === "error" ? "text-rose-500" : "text-slate-500";

  return <div className={clsx(base, toneClass, className)}>{message}</div>;
}
