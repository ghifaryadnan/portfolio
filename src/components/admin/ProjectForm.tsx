export default function ProjectForm() {
  return (
    <form className="space-y-4">
      <input className="border px-3 py-2 rounded w-full" placeholder="Nama Project" />
      <textarea className="border px-3 py-2 rounded w-full" placeholder="Deskripsi" />
      <button className="bg-black text-white px-4 py-2 rounded">Simpan</button>
    </form>
  );
}
