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

const legacyRoutes: Record<string, string> = {
  '/': '/en',
  '/company': '/en/company',
  '/products': '/en/products',
  '/facilities': '/en/facilities',
  '/quality': '/en/quality',
  '/careers': '/en/careers',
  '/insights': '/en/insights',
  '/contact': '/en/contact',
  '/rfq': '/en/rfq',
  '/gallery': '/en/gallery',
  '/privacy': '/en/privacy',
  '/terms': '/en/terms',
};

export default function proxy(req: NextRequest) {
  const legacyTarget = legacyRoutes[req.nextUrl.pathname];

  if (legacyTarget) {
    return Response.redirect(new URL(legacyTarget, req.url), 308);
  }

  // Admin remains protected while locale routes continue through next-intl.
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.match(/^\/(en|hi)\/admin/)) {
    return (authMiddleware as any)(req);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
