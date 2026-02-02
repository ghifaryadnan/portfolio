import Link from "next/link";
import type { SocialLink } from "@/types/social";
import { cn } from "@/lib/utils";

export default function SocialLinks({
  items,
  className,
}: {
  items: SocialLink[];
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 text-sm text-zinc-500", className)}>
      {items.map((item, idx) => (
        <div key={item.href} className="flex items-center gap-1">
          <Link
            href={item.href}
            className="inline-flex items-center gap-1 text-zinc-500 hover:text-amber-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
          {idx < items.length - 1 && <span className="mx-1 text-zinc-700">|</span>}
        </div>
      ))}
    </div>
  );
}
