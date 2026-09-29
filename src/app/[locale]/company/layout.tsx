import { ReactNode } from "react";
import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/company", getPageCopy("company"));
}

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
