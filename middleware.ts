import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  console.log("Middleware actif, token :", token);
  console.log("Requête pour :", pathname);

  // Si l'utilisateur n'est pas authentifié
  if (!token) {
    if (pathname === "/" || pathname.startsWith("/dashboard")) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Si l'utilisateur est authentifié
  if (token) {
    if (pathname === "/login") {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Matcher pour appliquer le middleware sur les routes nécessaires
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
