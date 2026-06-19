'use client'

import { useState, useRef } from 'react'
import { Check, Instagram, Type, Image as ImageIcon } from 'lucide-react'

interface ColorPreset {
  name: string
  body: string
  lid: string
  text: string
}

const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Vit',      body: '#eaeaea', lid: '#1a1a2e', text: '#1e3a8a' },
  { name: 'Klar',     body: '#c4dff2', lid: '#111827', text: '#1e3a8a' },
  { name: 'Svart',    body: '#1c1c2e', lid: '#0a0a18', text: '#93c5fd' },
  { name: 'Marinblå', body: '#1e3a8a', lid: '#0f2a6e', text: '#ffffff' },
  { name: 'Röd',      body: '#b91c1c', lid: '#7f1d1d', text: '#ffffff' },
  { name: 'Lila',     body: '#6d28d9', lid: '#4c1d95', text: '#ffffff' },
  { name: 'Grön',     body: '#065f46', lid: '#064e3b', text: '#ffffff' },
  { name: 'Rosa',     body: '#be185d', lid: '#831843', text: '#ffffff' },
]

function shift(hex: string, amt: number): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return hex
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  const c = (v: number) => Math.max(0, Math.min(255, v + amt))
  return `rgb(${c(r)},${c(g)},${c(b)})`
}

