import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { withAuth } from "next-auth/middleware";
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    pages: {
      signIn: "/api/auth/signin",
    },
  }
);

export default function proxy(req: NextRequest) {
  // If the request is for the admin section, run auth middleware first
  // It will fallback to intlMiddleware on success
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.match(/^\/(en|hi)\/admin/)) {
    return (authMiddleware as any)(req);
  }

  // Otherwise just use intl middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
