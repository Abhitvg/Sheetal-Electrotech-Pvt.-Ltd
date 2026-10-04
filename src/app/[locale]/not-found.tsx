import { Link } from "@/i18n/routing";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-paper pt-32 pb-24">
      <div className="container-wide text-center max-w-2xl">
        <div className="w-20 h-20 bg-mist rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-medium text-ink mb-6">
          Page Not Found
        </h1>
        <p className="text-xl text-steel mb-12">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" />
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
