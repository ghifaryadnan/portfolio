import { NavItem } from "@/types/nav";
import NavbarLinks from "./NavbarLinks";

export default function NavbarMobileMenu({
  open,
  items,
  onClose,
}: {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800">
      <div className="px-4 py-3">
        <NavbarLinks items={items} />
      </div>
    </div>
  );
}
