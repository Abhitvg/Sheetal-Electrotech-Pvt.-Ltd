import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/products/led-lighting", getPageCopy("ledLighting"));
}

export default function LEDLightingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
