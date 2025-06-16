import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

type ClerkMetadata = {
  role?: string;
};

function proxyMiddleware(req) {
  if (req.nextUrl.pathname.match("__clerk")) {
    const proxyHeaders = new Headers(req.headers);
    proxyHeaders.set(
      "Clerk-Proxy-Url",
      process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "",
    );
    proxyHeaders.set("Clerk-Secret-Key", process.env.CLERK_SECRET_KEY || "");
    if (req.ip) {
      proxyHeaders.set("X-Forwarded-For", req.ip);
    } else {
      proxyHeaders.set(
        "X-Forwarded-For",
        req.headers.get("X-Forwarded-For") || "",
      );
    }

    const proxyUrl = new URL(req.url);
    proxyUrl.host = "frontend-api.clerk.dev";
    proxyUrl.port = "443";
    proxyUrl.protocol = "https";
    proxyUrl.pathname = proxyUrl.pathname.replace("/__clerk", "");

    return NextResponse.rewrite(proxyUrl, {
      request: {
        headers: proxyHeaders,
      },
    });
  }

  return null;
}

const clerkHandler = clerkMiddleware();

export default async function middleware(req) {
  // First check if it's a proxy request
  const proxyResponse = proxyMiddleware(req);
  if (proxyResponse) {
    return proxyResponse;
  }

  // For admin routes, check authorization
  if (isAdminRoute(req)) {
    const auth = req.auth;
    const { sessionClaims, userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const metadata = sessionClaims?.metadata as ClerkMetadata | undefined;
    const isAdmin = metadata?.role === "admin";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Otherwise, use Clerk's middleware
  return clerkHandler(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes AND anything passed through the proxy
    "/(api|trpc|__clerk)(.*)",
  ],
};
