 "use client";
 import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
 import { getSupabaseClient } from "@/lib/supabase/client";
 
 export default function AdminLoginForm() {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
 
   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
     e.preventDefault();
     setError(null);
     if (!email || !password) {
       setError("Email dan password wajib diisi");
       return;
     }
     setLoading(true);
     try {
      const supabase = await getSupabaseClient();
      if (supabase) {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) {
          setError(authError.message || "Login gagal");
        } else {
          const user = authData?.user;
          if (!user) {
            setError("User tidak ditemukan");
          } else {
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", user.id)
              .single();
            if (profileError) {
              setError(profileError.message || "Profil tidak ditemukan");
              await supabase.auth.signOut();
            } else if (profile?.role !== "admin") {
              setError("Bukan admin");
              await supabase.auth.signOut();
            } else {
              const access_token = authData?.session?.access_token;
              if (!access_token) {
                setError("Token sesi tidak ditemukan");
                await supabase.auth.signOut();
              } else {
                const resp = await fetch("/api/admin/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ access_token }),
                });
                if (!resp.ok) {
                  const j = await resp.json().catch(() => ({}));
                  setError(j?.error || "Login gagal");
                  await supabase.auth.signOut();
                } else {
                  router.replace("/admin");
                  router.refresh();
                }
              }
            }
          }
        }
      } else {
        setError("Supabase belum dikonfigurasi");
      }
     } catch {
       setError("Terjadi kesalahan jaringan");
     } finally {
       setLoading(false);
     }
   }
 
   return (
     <Card className="w-full max-w-md">
       <CardHeader>
         <CardTitle>Admin Login</CardTitle>
         <CardDescription>Masuk untuk mengelola konten</CardDescription>
       </CardHeader>
       <CardContent>
         <form onSubmit={onSubmit} className="space-y-4">
           <div className="space-y-2">
             <label htmlFor="email" className="text-sm font-medium">
               Email
             </label>
             <Input
               id="email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="admin@email.com"
               aria-invalid={!!error && !email}
             />
           </div>
           <div className="space-y-2">
             <label htmlFor="password" className="text-sm font-medium">
               Password
             </label>
             <Input
               id="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="••••••••"
               aria-invalid={!!error && !password}
             />
           </div>
           {error ? <div className="text-sm text-red-500">{error}</div> : null}
           <Button type="submit" disabled={loading} className="w-full">
             {loading ? "Memproses..." : "Masuk"}
           </Button>
         </form>
       </CardContent>
     </Card>
   );
 }
