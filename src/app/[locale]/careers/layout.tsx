import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/careers", getPageCopy("careers"));
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
