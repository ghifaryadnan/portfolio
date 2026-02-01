import NavbarLinkItem from "./NavbarLinkItem";
import { NavItem } from "@/types/nav";

export default function NavbarLinks({ items }: { items: NavItem[] }) {
  return (
    <div className="flex items-center gap-1">
      {items.map((item) => (
        <NavbarLinkItem key={item.href} label={item.label} href={item.href} />
      ))}
    </div>
  );
}
