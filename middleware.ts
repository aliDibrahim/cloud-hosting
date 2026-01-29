import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;

  console.log(request.nextUrl.pathname);

  if (!token) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        { error: "No token provided,message from middleware" },
        { status: 401 }
      );
    }
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// this middleware will work only for the following routes
export const config = {
  // :path* => mean all routes that comes after profile path
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};
