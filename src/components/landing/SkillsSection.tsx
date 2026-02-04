 "use client";
import { useQuery } from "@tanstack/react-query";
import { getSkills, type Skill } from "@/services/skills.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillsSection() {
  const { data: skills = [], isLoading, error } = useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const grouped = Object.entries(
    skills.reduce((acc: Record<string, Skill[]>, s: Skill) => {
      const cat = s?.category ?? "Other";
      acc[cat] = acc[cat] ? [...acc[cat], s] : [s];
      return acc;
    }, {})
  ).sort(([a], [b]) => {
    const order = ["Frontend", "Backend", "Tools"];
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <section id="skills" className="darkmode">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Skills</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded border border-zinc-200 dark:border-zinc-800 p-4"
              >
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
                <div className="h-3 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-sm text-red-500">Gagal memuat skills</div>
        ) : skills.length === 0 ? (
          <div className="text-sm text-zinc-400">Belum ada data skills</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped.map(([category, items]) => {
              const names = (items as Skill[]).map((it) => it?.name ?? "Skill");
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                    <hr/>
                  </CardHeader>
                  <CardContent>{names.join(", ")}</CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
