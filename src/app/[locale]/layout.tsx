import type { Metadata } from "next";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { EngineeringModeProvider } from "@/components/EngineeringModeProvider";
import OrganizationSchema from "@/components/OrganizationSchema";
import { getPageCopy, localizedMetadata } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "", getPageCopy("home"));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen bg-paper text-ink font-body">
        <NextIntlClientProvider messages={messages}>
          <EngineeringModeProvider>
            <OrganizationSchema />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-ink focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Navigation />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
          </EngineeringModeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
