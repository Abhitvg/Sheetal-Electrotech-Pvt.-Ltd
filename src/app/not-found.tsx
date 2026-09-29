"use client";

export default function GlobalNotFound() {
  return (
    <html>
      <body className="bg-paper text-ink min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-display font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-steel mb-8">The page you're looking for doesn't exist.</p>
        <a href="/en" className="bg-accent text-white px-6 py-3 rounded-sm font-medium hover:bg-accent/90 transition-colors">
          Return to Home
        </a>
      </body>
    </html>
  );
}
