interface Params {
  params: { slug: string };
}

export default function ProjectDetailPage({ params }: Params) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Project: {params.slug}</h2>
    </div>
  );
}