function Shaker3D({ preset, labelText, hasImage }: { preset: ColorPreset; labelText: string; hasImage: boolean }) {
  const b = preset.body
  const l = preset.lid
  const tc = preset.text
  const uid = `${b}${l}`.replace(/#/g, '')
  const bDD = shift(b, -120); const bD = shift(b, -70)
  const bHL = shift(b, 115);  const bL = shift(b, 55)
  const lD  = shift(l, -40);  const lL = shift(l, 60)
  const showText = labelText.length > 0

  return (
    <svg viewBox="0 0 220 530" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`B${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={bDD} />
          <stop offset="9%"   stopColor={bD}  />
          <stop offset="22%"  stopColor={bHL} />
          <stop offset="38%"  stopColor={bL}  />
          <stop offset="58%"  stopColor={b}   />
          <stop offset="80%"  stopColor={bD}  />
          <stop offset="100%" stopColor={bDD} />
        </linearGradient>
        <linearGradient id={`BT${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={bL} />
          <stop offset="100%" stopColor={b}  stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`L${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={lD} />
          <stop offset="28%"  stopColor={lL} />
          <stop offset="58%"  stopColor={l}  />
          <stop offset="100%" stopColor={lD} />
        </linearGradient>
        <linearGradient id={`LB${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#d4d4d4" />
          <stop offset="14%"  stopColor="#ffffff" />
          <stop offset="86%"  stopColor="#f4f4f4" />
          <stop offset="100%" stopColor="#d0d0d0" />
        </linearGradient>
        <linearGradient id={`R${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={shift(l, -60)} />
          <stop offset="30%"  stopColor={shift(l, 20)}  />
          <stop offset="70%"  stopColor={l}             />
          <stop offset="100%" stopColor={shift(l, -60)} />
        </linearGradient>
        <radialGradient id={`FS${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.5)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)"   />
        </radialGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="110" cy="492" rx="74" ry="12" fill={`url(#FS${uid})`} />

      {/* Body */}
      <path d="M58,148 L45,472 Q45,484 60,484 L160,484 Q175,484 175,472 L162,148 Z" fill={`url(#B${uid})`} />
      <ellipse cx="110" cy="148" rx="52" ry="11" fill={`url(#BT${uid})`} />
      <ellipse cx="110" cy="481" rx="66" ry="9"  fill={bDD} opacity="0.5" />

      {/* Specular highlights */}
      <path d="M78,152 Q75,230 76,410 Q76.5,440 78,462 L83,461 Q81.5,439 81,410 Q80,230 83,152 Z" fill="rgba(255,255,255,0.28)" />
      <path d="M86,154 Q84,250 85,420 L88,419 Q87,250 89,154 Z" fill="rgba(255,255,255,0.10)" />
      <path d="M160,150 L170,468 Q171,482 163,483 L158,483 Q167,482 167,468 L158,151 Z" fill="rgba(0,0,0,0.18)" />

      {/* Label */}
      <rect x="55" y="208" width="110" height="168" rx="7" fill={`url(#LB${uid})`} />
      <rect x="55" y="208" width="110" height="10"  rx="7" fill="rgba(0,0,0,0.06)" />
      <rect x="55" y="208" width="110" height="168" rx="7" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" fill="none" />

      {/* Label: empty */}
      {!showText && !hasImage && (
        <>
          <text x="110" y="283" textAnchor="middle" fontSize="9.5" fill="#c8d0dc" fontFamily="Arial, sans-serif" letterSpacing="1.5">DIN DESIGN</text>
          <line x1="74" y1="292" x2="146" y2="292" stroke="#dde3ec" strokeWidth="0.6" />
          <text x="110" y="354" textAnchor="middle" fontSize="7.5" fill="#c8d0dc" fontFamily="Arial, sans-serif">HYDRA SHAKERS · 800ml</text>
        </>
      )}

      {/* Label: text only */}
      {showText && !hasImage && (
        <>
          <text x="110" y={labelText.length > 10 ? "258" : "268"} textAnchor="middle" fill={tc} fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize={labelText.length > 14 ? "11" : labelText.length > 9 ? "14" : "17"}>
            {labelText.slice(0, 14).toUpperCase()}
          </text>
          {labelText.length > 14 && (
            <text x="110" y="276" textAnchor="middle" fill={tc} fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11">
              {labelText.slice(14, 28).toUpperCase()}
            </text>
          )}
          <line x1="70" y1="290" x2="150" y2="290" stroke={tc} strokeWidth="0.5" opacity="0.2" />
          <text x="110" y="318" textAnchor="middle" fontSize="7.5" fill="#3b82f6" fontFamily="Arial, sans-serif">HYDRA SHAKERS</text>
          <text x="110" y="332" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="Arial, sans-serif">800ml · din stil</text>
        </>
      )}

      {/* Label: image only */}
      {!showText && hasImage && (
        <>
          <rect x="68" y="218" width="84" height="64" rx="4" fill="#dbeafe" />
          <path d="M76,274 L90,252 L103,265 L119,240 L140,274 Z" fill="#93c5fd" />
          <circle cx="83" cy="232" r="8" fill="#3b82f6" />
          <text x="110" y="305" textAnchor="middle" fontSize="10" fill={tc} fontFamily="Arial Black, sans-serif" fontWeight="900">DIN BILD</text>
          <text x="110" y="320" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="Arial, sans-serif">valfri design</text>
          <text x="110" y="355" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="Arial, sans-serif">HYDRA SHAKERS · 800ml</text>
        </>
      )}

      {/* Label: text + image */}
      {showText && hasImage && (
        <>
          <rect x="70" y="215" width="80" height="54" rx="3" fill="#dbeafe" />
          <path d="M76,260 L88,242 L99,253 L113,234 L130,260 Z" fill="#93c5fd" />
          <circle cx="82" cy="226" r="6" fill="#3b82f6" />
          <text x="110" y={labelText.length > 10 ? "281" : "288"} textAnchor="middle" fill={tc} fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize={labelText.length > 14 ? "10" : labelText.length > 9 ? "12" : "14"}>
            {labelText.slice(0, 14).toUpperCase()}
          </text>
          {labelText.length > 14 && (
            <text x="110" y="295" textAnchor="middle" fill={tc} fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="10">
              {labelText.slice(14, 28).toUpperCase()}
            </text>
          )}
          <line x1="70" y1="306" x2="150" y2="306" stroke={tc} strokeWidth="0.5" opacity="0.2" />
          <text x="110" y="330" textAnchor="middle" fontSize="7" fill="#3b82f6" fontFamily="Arial, sans-serif">HYDRA SHAKERS</text>
          <text x="110" y="343" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="Arial, sans-serif">text & bild</text>
        </>
      )}

      {/* Cap ring */}
      <path d="M58,134 L62,148 L158,148 L162,134 Z" fill={shift(l, -20)} />
      <ellipse cx="110" cy="134" rx="52" ry="11" fill={`url(#R${uid})`} />
      <ellipse cx="110" cy="148" rx="50" ry="6"  fill={shift(l, -45)} />

      {/* Lid */}
      <path d="M62,42 Q62,20 110,20 Q158,20 158,42 L158,134 L62,134 Z" fill={`url(#L${uid})`} />
      <ellipse cx="110" cy="42" rx="48" ry="13" fill={lL} opacity="0.55" />
      <ellipse cx="110" cy="42" rx="48" ry="13" stroke={shift(l, 55)} strokeWidth="1" fill="none" opacity="0.35" />
      <path d="M73,46 Q71,84 73,128 L77,127 Q75,84 77,46 Z" fill="rgba(255,255,255,0.18)" />
      <path d="M155,44 L157,130 L153,130 L151,44 Z" fill="rgba(0,0,0,0.12)" />

      {/* Spout */}
      <rect x="80" y="20" width="60" height="20" rx="6" fill={shift(l, -18)} />
      <ellipse cx="110" cy="20" rx="30" ry="8" fill={shift(l, 28)} opacity="0.5" />
      <rect x="92" y="6"  width="36" height="20" rx="7" fill={shift(l, -28)} />
      <rect x="96" y="2"  width="28" height="12" rx="6" fill={l} />
      <ellipse cx="110" cy="2" rx="14" ry="5" fill={lL} opacity="0.3" />

      {/* Lid clip */}
      <path d="M158,66 Q176,66 176,80 Q176,94 158,94 L158,89 Q171,89 171,80 Q171,71 158,71 Z" fill={shift(l, -12)} />

      {/* ActionRod handle */}
      <path d="M175,280 Q200,280 200,296 Q200,312 175,312" stroke={shift(b, -60)} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M175,280 Q200,280 200,296 Q200,312 175,312" stroke={shift(b, 30)}  strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.35" />

      {/* Measurement lines */}
      {[330, 375, 420].map(y => (
        <line key={y} x1="48" y1={y} x2="54" y2={y} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
      ))}
    </svg>
  )
}

export default function Pricing() {
  const [colorIdx, setColorIdx]     = useState(0)
  const [hasText, setHasText]       = useState(false)
  const [customText, setCustomText] = useState('')
  const [hasImage, setHasImage]     = useState(false)
  const shakerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const preset = COLOR_PRESETS[colorIdx]
  const price  = hasText && hasImage ? 140 : hasImage ? 130 : 120
  const labelText = hasText ? customText : ''

  const priceColor =
    price === 140 ? 'text-cyan-300' :
    price === 130 ? 'text-indigo-300' : 'text-white'

  function handleMouseMove(e: React.MouseEvent) {
    if (!shakerRef.current) return
    const rect = shakerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2)
    const y = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2)
    setTilt({ x: -y * 12, y: x * 18 })
  }
  function handleMouseLeave() { setTilt({ x: 0, y: 0 }) }

  const isReturning = tilt.x === 0 && tilt.y === 0

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
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Välj färg, lägg till text och bild — priset uppdateras i realtid.
          </p>
        </div>

        {/* Configurator grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: 3D preview ── */}
          <div className="flex flex-col items-center">
            <div
              ref={shakerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-52 h-80 sm:w-64 sm:h-96 cursor-pointer select-none"
              style={{
                transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isReturning
                  ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
                  : 'transform 0.08s linear',
                filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))',
                willChange: 'transform',
              }}
            >
              <Shaker3D preset={preset} labelText={labelText} hasImage={hasImage} />
            </div>

            {/* Color swatches */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">Välj färg</p>
              <div className="flex flex-wrap justify-center gap-3">
                {COLOR_PRESETS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    aria-label={c.name}
                    title={c.name}
                    className="w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none"
                    style={{
                      backgroundColor: c.body,
                      boxShadow: colorIdx === i
                        ? '0 0 0 3px rgba(255,255,255,0.95), 0 0 14px rgba(255,255,255,0.25)'
                        : '0 0 0 1.5px rgba(255,255,255,0.2)',
                      transform: colorIdx === i ? 'scale(1.18)' : undefined,
                    }}
                  />
                ))}
              </div>
              <p className="text-white text-sm font-medium tracking-wide">{preset.name}</p>
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
                    <p className="text-gray-500 text-xs mt-0.5">Valfri text · upp till 2 rader</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-gray-400 text-sm">ingår</span>
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
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="T.ex. BEAST MODE"
                    maxLength={28}
                    className="w-full bg-[#070a14] border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors duration-200"
                  />
                  <p className="text-gray-600 text-xs mt-2">{customText.length}/28 tecken · uppdateras live på shakern</p>
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
                    <p className="text-gray-500 text-xs mt-0.5">Logga, foto eller grafik · hög upplösning</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-indigo-400 text-sm">+10 kr</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${hasImage ? 'bg-indigo-600 border-indigo-600' : 'border-white/25'}`}>
                    {hasImage && <Check size={13} className="text-white" strokeWidth={2.5} />}
                  </div>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${hasImage ? 'max-h-40' : 'max-h-0'}`}>
                <div className="px-5 pb-5 pt-1">
                  <div className="bg-[#070a14] border border-dashed border-white/15 rounded-xl px-4 py-4 text-center text-gray-500 text-sm leading-relaxed">
                    Skicka din bild/logga via{' '}
                    <a href="https://www.instagram.com/hydrashakers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      @hydrashakers
                    </a>{' '}
                    när du beställer
                  </div>
                </div>
              </div>
            </div>

            {/* Summary + price + CTA */}
            <div className="bg-[#0d1220] border border-white/10 rounded-2xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-3">Vad ingår</p>
              <ul className="space-y-2 mb-5">
                {[
                  { label: 'Perfect Shaker Activ 800ml', show: true },
                  { label: 'BPA-fri & läcksäker design',  show: true },
                  { label: 'Anpassad text (valfri)',       show: hasText },
                  { label: 'Anpassad bild/logga',          show: hasImage },
                  { label: 'Hög tryckkvalitet',            show: hasImage },
                ].filter(i => i.show).map(item => (
                  <li key={item.label} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <Check size={14} className="text-blue-400 flex-shrink-0" />
                    {item.label}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black tabular-nums transition-colors duration-300 ${priceColor}`}>
                    {price}
                  </span>
                  <span className="text-blue-300 text-xl font-semibold">kr</span>
                  <span className="text-gray-500 text-sm ml-1">/ shaker · inkl. moms</span>
                </div>
                <p className="text-gray-600 text-xs mt-1">
                  {price === 120 && 'Baspris — lägg till text eller bild för att anpassa'}
                  {price === 130 && !hasText && 'Med bild (+10 kr)'}
                  {price === 130 && hasText && 'Med text (ingår i baspriset)'}
                  {price === 140 && 'Med text + bild (+20 kr totalt)'}
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
              <p className="text-gray-600 text-xs text-center mt-3 leading-relaxed">
                DM @hydrashakers med din design — vi återkommer med bekräftelse och leveranstid
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
