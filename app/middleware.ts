import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log("Middleware exécuté pour :", pathname);
  console.log("Token trouvé :", token);

  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      console.log("Redirection vers /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (pathname === "/") {
      console.log("Redirection vers /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (token) {
    if (pathname === "/login") {
      console.log("Redirection vers /dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (pathname === "/") {
      console.log("Redirection vers /dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  console.log("Requête autorisée :", pathname);
  return NextResponse.next();
}
