import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/privacy", getPageCopy("privacy"));
}

export default function PrivacyPage() {
  return (
    <div className="bg-paper text-ink min-h-screen pt-32 pb-24">
      <div className="container-narrow max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-8 text-ink">Privacy Policy</h1>
        <p className="text-steel mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-steel leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">1. Introduction</h2>
            <p>
              Sheetal Electrotech Pvt. Ltd. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website sheetalelectrotech.com (our &quot;Website&quot;) and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Website, including information:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>By which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline (&quot;personal information&quot;).</li>
              <li>That is about you but individually does not identify you, such as your company name and industry.</li>
              <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">3. How We Use Your Information</h2>
            <p>
              We use information that we collect about you or that you provide to us, including any personal information:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To present our Website and its contents to you.</li>
              <li>To provide you with information, products, or services that you request from us (such as RFQ responses).</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
              <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">4. Data Security</h2>
            <p>
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">5. Contact Information</h2>
            <p>
              To ask questions or comment about this privacy policy and our privacy practices, contact us at: <a href="mailto:info@sheetalelectrotech.com" className="text-accent hover:underline">info@sheetalelectrotech.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
