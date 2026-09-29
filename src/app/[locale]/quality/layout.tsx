import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata.quality' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function QualityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
