interface Params {
  params: { id: string };
}

export default function AdminEditProjectPage({ params }: Params) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Edit Project: {params.id}</h2>
    </div>
  );
}
