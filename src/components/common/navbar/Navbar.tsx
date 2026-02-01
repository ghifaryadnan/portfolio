"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavItem } from "@/types/nav";
import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";
import NavbarMobileMenu from "./NavbarMobileMenu";

interface NavbarProps {
  items?: NavItem[];
}

export default function Navbar({ items }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navItems =
    items ??
    [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
    ];

  return (
    <nav className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-black dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <NavbarBrand />
            <div className="hidden md:block">
              <NavbarLinks items={navItems} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex">
              <NavbarActions />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <NavbarMobileMenu open={open} items={navItems} onClose={() => setOpen(false)} />
    </nav>
  );
}
