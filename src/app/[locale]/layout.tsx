import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { EngineeringModeProvider } from "@/components/EngineeringModeProvider";
import { getPageCopy, localizedMetadata, SITE_URL } from "@/lib/seo";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "", getPageCopy("home"));
}port type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { EngineeringModeProvider } from "@/components/EngineeringModeProvider";
import { getPageCopy, localizedMetadata, SITE_URL } from "@/lib/seo";

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

export const metadata: Metadata = {
  title: "Sheetal Electrotech | Premium OEM Manufacturing Partner",
  description: "Vertically integrated OEM manufacturer & exporter of LED lighting, rigid plastic packaging, and custom injection moulding solutions. Over 25 years of excellence.",
  keywords: ["OEM manufacturing", "LED lighting manufacturer", "Rigid plastic packaging", "Injection moulding India", "SMT manufacturing", "Sheetal Electrotech"],
  authors: [{ name: "Sheetal Electrotech" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sheetalelectrotech.com",
    title: "Sheetal Electrotech | Premium OEM Manufacturing Partner",
    description: "Vertically integrated OEM manufacturer & exporter of LED lighting, rigid plastic packaging, and custom injection moulding solutions. Based in India, scaling globally.",
    siteName: "Sheetal Electrotech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheetal Electrotech | Premium OEM Manufacturing Partner",
    description: "Vertically integrated OEM manufacturer & exporter of LED lighting and rigid plastic packaging.",
  },
};

import { Analytics } from "@vercel/analytics/react";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body className="flex flex-col min-h-screen bg-paper text-ink font-body">
        <NextIntlClientProvider messages={messages}>
          <EngineeringModeProvider>
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
