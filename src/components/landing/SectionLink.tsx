import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SectionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-amber-500 dark:text-gray-500 hover:text-gray-500 transition-colors",
        className
      )}
    >
      {children}
    </Link>
  );
}
