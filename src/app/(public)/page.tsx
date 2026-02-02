import LandingHero from "@/components/landing/LandingHero";
import SkillsSection from "@/components/landing/SkillsSection";
import WorkSection from "@/components/landing/WorkSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex w-full flex-col ">
      <LandingHero />
      <SkillsSection />
      <WorkSection />
      <TestimonialsSection />
    </main>
  );
}
