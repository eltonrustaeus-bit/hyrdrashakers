'use client'

import { useState } from 'react'
import { Check, Type, Image, Layers, Instagram } from 'lucide-react'

// ─── Pricing tier data ───────────────────────────────────────────────────────
const tiers = [
  {
    name: 'Bara Text',
    price: 120,
    icon: Type,
    image: '/shaker-white.jpg',
    color: 'from-blue-700 to-blue-500',
    border: 'border-blue-500/40',
    glow: 'hover:shadow-blue-500/20',
    features: ['Valfri text', 'Välj typsnitt', 'Välj textfärg', 'Upp till 2 rader'],
  },
  {
    name: 'Med Bild',
    price: 130,
    icon: Image,
    image: '/shaker-clear.jpg',
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
    image: '/shaker-black.jpg',
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
                  <div className="absolute top-0 left-0 right-0 text-center py-1.5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white text-xs font-bold tracking-widest uppercase z-10">
                    Mest Populär
                  </div>
                )}

                <div className={`p-6 ${tier.popular ? 'pt-10' : 'pt-6'} flex flex-col flex-1`}>
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

                  {/* Product photo */}
                  <div className="flex justify-center mb-6">
                    <div className="w-36 h-48 relative rounded-xl overflow-hidden bg-white/5">
                      <img
                        src={tier.image}
                        alt={`Perfect Shaker Activ 800ml – ${tier.name}`}
                        className="w-full h-full object-contain object-center p-2"
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Din bild <span className="text-gray-500 font-normal">(skickas via Instagram)</span>
                </label>
                <div className="w-full bg-[#070a14] border border-dashed border-white/15 rounded-xl px-4 py-6 text-center text-gray-600 text-sm">
                  Skicka din logga/bild direkt till{' '}
                  <a
                    href="https://www.instagram.com/hydrashakers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    @hydrashakers
                  </a>
                </div>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed">
                Beställ via Instagram — kontakta oss med din text och/eller bild, så återkommer vi med en beräknad leveranstid.
              </p>
            </div>

            {/* Shaker preview */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">Förhandsgranskning</p>
              <div className="w-40 h-52 relative rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                <img
                  src="/shaker-white.jpg"
                  alt="Perfect Shaker Activ 800ml"
                  className="w-full h-full object-contain p-3"
                />
                {previewText && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="text-blue-900 font-black text-center leading-tight px-2"
                      style={{
                        fontSize: previewText.length > 10 ? '10px' : '13px',
                        textShadow: '0 0 8px rgba(255,255,255,0.8)',
                        maxWidth: '80px',
                        wordBreak: 'break-word',
                      }}
                    >
                      {previewText.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-xs text-center max-w-[140px]">
                {previewText ? `"${previewText.toUpperCase()}" visas på shakern` : 'Skriv din text för att förhandsgranska'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
