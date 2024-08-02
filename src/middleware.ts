import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { CookieService } from "./services/cookies/cookie-service";

export function middleware(request: NextRequest) {
  const session = CookieService.getSession();
  const loggedIn = Boolean(session);
  const nextPath = request.nextUrl.pathname;
  const isAuthRoute = !!["/dashboard"].find((route) => route === nextPath);
  const isPublicRoute = !!["/login"].find((route) => route === nextPath);
  const isHomeRoute = nextPath === "/";

  if (!loggedIn && isAuthRoute) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  if (loggedIn && isHomeRoute) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  if (loggedIn && isPublicRoute) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  /** Match for just the application routes excluding next and api routes. */
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
