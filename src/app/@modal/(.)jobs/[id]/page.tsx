"use client";

export default function JobModal({ params }: { params: { id: string } }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl">
        <h3 className="text-lg font-semibold">Quick Preview #{params.id}</h3>
        <p className="mt-2 text-sm text-gray-600">Intercepted modal route.</p>
      </div>
    </div>
  );
}
