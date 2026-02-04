 "use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCreateSkill } from "@/services/skills.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusModal } from "@/components/ui/status-modal";
import { useState } from "react";

export default function AdminSkillForm({ categories }: { categories: string[] }) {
  const qc = useQueryClient();
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [statusDescription, setStatusDescription] = useState<string | undefined>(undefined);
  const [showNameRequired, setShowNameRequired] = useState(false);
  const createMut = useMutation({
    mutationFn: adminCreateSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-skills"] });
      setNewName("");
      setNewCategory(categories[0]);
      setStatusType("success");
      setStatusDescription("Skill berhasil ditambahkan");
      setStatusOpen(true);
      setShowNameRequired(false);
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
  function submitNew() {
    const nameTrimmed = newName.trim();
    if (!nameTrimmed) {
      setShowNameRequired(true);
      return;
    }
    if (!newCategory) return;
    createMut.mutate({ name: nameTrimmed, category: newCategory });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tambah Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Input
                placeholder="Nama skill"
                value={newName}
                aria-invalid={showNameRequired && !newName.trim()}
                onChange={(e) => {
                  setNewName(e.target.value);
                  if (showNameRequired && e.target.value.trim()) setShowNameRequired(false);
                }}
              />
              {showNameRequired && !newName.trim() && (
                <div className="text-xs text-destructive mt-1">Nama skill wajib diisi</div>
              )}
            </div>
            <select
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Button onClick={submitNew} disabled={createMut.isPending}>
              {createMut.isPending ? "Memproses..." : "Tambah"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <StatusModal
        open={statusOpen}
        type={statusType}
        description={statusDescription}
        onClose={() => setStatusOpen(false)}
      />
    </>
  );
}
