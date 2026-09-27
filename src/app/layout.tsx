import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

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
  description: "Vertically integrated OEM manufacturer & exporter of LED lighting and rigid plastic packaging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body className="flex flex-col min-h-screen bg-paper text-ink font-body">
        <SmoothScroll>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
