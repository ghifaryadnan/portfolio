"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/services/project.service";

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: unknown }) =>
      updateProject(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}
