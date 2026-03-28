import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />

      <div className="relative text-center px-4">
        {/* 404 number */}
        <div className="font-cormorant text-[12rem] sm:text-[16rem] font-bold leading-none text-white/5 select-none">
          404
        </div>

        {/* Content */}
        <div className="-mt-16 sm:-mt-20">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-white/60 text-sm">Page not found</span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-white mb-4">
            Oops! Lost your way?
          </h1>
          <p className="text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-gold/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-3.5 rounded-full transition-all text-sm font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
