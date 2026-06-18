'use client'

import { ArrowRight, Instagram } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hem"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(30,64,175,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(59,130,246,0.08) 0%, transparent 60%), linear-gradient(160deg, #060c1a 0%, #0f172a 50%, #060c1a 100%)',
      }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated orbs */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Premium Vattenflaskor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-white">Din vattenflaska.</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #3b82f6 100%)',
                }}
              >
                Ditt sätt.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Trött på din tråkiga vattenflaska? Vi hjälper dig skapa en personlig flaska som speglar vem du är.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://www.instagram.com/hydrashakers"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-8 py-4 text-base transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105"
              >
                Skapa din flaska
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="https://www.instagram.com/hydrashakers"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl px-8 py-4 text-base border border-white/15 hover:border-white/30 transition-all duration-200 hover:scale-105"
              >
                <Instagram size={18} className="text-blue-400" />
                Se på Instagram
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: '100%', label: 'Personlig design' },
                { value: 'Premium', label: 'Kvalitetsmaterial' },
                { value: 'Snabb', label: 'Leverans' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Logo with glow effect */}
          <div className="flex-shrink-0 relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl scale-150" />
            <div className="absolute inset-0 rounded-full bg-blue-600/5 blur-2xl scale-125 animate-pulse" />

            {/* Logo container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-float">
              {/* Rotating ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-blue-500/20"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(59,130,246,0.3), transparent, transparent)',
                  animation: 'spin 8s linear infinite',
                }}
              />
              <div
                className="absolute inset-4 rounded-full border border-blue-400/15"
                style={{
                  background: 'conic-gradient(from 180deg, transparent, rgba(59,130,246,0.15), transparent, transparent)',
                  animation: 'spin 12s linear infinite reverse',
                }}
              />

              {/* Logo image */}
              <div className="absolute inset-8 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl shadow-blue-900/50">
                <img
                  src="/logo.svg"
                  alt="Hydra Shakers"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Pulsing glow underneath */}
              <div className="absolute inset-8 rounded-full animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 96L48 85.3C96 74.7 192 53.3 288 48C384 42.7 480 53.3 576 58.7C672 64 768 64 864 56C960 48 1056 32 1152 29.3C1248 26.7 1344 37.3 1392 42.7L1440 48V96H1392C1344 96 1248 96 1152 96C1056 96 960 96 864 96C768 96 672 96 576 96C480 96 384 96 288 96C192 96 96 96 48 96H0Z"
            fill="rgba(15,23,42,0.6)"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
