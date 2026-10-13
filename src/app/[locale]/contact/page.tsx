import ContactView from "@/components/ContactView";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "hi" ? "hi" : "en";

  return <ContactView locale={locale} />;
}
