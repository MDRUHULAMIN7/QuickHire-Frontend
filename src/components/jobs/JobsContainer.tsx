"use client";

export default function JobsContainer({
  initialQuery,
}: {
  initialQuery: Record<string, unknown>;
}) {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold">Jobs</h2>
      <pre className="mt-4 bg-gray-50 p-3 rounded text-xs">
        {JSON.stringify(initialQuery, null, 2)}
      </pre>
    </section>
  );
}
