'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#hem', label: 'Hem' },
    { href: '#om-oss', label: 'Om oss' },
    { href: '#hur-det-fungerar', label: 'Hur det fungerar' },
    { href: '#kontakt', label: 'Kontakt' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-[#060c1a]/80 border-b border-white/10 shadow-lg shadow-black/20'
          : 'backdrop-blur-md bg-white/5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hem" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all duration-300 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Hydra Shakers Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-white text-lg tracking-tight group-hover:text-blue-300 transition-colors duration-300">
              HYDRA <span className="text-blue-400">Shakers</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="https://www.instagram.com/hydrashakers"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-105"
            >
              Beställ nu
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Öppna meny"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#060c1a]/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 hover:text-white text-base font-medium py-2 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <a
                href="https://www.instagram.com/hydrashakers"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-5 py-3 text-sm transition-all duration-200"
              >
                Beställ nu
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
