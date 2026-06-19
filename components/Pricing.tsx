'use client'

import { useState } from 'react'
import { Check, Type, Image, Layers, Instagram } from 'lucide-react'

// ─── SVG Shaker mockup ──────────────────────────────────────────────────────
function ShakerMockup({
  showText,
  showImage,
  customText,
}: {
  showText: boolean
  showImage: boolean
  customText?: string
}) {
  const label = customText?.slice(0, 18) || (showText && !showImage ? 'DIN TEXT' : '')

  return (
    <svg viewBox="0 0 110 270" className="w-full h-full drop-shadow-2xl" fill="none">
      <defs>
        {/* Body 3-D gradient */}
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8cce4" />
          <stop offset="25%" stopColor="#e8f0fc" />
          <stop offset="60%" stopColor="#dde8f8" />
          <stop offset="100%" stopColor="#94aec8" />
        </linearGradient>
        {/* Cap gradient */}
        <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f2a6e" />
          <stop offset="50%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f2a6e" />
        </linearGradient>
        {/* Label gradient */}
        <linearGradient id="lbl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f4ff" />
        </linearGradient>
        {/* Shadow */}
        <radialGradient id="shad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Drop shadow ellipse */}
      <ellipse cx="55" cy="266" rx="36" ry="6" fill="url(#shad)" />

      {/* Body: tapers from ~80px wide at bottom to ~58px at shoulder */}
      <path
        d="M26 75 Q24 75 23 80 L16 255 Q16 263 26 263 L84 263 Q94 263 94 255 L87 80 Q86 75 84 75 Z"
        fill="url(#body)"
      />

      {/* Body left shine */}
      <path d="M33 88 L26 250" stroke="rgba(255,255,255,0.55)" strokeWidth="4" strokeLinecap="round" />

      {/* Cap ring (connects body to cap) */}
      <rect x="26" y="62" width="58" height="15" rx="4" fill="#1e3a8a" />

      {/* Cap body */}
      <path d="M32 22 Q32 12 55 12 Q78 12 78 22 L76 62 L34 62 Z" fill="url(#cap)" />

      {/* Spout nub */}
      <rect x="45" y="8" width="20" height="14" rx="4" fill="#1e40af" />
      <rect x="49" y="4" width="12" height="10" rx="3" fill="#2563eb" />

      {/* ActionRod handle loop on the side */}
      <path d="M87 140 Q102 140 102 152 Q102 164 87 164" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* ── Label area ── */}
      <rect x="28" y="95" width="54" height="105" rx="5" fill="url(#lbl)" />
      <rect x="28" y="95" width="54" height="105" rx="5" stroke="rgba(30,64,175,0.18)" strokeWidth="1" />

      {/* Label content */}
      {showImage && !showText && (
        // Placeholder image
        <>
          <rect x="34" y="104" width="42" height="42" rx="3" fill="#dbeafe" />
          <path d="M41 138 L48 124 L55 132 L62 120 L69 138 Z" fill="#93c5fd" />
          <circle cx="44" cy="115" r="4" fill="#3b82f6" />
          <text x="55" y="160" textAnchor="middle" fontSize="7" fill="#1e40af" fontFamily="Arial, sans-serif" fontWeight="600">DIN BILD</text>
          <text x="55" y="170" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="Arial, sans-serif">valfri design</text>
        </>
      )}

      {showText && !showImage && (
        // Text only
        <>
          <text x="55" y="118" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontFamily="Arial Black, sans-serif" fontWeight="900">
            {label.length > 9 ? label.slice(0, 9) : label}
          </text>
          {label.length > 9 && (
            <text x="55" y="130" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontFamily="Arial Black, sans-serif" fontWeight="900">
              {label.slice(9, 18)}
            </text>
          )}
          <line x1="35" y1="138" x2="75" y2="138" stroke="#1e40af" strokeWidth="1" opacity="0.3" />
          <text x="55" y="152" textAnchor="middle" fontSize="6.5" fill="#3b82f6" fontFamily="Arial, sans-serif">HYDRA SHAKERS</text>
          <text x="55" y="163" textAnchor="middle" fontSize="5.5" fill="#94a3b8" fontFamily="Arial, sans-serif">800ml</text>
          <text x="55" y="188" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="Arial, sans-serif">din text, din stil</text>
        </>
      )}

      {showText && showImage && (
        // Text + image
        <>
          {/* Small image top */}
          <rect x="34" y="103" width="42" height="32" rx="3" fill="#dbeafe" />
          <path d="M38 128 L44 118 L50 124 L57 114 L64 128 Z" fill="#93c5fd" />
          <circle cx="41" cy="112" r="3.5" fill="#3b82f6" />
          {/* Text below image */}
          <text x="55" y="148" textAnchor="middle" fontSize="7.5" fill="#1e3a8a" fontFamily="Arial Black, sans-serif" fontWeight="900">
            {label.length > 9 ? label.slice(0, 9) : label || 'DIN TEXT'}
          </text>
          {(label.length > 9) && (
            <text x="55" y="159" textAnchor="middle" fontSize="7.5" fill="#1e3a8a" fontFamily="Arial Black, sans-serif" fontWeight="900">
              {label.slice(9, 18)}
            </text>
          )}
          <line x1="35" y1="164" x2="75" y2="164" stroke="#1e40af" strokeWidth="1" opacity="0.3" />
          <text x="55" y="176" textAnchor="middle" fontSize="6" fill="#3b82f6" fontFamily="Arial, sans-serif">HYDRA SHAKERS</text>
          <text x="55" y="188" textAnchor="middle" fontSize="5.5" fill="#94a3b8" fontFamily="Arial, sans-serif">text & bild combo</text>
        </>
      )}
    </svg>
  )
}

