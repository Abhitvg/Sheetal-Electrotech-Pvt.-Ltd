import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/products/rigid-packaging", getPageCopy("rigidPackaging"));
}

export default function RigidPackagingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
