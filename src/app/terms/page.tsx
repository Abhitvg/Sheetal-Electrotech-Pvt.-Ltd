import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Sheetal Electrotech",
  description: "Terms of Service for Sheetal Electrotech Pvt. Ltd.",
};

export default function TermsPage() {
  return (
    <div className="bg-paper text-ink min-h-screen pt-32 pb-24">
      <div className="container-narrow max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-8 text-ink">Terms of Service</h1>
        <p className="text-steel mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-steel leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website sheetalelectrotech.com (the "Site"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Sheetal Electrotech Pvt. Ltd.'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">3. Disclaimer</h2>
            <p>
              The materials on Sheetal Electrotech Pvt. Ltd.'s website are provided on an 'as is' basis. Sheetal Electrotech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">4. Limitations</h2>
            <p>
              In no event shall Sheetal Electrotech Pvt. Ltd. or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if Sheetal Electrotech or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-medium text-ink mb-4">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Daman and Diu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
