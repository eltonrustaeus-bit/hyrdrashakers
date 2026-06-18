import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#030810] border-t border-white/10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-blue-500/30 flex-shrink-0">
              <img
                src="/logo.svg"
                alt="Hydra Shakers"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-semibold text-sm">
              HYDRA <span className="text-blue-400">Shakers</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center">
            © 2026 Hydra Shakers. Alla rättigheter förbehållna.
          </p>

          {/* Instagram link */}
          <a
            href="https://www.instagram.com/hydrashakers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
          >
            <Instagram
              size={16}
              className="text-pink-400 group-hover:text-pink-300 transition-colors duration-200"
            />
            @hydrashakers
          </a>
        </div>
      </div>
    </footer>
  )
}