// ─── Pricing tier data ───────────────────────────────────────────────────────
const tiers = [
  {
    name: 'Bara Text',
    price: 120,
    icon: Type,
    showText: true,
    showImage: false,
    color: 'from-blue-700 to-blue-500',
    border: 'border-blue-500/40',
    glow: 'hover:shadow-blue-500/20',
    features: ['Valfri text', 'Välj typsnitt', 'Välj textfärg', 'Upp till 2 rader'],
  },
  {
    name: 'Med Bild',
    price: 130,
    icon: Image,
    showText: false,
    showImage: true,
    color: 'from-indigo-600 to-blue-500',
    border: 'border-indigo-400/50',
    glow: 'hover:shadow-indigo-500/25',
    popular: true,
    features: ['Valfri bild/logga', 'Hög upplösning', 'Valfri placering', 'Upp till 2 bilder'],
  },
  {
    name: 'Text & Bild',
    price: 140,
    icon: Layers,
    showText: true,
    showImage: true,
    color: 'from-blue-600 to-cyan-500',
    border: 'border-cyan-400/40',
    glow: 'hover:shadow-cyan-500/20',
    features: ['Text + bild kombination', 'Full anpassning', 'Premium placering', 'Allt inkluderat'],
  },
]

// ─── Main component ──────────────────────────────────────────────────────────
export default function Pricing() {
  const [previewText, setPreviewText] = useState('')

  return (
    <section
      id="priser"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#060810' }}
    >
      {/* Gym background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80'), url('/gym-hero-bg.svg')",
        }}
      />
      <div className="absolute inset-0 bg-[#060810]/85" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            Priser & Beställning
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Designa{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)' }}
            >
              din shaker
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Perfect Shaker Activ 800ml — välj din anpassningsnivå nedan.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.name}
                className={`relative group flex flex-col bg-[#0d1220] border ${tier.border} rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${tier.glow} ${tier.popular ? 'ring-2 ring-blue-500/60' : ''}`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 text-center py-1.5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white text-xs font-bold tracking-widest uppercase">
                    Mest Populär
                  </div>
                )}

                <div className={`p-6 pt-${tier.popular ? '10' : '6'}`}>
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} shadow-lg`}>
                      <Icon size={18} className="text-white" strokeWidth={2} />
                    </div>
                    <span className="text-white font-bold text-lg">{tier.name}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-black text-white">{tier.price}</span>
                    <span className="text-blue-300 text-lg font-semibold ml-1">kr</span>
                    <p className="text-gray-500 text-sm mt-1">per shaker · inkl. moms</p>
                  </div>

                  {/* Shaker mockup */}
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-64 relative">
                      <ShakerMockup
                        showText={tier.showText}
                        showImage={tier.showImage}
                        customText={previewText}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <Check size={15} className="text-blue-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="https://www.instagram.com/hydrashakers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 bg-gradient-to-r ${tier.color} hover:opacity-90 hover:scale-105 shadow-lg`}
                  >
                    <Instagram size={15} />
                    Beställ via Instagram
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Live preview section */}
        <div className="bg-[#0d1220] border border-blue-500/20 rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Förhandsgranska din design</h3>
            <p className="text-gray-400 text-sm">Skriv din text nedan och se hur det ser ut på shakern</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Input side */}
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Din text</label>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="T.ex. BEAST MODE"
                  maxLength={18}
                  className="w-full bg-[#070a14] border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors duration-200"
                />
                <p className="text-gray-600 text-xs mt-1">{previewText.length}/18 tecken</p>
              </div>

              {/* Image upload placeholder */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Din bild <span className="text-gray-500 font-normal">(skickas via Instagram)</span></label>
                <div className="w-full bg-[#070a14] border border-dashed border-white/15 rounded-xl px-4 py-6 text-center text-gray-600 text-sm">
                  Skicka din logga/bild direkt till{' '}
                  <a href="https://www.instagram.com/hydrashakers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@hydrashakers</a>
                </div>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed">
                Beställ via Instagram — kontakta oss med din text och/eller bild, så återkommer vi med en beräknad leveranstid.
              </p>
            </div>

            {/* Shaker preview */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">Förhandsgranskning</p>
              <div className="w-32 h-72 relative">
                <ShakerMockup showText showImage={false} customText={previewText || 'DIN TEXT'} />
              </div>
              <p className="text-gray-600 text-xs">Text & Bild-versionen uppdateras live</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
