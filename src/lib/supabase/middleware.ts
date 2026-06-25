import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

const PROTECTED = ["/dashboard", "/transfer", "/transactions", "/accounts", "/kyc", "/admin"];
const AUTH_PAGES = ["/login", "/register"];

export async function updateSession(request: NextRequest) {
  // This response is rebuilt by `setAll` whenever Supabase refreshes the token,
  // so it always carries the freshest auth cookies.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED.some((p) => path.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => path.startsWith(p));

  // IMPORTANT: any redirect must carry the cookies Supabase just set on
  // `response`, otherwise the refreshed session is lost and the app ping-pongs
  // between /login and /dashboard (ERR_TOO_MANY_REDIRECTS).
  const redirectWithSession = (pathname: string, withRedirectParam = false) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    url.search = "";
    if (withRedirectParam) url.searchParams.set("redirect", path);
    const redirectResponse = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
    return redirectResponse;
  };

  if (!user && isProtected) {
    return redirectWithSession("/login", true);
  }

  if (user && isAuthPage) {
    return redirectWithSession("/dashboard");
  }

  return response;
}
