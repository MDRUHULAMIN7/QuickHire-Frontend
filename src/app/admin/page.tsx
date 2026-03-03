import AdminOverview from "@/components/admin/AdminOverview";

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Overview of jobs, applications, and team activity.
        </p>
      </div>
      <AdminOverview />
    </section>
  );
}
