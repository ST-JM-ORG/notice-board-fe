import { NextRequest, NextResponse } from "next/server";

/**
 * 미들웨어
 * - 요청이 완료되기 전에 실행되는 코드로, 들어오는 요청을 기반으로 응답을 수정하거나 처리
 * - 파일명은 반드시 'middleware'로 해야함
 * - 서버 사이드에서 동작
 * @param request
 */
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  console.log(pathname);

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
