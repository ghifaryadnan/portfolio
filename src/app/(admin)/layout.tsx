import { headers } from "next/headers";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const cookieHeader = hdrs.get("cookie") ?? "";
  const authed = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .includes("admin_auth=true");
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        
        <AdminLoginForm />
      </main>
    );
  }
  return children;
}
