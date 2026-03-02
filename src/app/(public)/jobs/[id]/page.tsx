export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Job Detail #{params.id}</h1>
    </section>
  );
}
