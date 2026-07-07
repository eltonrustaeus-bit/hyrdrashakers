'use client'

import { useState, useRef } from 'react'
import { Check, Instagram, Type, Image as ImageIcon } from 'lucide-react'

const TEXT_COLORS = [
  {
    name: 'Vit',
    swatch: '#ffffff',
    value: '#ffffff',
    stroke: '0.5px rgba(0,0,0,0.7)',
    shadow: '0 0 6px rgba(255,255,255,0.6), 0 1px 4px rgba(0,0,0,0.9)',
  },
  {
    name: 'Svart',
    swatch: '#111111',
    value: '#111111',
    stroke: '0.5px rgba(255,255,255,0.25)',
    shadow: '0 1px 3px rgba(0,0,0,0.6)',
  },
  {
    name: 'Blå',
    swatch: '#3b82f6',
    value: '#60a5fa',
    stroke: '0.5px rgba(0,0,0,0.8)',
    shadow: '0 0 8px rgba(59,130,246,0.9), 0 0 18px rgba(59,130,246,0.5), 0 1px 4px rgba(0,0,0,0.9)',
  },
]

const VARIANTS = [
  {
    name: 'Vit',
    photo: '/shaker-white2.jpg',
    textColor: '#1a3a7a',
    textStroke: '0.4px rgba(255,255,255,0.8)',
    textShadow: '0 0 6px rgba(255,255,255,0.9), 0 1px 3px rgba(255,255,255,0.7)',
    glowColor: 'rgba(147,197,253,0.18)',
  },
  {
    name: 'Svart',
    photo: '/shaker-black.jpg',
    textColor: '#93c5fd',
    textStroke: '0.4px rgba(0,0,0,0.9)',
    textShadow: '0 0 8px rgba(59,130,246,0.9), 0 0 16px rgba(59,130,246,0.5), 0 1px 3px rgba(0,0,0,0.9)',
    glowColor: 'rgba(59,130,246,0.20)',
  },
]

