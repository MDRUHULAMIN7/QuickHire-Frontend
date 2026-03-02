"use client";

export default function PublicError({ error }: { error: Error }) {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <pre className="mt-2 text-sm text-red-600">{error.message}</pre>
    </div>
  );
}
