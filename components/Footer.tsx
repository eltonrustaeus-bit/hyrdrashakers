import { Instagram, Mail, MapPin } from 'lucide-react'

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#030810] border-t border-white/10 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Top divider glow */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -mt-16 pointer-events-none" />

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-14">

          {/* Column 1 — Brand + Om oss */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/30 flex-shrink-0">
                <img src="/logo.png" alt="Hydra Shakers" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                HYDRA <span className="text-blue-400">Shakers</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Vi skapar personliga vattenflaskor för seriösa gymmare. Välj din variant, lägg till text eller bild — och gör flaskan till din.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Baserade i Sverige. Beställning sker direkt via Instagram DM.
            </p>
          </div>

          {/* Column 2 — Snabblänkar */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Navigera
            </h3>
            <ul className="space-y-3">
              {[
                { href: '#hem',             label: 'Hem' },
                { href: '#om-oss',          label: 'Om oss' },
                { href: '#hur-det-fungerar',label: 'Hur det fungerar' },
                { href: '#priser',          label: 'Konfigurator & priser' },
                { href: '#kontakt',         label: 'Kontakt' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Sociala medier & kontakt */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Sociala medier & kontakt
            </h3>
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/hydrashakers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Instagram size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-pink-300 transition-colors duration-200">@hydrashakers</p>
                  <p className="text-gray-500 text-xs">Följ oss på Instagram</p>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@hydrashakers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#010101] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <TikTokIcon size={16} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-gray-300 transition-colors duration-200">@hydrashakers</p>
                  <p className="text-gray-500 text-xs">Följ oss på TikTok</p>
                </div>
              </a>

              <a
                href="mailto:hydrashakers@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors duration-200">hydrashakers@gmail.com</p>
                  <p className="text-gray-500 text-xs">Maila oss</p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Sverige</p>
                  <p className="text-gray-500 text-xs">Levererar inom Sverige</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2026 Hydra Shakers. Alla rättigheter förbehållna.
          </p>
          <a
            href="https://www.instagram.com/hydrashakers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200 text-xs group"
          >
            <Instagram size={13} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
            @hydrashakers
          </a>
        </div>
      </div>
    </footer>
  )
}
