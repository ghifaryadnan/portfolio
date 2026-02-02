import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

interface NavbarActionsProps {
  ctaLabel?: string;
  ctaHref?: string;
}

export default function NavbarActions({ ctaLabel = "Contact", ctaHref = "/#contact" }: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Button asChild className="bg-amber-500 text-white dark:text-black hover:bg-amber-600">
        <a href={ctaHref}>{ctaLabel}</a>
      </Button>
    </div>
  );
}
