import { ReactNode } from "react";
import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/contact", getPageCopy("contact"));
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
