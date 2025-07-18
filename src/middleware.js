import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "902e58e7-30b1-4012-abcd-790d8a927416");
  requestHeaders.set("x-createxyz-project-group-id", "19d3b967-ff9d-4f1e-9778-7ce7d01f43bc");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}