import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Create a base response
  const res = NextResponse.next();

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if we have a session
  if (session) {
    const path = req.nextUrl.pathName;

    // check for authenticated user on session, if there is one, only let them access dashboard nested pages
    if (session.user) {
      if (path.startsWith("/dashboard")) {
        return res;
      } else {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathName = "/dashboard";
        return NextResponse.redirect(redirectUrl);
      }

      // If there isn't one redirect them to the landing page unless they are on an authentication page
    } else {
      if (path.startsWith("/auth")) {
        return res;
      } else {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathName = "/landing";
        return NextResponse.redirect(redirectUrl);
      }
    }
  }
  if (req.nextUrl.pathname.match(/^\/$/)) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "landing";
    return NextResponse.redirect(redirectUrl);
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

  //
  return res;
}
