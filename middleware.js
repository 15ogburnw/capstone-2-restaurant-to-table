import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";

export async function middleware(req) {
  // Create a base response
  const res = NextResponse.next();

  const path = req.nextUrl.pathname;

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if we don't have a session and the user is trying to go to the dashboard or access an api endpoint, redirect to landing page
  if (!session && (path.startsWith("/dashboard") || path.startsWith("/api"))) {
    return NextResponse.redirect(new URL("/landing", req.url));
  }

  //   const trimmedPathname = req.nextUrl.pathname;
  //   switch (req.nextUrl.pathname) {
  //     case "/":
  //   }
  // }
  // if (req.nextUrl.pathname.startsWith("/dashboard")) {
  //   //   for all routes that require you to be logged in
  //   // Check if there is an authenticated user
  //   if (session?.user) {
  //     // Authentication successful, forward request to protected route.
  //     return res;
  //   } else {
  //     // Auth condition not met, redirect to landing page.
  //     const redirectUrl = req.nextUrl.clone();
  //     redirectUrl.pathname = "/landing";

  //     return NextResponse.redirect(redirectUrl);
  //   }
  // }

  // // if (req.nextUrl.pathname.match(/^\/$/)) {
  // //   return NextResponse.redirect(new URL("/landing", req.nextUrl));
  // // }
  // //   for auth routes and the landing page, if there is a user logged in redirect to dashboard
  // if (
  //   (!req.nextUrl.pathname.startsWith("/dashboard") ||
  //     req.nextUrl.pathname.startsWith("/auth")) &&
  //   session?.user
  // ) {
  //   const redirectUrl = req.nextUrl.clone();
  //   redirectUrl.pathname = "/dashboard";
  //   return NextResponse.redirect(redirectUrl);
  // }

  return res;
}

export const config = {}
