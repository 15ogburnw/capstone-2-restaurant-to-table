import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Create a base response
  const res = NextResponse.next();

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //   for all routes that require you to be logged in
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // Check if there is an authenticated user
    if (session?.user) {
      // Authentication successful, forward request to protected route.
      return res;
    }

    // Auth condition not met, redirect to landing page.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  //   for auth routes and the landing page, if there is a user logged in redirect to dashboard
  if (
    req.nextUrl.pathname.match(/^\/$/) ||
    req.nextUrl.pathname.startsWith("/auth")
  ) {
    if (session?.user) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return res;
}

export const config = {};
