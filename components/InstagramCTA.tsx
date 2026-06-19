import { Instagram, ExternalLink } from 'lucide-react'

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
        {/* Instagram badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 opacity-80" />
          <Instagram size={28} className="text-white relative z-10" strokeWidth={1.5} />
        </div>

        {/* Gym vibes label */}
        <div className="mb-3">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
            Följ oss på Instagram
          </span>
        </div>

        {/* Handle */}
        <div className="mb-4">
          <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            <span className="text-gray-400">@</span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #3b82f6 100%)',
              }}
            >
              hydrashakers
            </span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          Följ oss för inspiration och senaste nytt om Hydra Shakers.
        </p>

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="relative w-28 h-28 animate-float">
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

        {/* CTA Button */}
        <a
          href="https://www.instagram.com/hydrashakers"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white font-bold rounded-2xl px-10 py-4 text-base transition-all duration-300 shadow-2xl shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-105"
        >
          <Instagram size={20} />
          Följ på Instagram
          <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-12">
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
