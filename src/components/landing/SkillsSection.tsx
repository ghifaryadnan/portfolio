import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillsSection() {
  return (
    <section id="skills" className="darkmode">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Frontend</CardTitle>
            </CardHeader>
            <CardContent>React, Next.js, Tailwind CSS</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Backend</CardTitle>
            </CardHeader>
            <CardContent>Node.js, REST, PostgreSQL</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
            </CardHeader>
            <CardContent>Git, Docker, CI/CD</CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
