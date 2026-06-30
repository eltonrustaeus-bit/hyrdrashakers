import { Instagram, ExternalLink, Mail } from 'lucide-react'

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  )
}

export default function InstagramCTA() {
  return (
    <section
      id="kontakt"
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #060c1a 40%, #0a1628 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Label */}
        <div className="mb-6">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
            Hitta oss på sociala medier
          </span>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 animate-float">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
            <div className="relative rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl shadow-blue-900/50 w-full h-full">
              <img
                src="/logo.png"
                alt="Hydra Shakers"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          Följ oss för inspiration och senaste nytt om Hydra Shakers.
        </p>

        {/* Social buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/hydrashakers"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 text-white font-bold rounded-2xl px-8 py-4 text-base transition-all duration-300 shadow-2xl shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-105 w-full sm:w-auto"
          >
            <Instagram size={20} />
            Instagram
            <ExternalLink size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@hydrashakers0"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-[#010101] hover:bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-white font-bold rounded-2xl px-8 py-4 text-base transition-all duration-300 shadow-2xl hover:scale-105 w-full sm:w-auto"
          >
            <TikTokIcon size={20} />
            TikTok
            <ExternalLink size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Email */}
          <a
            href="mailto:hydrashakers@gmail.com"
            className="group inline-flex items-center justify-center gap-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-400/50 text-white font-bold rounded-2xl px-8 py-4 text-base transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <Mail size={20} className="text-blue-400" />
            hydrashakers@gmail.com
          </a>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-500/30"
              style={{ opacity: 0.3 + i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
