"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LayoutDashboard,
  FolderGit2,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-200 dark:border-zinc-800">
        <div className="px-4 py-4 font-semibold">Admin</div>
        <nav className="flex-1 px-2 space-y-1">
          <a className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <FolderGit2 className="h-4 w-4" />
            <span>Projects</span>
          </a>
          <a className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </a>
        </nav>
        <div className="p-4">
          <Button variant="secondary" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              className="hidden md:block border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-3 py-2 rounded w-64"
              placeholder="Search"
            />
            <Button>New Project</Button>
          </div>
        </header>
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Projects</CardTitle>
                <CardDescription>Summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Open Issues</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">34</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Deployments</CardTitle>
                <CardDescription>Active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Updated project A</li>
                  <li>Created new release</li>
                  <li>Fixed UI bugs</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">View all</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="font-semibold">Project A</div>
                    <div className="text-sm text-zinc-500">Active</div>
                  </div>
                  <div className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="font-semibold">Project B</div>
                    <div className="text-sm text-zinc-500">Active</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">Manage</Button>
              </CardFooter>
            </Card>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
