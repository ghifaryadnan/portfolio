 "use client";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminListSkills,
  adminCreateSkill,
  adminUpdateSkill,
  adminDeleteSkill,
  type Skill,
} from "@/services/skills.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminSkillForm from "@/components/admin/skills/AdminSkillForm";
import SkillsTable from "@/components/admin/skills/SkillsTable";
import ConfirmDeleteModal from "@/components/admin/skills/ConfirmDeleteModal";
import { StatusModal } from "@/components/ui/status-modal";
import { TableContainer, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@/components/ui/table";

export default function AdminSkillsPage() {
  const qc = useQueryClient();
  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["admin-skills"],
    queryFn: adminListSkills,
  });
  const categories = useMemo(() => ["Frontend", "Backend", "Tools", "Other"], []);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [statusDescription, setStatusDescription] = useState<string | undefined>(undefined);
  const deleteMut = useMutation({
    mutationFn: adminDeleteSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-skills"] });
      setStatusType("success");
      setStatusDescription("Skill berhasil dihapus");
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

  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <section className="space-y-6">
      <div className="text-2xl font-semibold">Skills</div>
      <AdminSkillForm categories={categories} />
      <Card>
        <CardHeader>
          <CardTitle>Daftar Skill</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
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
                  {[...Array(6)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                          <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : skills.length === 0 ? (
            <div className="text-sm text-zinc-400">Belum ada data</div>
          ) : (
            <SkillsTable
              skills={skills}
              categories={categories}
              onRequestDelete={(id) => setConfirmId(id)}
            />
          )}
        </CardContent>
      </Card>
      <ConfirmDeleteModal
        open={!!confirmId}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId) deleteMut.mutate(confirmId);
          setConfirmId(null);
        }}
        isPending={deleteMut.isPending}
      />
      <StatusModal
        open={statusOpen}
        type={statusType}
        description={statusDescription}
        onClose={() => setStatusOpen(false)}
      />
    </section>
  );
}
