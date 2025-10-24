export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to Projet Échec
        </h1>
        <p className="text-center text-lg mb-8">
          Chess Learning Platform - Coming Soon
        </p>
        <div className="text-center">
          <a
            href="/api/health"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Health Check Status
          </a>
        </div>
      </div>
    </main>
  );
}
