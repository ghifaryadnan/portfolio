 "use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUpdateSkill, type Skill } from "@/services/skills.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusModal } from "@/components/ui/status-modal";
import { TableContainer, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@/components/ui/table";
import { useState } from "react";

export default function SkillsTable({
  skills,
  categories,
  onRequestDelete,
}: {
  skills: Skill[];
  categories: string[];
  onRequestDelete: (id: string) => void;
}) {
  const qc = useQueryClient();
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [statusDescription, setStatusDescription] = useState<string | undefined>(undefined);
  const updateMut = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; category?: string } }) =>
      adminUpdateSkill(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-skills"] });
      setStatusType("success");
      setStatusDescription("Skill berhasil diperbarui");
      setStatusOpen(true);
    },
    onError: (error: unknown) => {
      setStatusType("error");
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message ?? "Terjadi kesalahan")
          : "Terjadi kesalahan";
      setStatusDescription(message);
      setStatusOpen(true);
    },
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState(categories[0]);

  function startEdit(s: Skill) {
    setEditingId(s.id);
    setEditName(s.name ?? "");
    setEditCategory(s.category ?? categories[0]);
  }
  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditCategory(categories[0]);
  }
  function submitEdit() {
    if (!editingId) return;
    updateMut.mutate({ id: editingId, payload: { name: editName, category: editCategory } });
    cancelEdit();
  }

  return (
    <>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Skill</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell align="center">Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skills.map((s) => (
            <TableRow key={s.id}>
              {editingId === s.id ? (
                <>
                  <TableCell>
                    <Input
                      placeholder="Nama"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <select
                      className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" onClick={submitEdit} disabled={updateMut.isPending}>
                        {updateMut.isPending ? "Memproses..." : "Simpan"}
                      </Button>
                      <Button variant="ghost" onClick={cancelEdit}>
                        Batal
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-zinc-500">{s.category}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Button variant="outline" onClick={() => startEdit(s)}>
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => onRequestDelete(s.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <StatusModal
      open={statusOpen}
      type={statusType}
      description={statusDescription}
      onClose={() => setStatusOpen(false)}
    />
    </>
  );
}
