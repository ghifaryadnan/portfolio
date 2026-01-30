"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/services/project.service";

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}
