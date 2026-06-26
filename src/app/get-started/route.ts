import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Smart entry point for marketing CTAs: signed-in users go to their dashboard,
// everyone else goes to registration. Keeps product pages static.
export async function GET(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dest = user ? "/dashboard" : "/register";
  return NextResponse.redirect(new URL(dest, request.url));
}
