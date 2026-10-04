import { NextFetchEvent, NextRequest } from 'next/server';
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
  '/about-us': '/en/company',
  '/assembly-and-packing': '/en/facilities/assembly-packing',
  '/benefits-of-led': '/en/insights/benefits-of-led-lighting',
  '/blog': '/en/insights',
  '/comparision': '/en/insights',
  '/comparison': '/en/insights',
  '/extension-board': '/en/products/electronics/extension-boards',
  '/extrusion-product-work-with-sheetal-electrotech': '/en/facilities/extrusion',
  '/facilites': '/en/facilities',
  '/facts': '/en/insights',
  '/injection-blow-moulding-work-with-sheetal-electrotech': '/en/facilities/ibm-plastic',
  '/injection-moulding': '/en/facilities/injection-moulding',
  '/know-about-colors': '/en/insights/understanding-led-colors-and-cct',
  '/know-about-products-safety': '/en/insights/led-product-safety-bis',
  '/led-batten': '/en/products/led-lighting/battens',
  '/led-bulb': '/en/products/led-lighting/bulbs',
  '/led-bulb-2': '/en/products/led-lighting/bulbs',
  '/led-candle-bulb': '/en/products/led-lighting/bulbs',
  '/led-ceiling-light': '/en/products/led-lighting/downlights',
  '/led-decorative-light': '/en/products/led-lighting/decorative-lights',
  '/led-down-light-3': '/en/products/led-lighting/downlights',
  '/led-down-light': '/en/products/led-lighting/downlights',
  '/led-down-lighter-2': '/en/products/led-lighting/downlights',
  '/led-down-lighter': '/en/products/led-lighting/downlights',
  '/led-emergency-bulb': '/en/products/led-lighting/bulbs',
  '/led-flood-well-light': '/en/products/led-lighting/flood-lights',
  '/led-gyan': '/en/insights',
  '/led-high-power-batten': '/en/products/led-lighting/battens',
  '/led-high-power-bulb': '/en/products/led-lighting/bulbs',
  '/led-spot-g9-bulb': '/en/products/led-lighting/spot-lights',
  '/led-spot-light': '/en/products/led-lighting/spot-lights',
  '/led-street-light-2': '/en/products/led-lighting/street-lights',
  '/led-strip-lights': '/en/products/led-lighting/strip-lights',
  '/manualinsertion': '/en/facilities/manual-insertion',
  '/manufacturing-units': '/en/facilities',
  '/need-to-know-about-leds': '/en/insights',
  '/plastic-blow-moulding': '/en/facilities/blow-moulding',
  '/research': '/en/facilities/research-development',
  '/smart-led-bulb': '/en/products/led-lighting/smart-led',
  '/smt-machine': '/en/facilities/smt',
  '/what-is-ip': '/en/insights/what-is-ip-rating',
  '/what-is-lumens': '/en/insights/what-are-lumens',
  '/what-is-right-light': '/en/insights/choosing-right-led-light-beam-angle',
  '/laser-machine': '/en/facilities',
  '/lazer-machine': '/en/facilities',
};

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  const legacyTarget = legacyRoutes[req.nextUrl.pathname];

  if (legacyTarget) {
    return Response.redirect(new URL(legacyTarget, req.url), 308);
  }

  // Admin remains protected while locale routes continue through next-intl.
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.match(/^\/(en|hi)\/admin/)) {
    return authMiddleware(req as Parameters<typeof authMiddleware>[0], event);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
