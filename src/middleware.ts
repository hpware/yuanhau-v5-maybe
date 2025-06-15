import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { sessionClaims, userId } = await auth();

    // Debug logging
    console.log("userId:", userId);
    console.log("sessionClaims:", sessionClaims);
    console.log("metadata:", sessionClaims?.metadata);

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const isAdmin = sessionClaims?.metadata?.role === "admin";

    console.log(isAdmin);

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
