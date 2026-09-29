import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
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

const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontBody = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
    <html lang={locale} className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body className="flex flex-col min-h-screen bg-paper text-ink font-body">
        <NextIntlClientProvider messages={messages}>
          <EngineeringModeProvider>
            <OrganizationSchema />
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </EngineeringModeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
