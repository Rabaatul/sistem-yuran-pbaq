import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Fathul Quranic Centre (FQC) Portal Middleware
 *
 * Catatan Keselamatan:
 * Portal ini menyediakan seni bina bersedia untuk perlindungan laluan portal (seperti /portal/admin).
 * Sekiranya sistem kelayakan/authentication sebenar ditambah pada masa hadapan (contoh: NextAuth, Supabase, Auth0),
 * anda boleh mengaktifkan semakan token di bawah melalui Environment Variables.
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Contoh struktur sedia ada untuk perlindungan laluan /portal/admin
  if (pathname.startsWith("/portal/admin")) {
    // Pada masa akan datang, semak token cookie atau session di sini:
    // const authToken = request.cookies.get("fqc_admin_session");
    // if (!authToken) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