export default function Pricing() {
  const [variantIdx, setVariantIdx] = useState(0)
  const [hasText, setHasText]         = useState(false)
  const [customText, setCustomText]   = useState('')
  const [hasImage, setHasImage]       = useState(false)
  const [textColorIdx, setTextColorIdx] = useState(1)

  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const variant     = VARIANTS[variantIdx]
  const price       = (hasText && hasImage) ? 140 : hasImage ? 130 : 120
  const labelText   = hasText ? customText : ''
  const isReturning = tilt.x === 0 && tilt.y === 0

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
    const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
    setTilt({ x: -y * 10, y: x * 14 })
  }
  function handleMouseLeave() { setTilt({ x: 0, y: 0 }) }

  return (
    <section id="priser" className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: '#060810' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80'), url('/gym-hero-bg.svg')",
      }} />
      <div className="absolute inset-0 bg-[#060810]/88" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            Konfigurator
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Designa{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)' }}>
              din shaker
            </span>
          </h2>
          <p className="text-white text-lg max-w-lg mx-auto">
            Välj färg, lägg till text eller bild.
          </p>
        </div>

        {/* Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Real product photo ── */}
          <div className="flex flex-col items-center">

            {/* Glowing card frame */}
            <div
              className="relative rounded-[2rem] p-6 sm:p-8 mb-0"
              style={{
                background: 'linear-gradient(160deg, rgba(15,25,60,0.75) 0%, rgba(4,6,18,0.90) 100%)',
                border: '1px solid rgba(59,130,246,0.30)',
                boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 0 60px rgba(59,130,246,0.14), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              {/* Spotlight from top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 pointer-events-none rounded-t-[2rem] overflow-hidden"
                style={{ background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.10) 0%, transparent 70%)' }}
              />
              {/* Corner accent — top left */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl pointer-events-none" />
              {/* Corner accent — top right */}
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-blue-400/40 rounded-tr-xl pointer-events-none" />
              {/* Corner accent — bottom left */}
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-blue-400/30 rounded-bl-xl pointer-events-none" />
              {/* Corner accent — bottom right */}
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-blue-400/30 rounded-br-xl pointer-events-none" />

            {/* Photo with 3D tilt + text overlay */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-56 h-72 sm:w-72 sm:h-[420px] cursor-pointer select-none"
            >
              {/* Bottle — tilts with mouse */}
              <div
                className="absolute inset-0"
                style={{
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: isReturning
                    ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
                    : 'transform 0.08s linear',
                  willChange: 'transform',
                  filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 32px rgba(59,130,246,0.40))',
                }}
              >
                {/* Ambient glow halo behind bottle */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full blur-2xl scale-75"
                  style={{ background: `radial-gradient(ellipse 70% 80% at 50% 55%, ${variant.glowColor} 0%, transparent 70%)` }}
                />
                {/* Real product photo */}
                <img
                  src={variant.photo}
                  alt={`Perfect Shaker Activ 800ml – ${variant.name}`}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Text overlay — rotated along bottle, always stays flat (no 3D tilt) */}
              {(labelText || hasImage) && (
                <div
                  className="absolute pointer-events-none flex items-center justify-center rounded-lg"
                  style={{
                    top: '25%', bottom: '15%', left: '32%', right: '32%',
                    zIndex: 20,
                    background: 'rgba(0,0,0,0.22)',
                    backdropFilter: 'blur(1px)',
                    transform: 'rotate(-90deg)',
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-1 w-full px-1">
                    {labelText && (
                      <span
                        className="font-black text-center leading-tight tracking-widest block w-full"
                        style={{
                          color: TEXT_COLORS[textColorIdx].value,
                          fontSize: labelText.length > 14 ? '12px' : labelText.length > 9 ? '18px' : '26px',
                          textShadow: TEXT_COLORS[textColorIdx].shadow,
                          WebkitTextStroke: TEXT_COLORS[textColorIdx].stroke,
                          whiteSpace: 'nowrap',
                          fontFamily: 'Arial Black, sans-serif',
                          paintOrder: 'stroke fill',
                        }}
                      >
                        {labelText.toUpperCase()}
                      </span>
                    )}
                    {hasImage && (
                      <span
                        className="block text-center"
                        style={{
                          fontSize: '10px',
                          color: TEXT_COLORS[textColorIdx].value,
                          opacity: 0.8,
                          textShadow: TEXT_COLORS[textColorIdx].shadow,
                          fontFamily: 'Arial, sans-serif',
                          letterSpacing: '0.08em',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {labelText ? '+ DIN BILD' : '[ DIN BILD ]'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            </div>{/* end card frame */}

            {/* Order info */}
            <div className="mt-5 text-center space-y-1">
              <p className="text-white/70 text-xs">
                Skicka din bild via{' '}
                <a href="https://www.instagram.com/hydrashakers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Instagram DM till @hydrashakers
                </a>
              </p>
              <p className="text-white/70 text-xs">Betalning sker via Swish</p>
            </div>

            {/* Variant selector */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-white/80 text-xs uppercase tracking-widest font-medium">Välj variant</p>
              <div className="flex gap-5">
                {VARIANTS.map((v, i) => (
                  <button
                    key={v.name}
                    onClick={() => setVariantIdx(i)}
                    className="flex flex-col items-center gap-2 group focus:outline-none"
                  >
                    <div
                      className="w-10 h-10 rounded-full transition-all duration-200 group-hover:scale-110 border border-white/20"
                      style={{
                        backgroundImage: `url(${v.photo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: variantIdx === i
                          ? '0 0 0 3px rgba(255,255,255,0.95), 0 0 16px rgba(255,255,255,0.2)'
                          : undefined,
                        transform: variantIdx === i ? 'scale(1.18)' : undefined,
                      }}
                    />
                    <span className={`text-xs transition-colors ${variantIdx === i ? 'text-white font-semibold' : 'text-white/35 group-hover:text-white/65'}`}>
                      {v.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Config panel ── */}
          <div className="space-y-4">

            {/* Text option */}
            <div className={`bg-[#0d1220] border rounded-2xl overflow-hidden transition-colors duration-200 ${hasText ? 'border-blue-500/60' : 'border-white/10 hover:border-white/20'}`}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setHasText(v => !v)}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${hasText ? 'bg-blue-600' : 'bg-white/[0.07]'}`}>
                    <Type size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Lägg till text</p>
                    <p className="text-white/70 text-xs mt-0.5">Valfri text</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-blue-200 text-sm">ingår</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${hasText ? 'bg-blue-600 border-blue-600' : 'border-white/25'}`}>
                    {hasText && <Check size={13} className="text-white" strokeWidth={2.5} />}
                  </div>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${hasText ? 'max-h-40' : 'max-h-0'}`}>
                <div className="px-5 pb-5 pt-1">
                  <input
                    type="text"
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    placeholder="T.ex. BEAST MODE"
                    maxLength={28}
                    className="w-full bg-[#070a14] border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-colors duration-200"
                  />
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-white/70 text-xs">Textfärg:</span>
                    <div className="flex gap-2">
                      {TEXT_COLORS.map((c, i) => (
                        <button
                          key={c.name}
                          onClick={() => setTextColorIdx(i)}
                          title={c.name}
                          className="w-6 h-6 rounded-full border-2 transition-all duration-150 hover:scale-110 focus:outline-none"
                          style={{
                            background: c.swatch,
                            borderColor: textColorIdx === i ? '#60a5fa' : 'rgba(255,255,255,0.2)',
                            boxShadow: textColorIdx === i ? '0 0 0 2px rgba(96,165,250,0.5)' : undefined,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-white/70 text-xs">{TEXT_COLORS[textColorIdx].name}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">{customText.length}/28 tecken</p>
                </div>
              </div>
            </div>

            {/* Image option */}
            <div className={`bg-[#0d1220] border rounded-2xl overflow-hidden transition-colors duration-200 ${hasImage ? 'border-indigo-500/60' : 'border-white/10 hover:border-white/20'}`}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setHasImage(v => !v)}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${hasImage ? 'bg-indigo-600' : 'bg-white/[0.07]'}`}>
                    <ImageIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Lägg till bild</p>
                    <p className="text-white/70 text-xs mt-0.5">Logga, foto eller grafik</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-indigo-400 text-sm">+{hasText ? 20 : 10} kr</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${hasImage ? 'bg-indigo-600 border-indigo-600' : 'border-white/25'}`}>
                    {hasImage && <Check size={13} className="text-white" strokeWidth={2.5} />}
                  </div>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${hasImage ? 'max-h-40' : 'max-h-0'}`}>
                <div className="px-5 pb-5 pt-1">
                  <div className="bg-[#070a14] border border-dashed border-white/15 rounded-xl px-4 py-4 text-center text-white/80 text-sm leading-relaxed">
                    Skicka din bild via Instagram DM till{' '}
                    <a href="https://www.instagram.com/hydrashakers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      @hydrashakers
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary + price + CTA */}
            <div className="bg-[#0d1220] border border-white/10 rounded-2xl p-5">
              <p className="text-white/80 text-xs uppercase tracking-widest font-semibold mb-3">Vad ingår</p>
              <ul className="space-y-2 mb-5">
                {[
                  { label: 'Perfect Shaker Activ 800ml', show: true },
                  { label: 'BPA-fri & läcksäker design',  show: true },
                  { label: 'Anpassad text (valfri)',       show: hasText },
                  { label: 'Anpassad bild/logga',          show: hasImage },
                  { label: 'Hög tryckkvalitet',            show: hasImage },
                ].filter(i => i.show).map(item => (
                  <li key={item.label} className="flex items-center gap-2.5 text-sm text-white">
                    <Check size={14} className="text-blue-400 flex-shrink-0" />
                    {item.label}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tabular-nums transition-colors duration-300 text-white">
                    {price}
                  </span>
                  <span className="text-blue-300 text-xl font-semibold">kr</span>
                  <span className="text-white/70 text-sm ml-1">inkl. moms</span>
                </div>
                <p className="text-white/60 text-xs mt-1">
                  {!hasImage && !hasText && 'Baspris, lägg till bild för +10 kr'}
                  {!hasImage &&  hasText && 'Med text (ingår i priset)'}
                  {hasImage  && !hasText && 'Med bild, +10 kr extra'}
                  {hasImage  &&  hasText && 'Med text och bild, +20 kr extra'}
                </p>
              </div>

              <a
                href="https://www.instagram.com/hydrashakers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-white text-base bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-all duration-200 shadow-xl shadow-blue-700/25 hover:shadow-blue-500/35 hover:scale-[1.02]"
              >
                <Instagram size={18} />
                Beställ via Instagram
              </a>
              <p className="text-white/70 text-xs text-center mt-3 leading-relaxed">
                Skicka din text och/eller bild via DM på Instagram till @hydrashakers. Vi återkommer med bekräftelse och leveranstid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
