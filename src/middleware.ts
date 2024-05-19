import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("nextjs");
  console.log("cookie");
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log("allCookies");
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  console.log("request.credentials");
  console.log(request.credentials);

  // return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/page/:path*",
};
