 import { NextRequest, NextResponse } from "next/server";
 
 export function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl;
   const isAdminArea = pathname.startsWith("/admin");
   if (isAdminArea) {
     const authed = req.cookies.get("admin_auth")?.value === "true";
    if (!authed && pathname !== "/admin") {
      const url = new URL("/admin", req.url);
      return NextResponse.redirect(url);
    }
   }
   return NextResponse.next();
 }
 
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
