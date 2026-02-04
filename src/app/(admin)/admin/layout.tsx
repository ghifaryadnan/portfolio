"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FolderGit2,
  FolderOpenDot,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function onLogout() {
    const supabase = await getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.replace("/admin");
    router.refresh();
  }
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-200 dark:border-zinc-800">
        <div className="px-4 py-4 font-semibold">Admin</div>
        <nav className="flex-1 px-2 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <FolderOpenDot className="h-4 w-4" />
            <span>Project</span>
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>Skills</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="p-4">
          <Button variant="secondary" className="w-full" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-semibold">Dashboard</span>
          </div>
        </header>
        <main className="p-6 space-y-6">
          {children}
        </main>
      </div>
      <Modal open={mobileOpen} onClose={() => setMobileOpen(false)} className="max-w-sm w-[90%]">
        <ModalHeader>
          <ModalTitle>Menu</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileOpen(false)}
            >
              <FolderOpenDot className="h-4 w-4" />
              <span>Project</span>
            </Link>
            <Link
              href="/admin/skills"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileOpen(false)}
            >
              <FolderGit2 className="h-4 w-4" />
              <span>Skills</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </ModalContent>
        <ModalFooter>
          <Button variant="secondary" className="w-full" onClick={() => { setMobileOpen(false); onLogout(); }}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
