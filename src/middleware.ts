import { jwtDecode } from "jwt-decode";

import { NextRequest, NextResponse } from "next/server";

import { TokenPayload } from "@/src/entities/auth/token";
import {
  ACCESS_TOKEN,
  MODULE_PERMISSION,
  REFRESH_TOKEN,
} from "@/src/shared/constants/const";

/**
 * 미들웨어
 * - 요청이 완료되기 전에 실행되는 코드로, 들어오는 요청을 기반으로 응답을 수정하거나 처리
 * - 파일명은 반드시 'middleware'로 해야함
 * - 서버 사이드에서 동작
 * @param request
 */
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  if (pathname === "/unauthorized") {
    return NextResponse.next();
  }

  if (!accessToken || !refreshToken) {
    request.cookies.delete(ACCESS_TOKEN);
    request.cookies.delete(REFRESH_TOKEN);

    if (pathname === "/login" || pathname === "/sign-up") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (!accessToken && !["/login", "/sign-up"].includes(pathname)) ||
    (!refreshToken && !["/login", "/sign-up"].includes(pathname))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (accessToken && pathname === "/login") ||
    (refreshToken && pathname === "/login")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (refreshToken) {
    const decodedToken = jwtDecode<TokenPayload>(refreshToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      if (pathname === "/login") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (accessToken) {
    const decodedToken = jwtDecode<TokenPayload>(accessToken);

    const rolePermission =
      MODULE_PERMISSION.find(({ role }) => role === decodedToken.role)
        ?.permissions || [];

    const pagePermission = rolePermission.find(({ url }) =>
      pathname.startsWith(url),
    );

    const canAccess: boolean = pagePermission?.allowed || false;

    if (!canAccess) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
};

// 특정 경로에는 미들웨어를 제외함
// - API 라우트 (/api/)
// - Next.js 내부 파일 (_next/static, _next/image)
// - 파비콘 (favicon.ico)
// - SEO 관련 파일 (sitemap.xml, robots.txt)
// - 이미지 파일 (.png, .jpg, .jpeg, .gif, .svg)
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)",
  ],
};
