import SectionLink from "./SectionLink";

export default function HeroRight({
  description = "I build end-to-end web applications—from fast, accessible UIs to secure and scalable APIs. My focus is performance, accessibility, and delivering a consistent user experience.",
}: {
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center lg:items-start md:items-start justify-center gap-5">
      <div className="text-sm font-medium text-amber-500 dark:text-gray-500">FULLSTACK</div>
      <div className="space-y-2 flex items-center flex-col">
        <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Web Developer
        </div>
        <p className="max-w-md text-sm text-center md:text-left leading-6 text-zinc-400">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <SectionLink href="/#skills">my Skills</SectionLink>
        <span className="text-zinc-700">|</span>
        <SectionLink href="/#experience">my Experience</SectionLink>
        <span className="text-zinc-700">|</span>
        <SectionLink href="/#art">my Art</SectionLink>
      </div>
      <div className="mt-6">
        <div className="text-xs text-zinc-400">my life motto is -</div>
        <div className="text-sm text-zinc-400">
          “Get a cup of <span className="dark:text-gray-500 text-amber-500">coffee</span> and get my{" "}
          <span className="dark:text-gray-500 text-amber-500">work</span> done.”
        </div>
      </div>
    </div>
  );
}
