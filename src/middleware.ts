import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

type ClerkMetadata = {
  role?: string;
};

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { sessionClaims, userId } = await auth();

    /*console.log("userId:", userId);
    console.log("sessionClaims:", sessionClaims);
    console.log("metadata:", sessionClaims?.metadata);*/

    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const metadata = sessionClaims?.metadata as ClerkMetadata | undefined;
    const isAdmin = metadata?.role === "admin";

    console.log(isAdmin);

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
