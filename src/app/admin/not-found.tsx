import Link from "next/link";

export default function AdminNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Admin
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        The admin page you are looking for does not exist yet or was moved.
      </p>
      <Link
        href="/admin"
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
      >
        Back to dashboard
      </Link>
    </section>
  );
}
