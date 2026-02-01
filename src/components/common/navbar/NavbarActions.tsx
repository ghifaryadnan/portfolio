import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function NavbarActions() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Button>Contact</Button>
    </div>
  );
}
