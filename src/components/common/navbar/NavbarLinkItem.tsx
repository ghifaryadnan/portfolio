import Link from "next/link";
import { NavItem } from "@/types/nav";

export default function NavbarLinkItem({ label, href }: NavItem) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm text-black dark:text-zinc-50"
    >
      {label}
    </Link>
  );
}
