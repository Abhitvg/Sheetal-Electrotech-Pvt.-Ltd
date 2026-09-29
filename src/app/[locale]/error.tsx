"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-paper pt-32 pb-24">
      <div className="container-wide text-center max-w-2xl">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-medium text-ink mb-6">
          Something went wrong
        </h1>
        <p className="text-xl text-steel mb-12">
          An unexpected error occurred while loading this page. Our team has been notified.
        </p>
        <button onClick={() => reset()} className="btn-primary inline-flex items-center gap-2 mx-auto">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </main>
  );
}
