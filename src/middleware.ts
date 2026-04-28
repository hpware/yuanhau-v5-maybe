import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",").filter(Boolean);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/admin")) {
    const sessionToken = req.cookies.get("better-auth.session_token")?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const baseUrl = process.env.BETTER_AUTH_URL || `http://localhost:${process.env.PORT || 3000}`;
      const sessionRes = await fetch(`${baseUrl}/api/auth/get-session`, {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      });

      if (!sessionRes.ok) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      const session = await sessionRes.json();

      if (!session?.user) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      const isAdmin =
        session.user.role === "admin" ||
        ADMIN_EMAILS.includes(session.user.email);

      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};