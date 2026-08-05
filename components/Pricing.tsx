'use client'

import { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import {
  Check, Instagram, Type, Image as ImageIcon, Upload, X,
  RotateCcw, Copy, ShieldCheck, Truck, Sparkles, AlertTriangle,
} from 'lucide-react'

/* ── Product ─────────────────────────────────────────────────────────── */

const VARIANTS = [
  { id: 'vit',   name: 'Vit',   photo: '/shaker-white-cut.png', glow: 'rgba(191,219,254,0.22)', light: true,
    chip: 'linear-gradient(145deg,#ffffff 0%,#e6ebf2 100%)' },
  { id: 'svart', name: 'Svart', photo: '/shaker-black-cut.png', glow: 'rgba(59,130,246,0.24)',  light: false,
    chip: 'linear-gradient(145deg,#2b2f36 0%,#0b0d11 100%)' },
]

const TEXT_COLORS = [
  { id: 'vit',   name: 'Vit',   swatch: '#ffffff', value: '#ffffff' },
  { id: 'svart', name: 'Svart', swatch: '#111111', value: '#0d0d0d' },
  { id: 'bla',   name: 'Blå',   swatch: '#3b82f6', value: '#2f6fe4' },
  { id: 'rod',   name: 'Röd',   swatch: '#ef4444', value: '#e02424' },
]

/* `factor` is only the first-paint estimate of average glyph advance; the real
   width is measured off the rendered glyphs so no font can overflow the print. */
const FONTS = [
  { id: 'sport',  name: 'Sport',  css: 'var(--font-bebas), Impact, sans-serif',   factor: 0.44, spacing: 0.06, weight: 400, upper: true  },
  { id: 'impact', name: 'Impact', css: 'var(--font-anton), Impact, sans-serif',   factor: 0.52, spacing: 0.02, weight: 400, upper: true  },
  { id: 'modern', name: 'Modern', css: 'var(--font-inter), Arial, sans-serif',    factor: 0.68, spacing: 0.03, weight: 900, upper: true  },
  { id: 'script', name: 'Script', css: 'var(--font-pacifico), cursive',           factor: 0.72, spacing: 0.00, weight: 400, upper: false },
]

const MAX_CHARS = 14
const MAX_UPLOAD_MB = 8

/* Print area as a share of the bottle image box, measured off the cutouts:
   the body runs x 26–90 % and y 24–100 %, so this sits on the flat front face. */
const PRINT = { left: 39, top: 31, width: 38, height: 56 }
/* viewBox matched to the print box's rendered aspect (bottle PNG is 487×900). */
const VB_W = 100
const VB_H = 272
const UID = 'hs-print'

/* ── Live print rendering ────────────────────────────────────────────── */

const PROBE = 100

function BottlePrint({
  text, font, color, vertical, artwork, light, fontEpoch,
}: {
  text: string
  font: typeof FONTS[number]
  color: string
  vertical: boolean
  artwork: string | null
  light: boolean
  fontEpoch: number
}) {
  /* The printable face is FACE wide and LEN tall on screen in both modes.
     Artwork always stacks above the text along the bottle's length; only the
     direction the text *runs* changes with the placement toggle. */
  const FACE = VB_W / 2
  const LEN  = VB_H / 2
  const both = Boolean(text && artwork)

  /* Measure the actual glyph run at a fixed probe size so the fitted size is
     exact for every typeface — estimates cannot survive a script face. */
  const probeRef = useRef<SVGTextElement>(null)
  const [unitWidth, setUnitWidth] = useState<number | null>(null)
  const display = font.upper ? text.toUpperCase() : text

  useLayoutEffect(() => {
    const el = probeRef.current
    if (!el || !display) { setUnitWidth(null); return }
    let w = 0
    try { w = el.getComputedTextLength() } catch { w = 0 }
    setUnitWidth(w > 0 ? w / PROBE : null)
  }, [display, font.id, font.spacing, fontEpoch])

  const perUnit = unitWidth ?? Math.max(display.length, 1) * (font.factor + font.spacing)

  // Split the bottle's length between the artwork and the text band.
  const artSize  = both
    ? Math.min(2 * FACE * 0.92, LEN * 0.95)
    : Math.min(2 * FACE * 0.85, 2 * LEN * 0.85)
  const gap      = LEN * 0.1
  const textBand = both ? 2 * LEN - artSize - 2 * gap : 2 * LEN

  // How far the glyph run may travel, and how tall it may be.
  const runLimit  = vertical ? textBand * 0.95 : 2 * FACE * 0.92
  const heightCap = vertical ? 2 * FACE * 0.85 : textBand * 0.85
  const size = Math.max(6, Math.min(runLimit / perUnit, heightCap, 48))

  // Positive = toward the lid, along the bottle's length.
  const stack    = both ? artSize + gap + textBand : 0
  const artPos   = both ?  (stack / 2 - artSize / 2)  : 0
  const textPos  = both ? -(stack / 2 - textBand / 2) : 0
  // After the -90° rotation local +x points up the bottle; unrotated, up is -y.
  const artXY    = vertical ? { x: artPos,  y: 0 } : { x: 0, y: -artPos }
  const textXY   = vertical ? { x: textPos, y: 0 } : { x: 0, y: -textPos }

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        {/* The print wraps around the barrel, so its edges fall away from view.
            Fading the ink itself sells the curve without painting a panel onto
            the bottle. */}
        <linearGradient id={`${UID}-fx`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0"    stopColor="#000" />
          <stop offset="0.10" stopColor="#8a8a8a" />
          <stop offset="0.26" stopColor="#fff" />
          <stop offset="0.74" stopColor="#fff" />
          <stop offset="0.90" stopColor="#8a8a8a" />
          <stop offset="1"    stopColor="#000" />
        </linearGradient>
        <linearGradient id={`${UID}-fy`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"    stopColor="#000" />
          <stop offset="0.06" stopColor="#fff" />
          <stop offset="0.94" stopColor="#fff" />
          <stop offset="1"    stopColor="#000" />
        </linearGradient>
        <mask id={`${UID}-mx`}>
          <rect width={VB_W} height={VB_H} fill={`url(#${UID}-fx)`} />
        </mask>
        <mask id={`${UID}-my`}>
          <rect width={VB_W} height={VB_H} fill={`url(#${UID}-fy)`} />
        </mask>
        <filter id={`${UID}-ink`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0.7" stdDeviation="0.6" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Off-screen probe used purely for glyph measurement. */}
      <text
        ref={probeRef}
        x={-9999}
        y={-9999}
        visibility="hidden"
        fontFamily={font.css}
        fontWeight={font.weight}
        fontSize={PROBE}
        letterSpacing={PROBE * font.spacing}
        style={{ whiteSpace: 'pre' }}
      >
        {display}
      </text>

      <g mask={`url(#${UID}-mx)`}>
        <g mask={`url(#${UID}-my)`}>
          <g transform={`translate(${VB_W / 2} ${VB_H / 2}) rotate(${vertical ? -90 : 0})`}>
            {artwork && (
              <image
                href={artwork}
                x={artXY.x - artSize / 2}
                y={artXY.y - artSize / 2}
                width={artSize}
                height={artSize}
                preserveAspectRatio="xMidYMid meet"
                filter={`url(#${UID}-ink)`}
              />
            )}
            {display && (
              <text
                x={textXY.x}
                y={textXY.y}
                dy="0.35em"
                textAnchor="middle"
                fill={color}
                fontFamily={font.css}
                fontWeight={font.weight}
                fontSize={size}
                letterSpacing={size * font.spacing}
                stroke={light ? 'rgba(0,0,0,0.22)' : 'rgba(0,0,0,0.45)'}
                strokeWidth={size * 0.04}
                paintOrder="stroke"
                filter={`url(#${UID}-ink)`}
                style={{ whiteSpace: 'pre' }}
              >
                {display}
              </text>
            )}
          </g>
        </g>
      </g>
    </svg>
  )
}

/* ── Section ─────────────────────────────────────────────────────────── */

export default function Pricing() {
  const [variantIdx, setVariantIdx]   = useState(0)
  const [hasText, setHasText]         = useState(false)
  const [customText, setCustomText]   = useState('')
  const [fontIdx, setFontIdx]         = useState(1)
  const [textColorIdx, setTextColorIdx] = useState(1)
  const [vertical, setVertical]       = useState(true)
  const [hasImage, setHasImage]       = useState(false)
  const [artwork, setArtwork]         = useState<{ url: string; name: string } | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [copied, setCopied]           = useState<'email' | 'order' | null>(null)

  const fileRef    = useRef<HTMLInputElement>(null)
  const stageRef   = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  const variant = VARIANTS[variantIdx]
  const font    = FONTS[fontIdx]
  const color   = TEXT_COLORS[textColorIdx]

  const labelText = hasText ? customText.trim() : ''
  const printArt  = hasImage && artwork ? artwork.url : null
  const price     = hasText && hasImage ? 150 : hasImage ? 130 : 120

  /* White ink on a white bottle (or black on black) will not show up. */
  const lowContrast =
    Boolean(labelText) &&
    ((variant.light && color.id === 'vit') || (!variant.light && color.id === 'svart'))

  /* ── Object URL lifecycle ── */
  useEffect(() => {
    if (!artwork) return
    return () => URL.revokeObjectURL(artwork.url)
  }, [artwork])

  /* Webfonts arrive after first paint; re-measure the print text when they do. */
  const [fontEpoch, setFontEpoch] = useState(0)
  useEffect(() => {
    const fonts = typeof document !== 'undefined' ? (document as any).fonts : null
    if (!fonts) return
    let alive = true
    const bump = () => { if (alive) setFontEpoch(e => e + 1) }
    fonts.ready?.then(bump)
    fonts.addEventListener?.('loadingdone', bump)
    return () => { alive = false; fonts.removeEventListener?.('loadingdone', bump) }
  }, [])

  const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // let the same file be re-picked after a removal
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setUploadError('Filen måste vara en bild (JPG, PNG eller SVG).')
      return
    }
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setUploadError(`Bilden är för stor. Max ${MAX_UPLOAD_MB} MB.`)
      return
    }
    setUploadError('')
    setArtwork({ url: URL.createObjectURL(file), name: file.name })
    setHasImage(true)
  }, [])

  const removeArtwork = useCallback(() => {
    setArtwork(null)
    setUploadError('')
  }, [])

  /* ── 3D tilt (mouse hover + touch drag), rAF-throttled ── */
  const [tilt, setTilt]         = useState({ x: 0, y: 0 })
  const [settling, setSettling] = useState(true)
  const rafRef     = useRef<number | null>(null)
  const nextRef    = useRef({ x: 0, y: 0 })
  const draggingRef = useRef(false)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current) }
  }, [])

  const pushTilt = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      setTilt(nextRef.current)
    })
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (reduceMotion.current) return
    if (e.pointerType !== 'mouse' && !draggingRef.current) return
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const py = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    nextRef.current = {
      x: -Math.max(-1, Math.min(1, py)) * 9,
      y:  Math.max(-1, Math.min(1, px)) * 14,
    }
    setSettling(false)
    pushTilt()
  }, [pushTilt])

  const releaseTilt = useCallback(() => {
    draggingRef.current = false
    nextRef.current = { x: 0, y: 0 }
    setSettling(true)
    setTilt({ x: 0, y: 0 })
  }, [])

  /* ── Sticky mobile order bar, only while the configurator is on screen ── */
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '-80px 0px -140px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* ── Copy helpers ── */
  const orderSummary = useMemo(() => {
    const rows = [
      `Flaska: ${variant.name}`,
      hasText && labelText ? `Text: "${labelText}"` : 'Text: —',
      hasText && labelText ? `Typsnitt: ${font.name}` : null,
      hasText && labelText ? `Textfärg: ${color.name}` : null,
      hasText && labelText ? `Placering: ${vertical ? 'Vertikal' : 'Horisontell'}` : null,
      hasImage ? `Bild: Ja${artwork ? ` (${artwork.name})` : ''} – skickas med` : 'Bild: —',
      `Totalt: ${price} kr inkl. moms`,
    ].filter(Boolean)
    return `HYDRA SHAKERS – BESTÄLLNING\n\n${rows.join('\n')}`
  }, [variant, hasText, labelText, font, color, vertical, hasImage, artwork, price])

  const copy = useCallback((value: string, kind: 'email' | 'order') => {
    navigator.clipboard.writeText(value).then(
      () => {
        setCopied(kind)
        setTimeout(() => setCopied(null), 2500)
      },
      () => setUploadError('Kunde inte kopiera. Markera texten manuellt.'),
    )
  }, [])

  const reset = useCallback(() => {
    setVariantIdx(0)
    setHasText(false)
    setCustomText('')
    setFontIdx(1)
    setTextColorIdx(1)
    setVertical(true)
    setHasImage(false)
    setArtwork(null)
    setUploadError('')
  }, [])

  const hasChanges =
    variantIdx !== 0 || hasText || hasImage || customText !== '' || !vertical

  return (
    <section
      ref={sectionRef}
      id="priser"
      /* No overflow-hidden here: it would become the scroll container and stop
         the preview column from sticking. Every decorative layer is inset-0. */
      className="py-24 px-4 relative"
      style={{ backgroundColor: '#060810' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80'), url('/gym-hero-bg.svg')" }}
      />
      <div className="absolute inset-0 bg-[#060810]/90" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            Konfigurator
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Designa{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)' }}
            >
              din shaker
            </span>
          </h2>
          <p className="text-white/80 text-lg max-w-lg mx-auto">
            Välj flaska, lägg till text och din egen bild. Du ser resultatet direkt.
          </p>
        </div>

        {/* Block flow on mobile so the pinned preview stays put while the steps
            below it scroll; a two-column grid from lg up. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:items-start">

          {/* ── Preview stage (pinned) ── */}
          <div className="sticky top-16 lg:top-24 z-20 -mx-4 px-4 pt-2 pb-3 bg-[#060810] lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent">
            <div
              className="relative rounded-2xl sm:rounded-[2rem] px-4 py-4 sm:py-8 sm:px-8"
              style={{
                background: 'linear-gradient(165deg, rgba(17,28,64,0.85) 0%, rgba(5,8,20,0.95) 60%, rgba(3,5,12,0.98) 100%)',
                border: '1px solid rgba(59,130,246,0.28)',
                boxShadow: '0 0 0 1px rgba(59,130,246,0.06), 0 0 70px rgba(59,130,246,0.13), 0 28px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Overhead studio light */}
              <div
                className="absolute inset-x-0 top-0 h-2/3 pointer-events-none rounded-t-[2rem]"
                style={{ background: 'radial-gradient(ellipse 55% 100% at 50% 0%, rgba(147,197,253,0.14) 0%, transparent 72%)' }}
              />
              {[
                'top-3 left-3 border-t-2 border-l-2 rounded-tl-xl',
                'top-3 right-3 border-t-2 border-r-2 rounded-tr-xl',
                'bottom-3 left-3 border-b-2 border-l-2 rounded-bl-xl',
                'bottom-3 right-3 border-b-2 border-r-2 rounded-br-xl',
              ].map(cls => (
                <div key={cls} className={`hidden sm:block absolute w-5 h-5 border-blue-400/35 pointer-events-none ${cls}`} />
              ))}

              <div className="relative flex flex-col items-center">
                <div
                  ref={stageRef}
                  onPointerMove={onPointerMove}
                  onPointerDown={e => { draggingRef.current = true; e.currentTarget.setPointerCapture?.(e.pointerId) }}
                  onPointerUp={releaseTilt}
                  onPointerCancel={releaseTilt}
                  onPointerLeave={releaseTilt}
                  className="relative h-[270px] sm:h-[340px] lg:h-[500px] aspect-[487/900] select-none touch-pan-y"
                  style={{ cursor: 'grab' }}
                >
                  {/* Ambient halo */}
                  <div
                    className="absolute inset-0 -z-0 blur-3xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 65% 70% at 50% 50%, ${variant.glow} 0%, transparent 72%)` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                      transition: settling
                        ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
                        : 'transform 0.09s linear',
                      willChange: 'transform',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <img
                      key={variant.id}
                      src={variant.photo}
                      alt={`Perfect Shaker Activ 800 ml i färgen ${variant.name}`}
                      className="absolute inset-0 w-full h-full object-contain animate-fade-in-up"
                      draggable={false}
                      style={{ filter: 'drop-shadow(0 26px 34px rgba(0,0,0,0.65))' }}
                    />
                    {/* Live print, tilts together with the bottle */}
                    <div
                      className="absolute"
                      style={{
                        left: `${PRINT.left}%`,
                        top: `${PRINT.top}%`,
                        width: `${PRINT.width}%`,
                        height: `${PRINT.height}%`,
                      }}
                    >
                      {(labelText || printArt) && (
                        <BottlePrint
                          text={labelText}
                          font={font}
                          color={color.value}
                          vertical={vertical}
                          artwork={printArt}
                          light={variant.light}
                          fontEpoch={fontEpoch}
                        />
                      )}
                    </div>
                  </div>

                  {/* Contact shadow on the studio floor */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-14px] w-3/4 h-6 rounded-[50%] blur-md pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, transparent 70%)' }}
                  />
                </div>

                <p className="mt-3 sm:mt-6 text-white/45 text-[11px] tracking-wide">
                  Dra för att vrida flaskan
                </p>
              </div>
            </div>
          </div>

          {/* ── Configurator ── */}
          <div className="space-y-4 mt-6 lg:mt-0">

            {/* Step 1 — bottle */}
            <div className="bg-[#0d1220] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <p className="text-white font-semibold">Välj flaska</p>
                </div>
                {hasChanges && (
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-white/55 hover:text-white text-xs transition-colors rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <RotateCcw size={13} />
                    Nollställ
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {VARIANTS.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantIdx(i)}
                    aria-pressed={variantIdx === i}
                    className={`group rounded-xl border px-3 py-3 flex flex-col items-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      variantIdx === i
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/10 hover:border-white/30 bg-white/[0.02]'
                    }`}
                  >
                    <span
                      className="w-9 h-9 rounded-full border border-white/25 transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: v.chip,
                        boxShadow: variantIdx === i ? '0 0 0 2px rgba(96,165,250,0.85)' : undefined,
                      }}
                    />
                    <span className={`text-xs ${variantIdx === i ? 'text-white font-semibold' : 'text-white/60'}`}>
                      {v.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — text */}
            <div className={`bg-[#0d1220] border rounded-2xl overflow-hidden transition-colors duration-200 ${hasText ? 'border-blue-500/60' : 'border-white/10 hover:border-white/20'}`}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
                onClick={() => setHasText(v => !v)}
                aria-pressed={hasText}
                aria-expanded={hasText}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${hasText ? 'bg-blue-600' : 'bg-white/[0.07]'}`}>
                    <Type size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Lägg till text</p>
                    <p className="text-white/70 text-xs mt-0.5">Namn, motto eller klubb</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-blue-200 text-sm">{hasImage ? '+20 kr' : 'Ingår'}</span>
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${hasText ? 'bg-blue-600 border-blue-600' : 'border-white/25'}`}>
                    {hasText && <Check size={13} className="text-white" strokeWidth={2.5} />}
                  </span>
                </div>
              </button>

              {hasText && (
                <div className="px-5 pb-5 pt-1 space-y-4">
                  <div>
                    <label htmlFor="hs-text" className="sr-only">Din text på flaskan</label>
                    <input
                      id="hs-text"
                      type="text"
                      value={customText}
                      onChange={e => setCustomText(e.target.value)}
                      placeholder="T.ex. BEAST MODE"
                      maxLength={MAX_CHARS}
                      autoCapitalize="characters"
                      autoComplete="off"
                      /* 16px on small screens or iOS Safari zooms in on focus. */
                      className="w-full bg-[#070a14] border border-white/10 focus:border-blue-500/60 rounded-xl px-4 py-3 text-white placeholder-white/25 text-base sm:text-sm outline-none transition-colors duration-200"
                    />
                    <p className="text-white/50 text-xs mt-1.5 text-right tabular-nums">
                      {customText.length}/{MAX_CHARS} tecken
                    </p>
                  </div>

                  {/* Typeface */}
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-2">Typsnitt</p>
                    <div className="grid grid-cols-4 gap-2">
                      {FONTS.map((f, i) => (
                        <button
                          key={f.id}
                          onClick={() => setFontIdx(i)}
                          aria-pressed={fontIdx === i}
                          className={`rounded-xl border py-2.5 px-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                            fontIdx === i ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <span
                            className="block text-white text-lg leading-none"
                            style={{ fontFamily: f.css, fontWeight: f.weight }}
                          >
                            {f.upper ? 'Ag' : 'Ag'}
                          </span>
                          <span className={`block text-[10px] mt-1.5 ${fontIdx === i ? 'text-blue-200' : 'text-white/50'}`}>
                            {f.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colour */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-white/70 text-xs uppercase tracking-widest">Färg</p>
                    {/* Swatches are 28px but the button pads the hit area out to
                        44px so they stay tappable on a phone. */}
                    <div className="flex -m-2">
                      {TEXT_COLORS.map((c, i) => (
                        <button
                          key={c.id}
                          onClick={() => setTextColorIdx(i)}
                          aria-label={`Textfärg ${c.name}`}
                          aria-pressed={textColorIdx === i}
                          className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                          <span
                            className="block w-7 h-7 rounded-full border-2 transition-transform duration-150 hover:scale-110"
                            style={{
                              background: c.swatch,
                              borderColor: textColorIdx === i ? '#60a5fa' : 'rgba(255,255,255,0.22)',
                              boxShadow: textColorIdx === i ? '0 0 0 2px rgba(96,165,250,0.5)' : undefined,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-white/70 text-xs">{color.name}</span>
                  </div>

                  {/* Placement */}
                  <div className="flex items-center gap-3">
                    <p className="text-white/70 text-xs uppercase tracking-widest">Placering</p>
                    <div className="flex rounded-xl border border-white/10 overflow-hidden">
                      {[
                        { label: 'Vertikal', value: true },
                        { label: 'Horisontell', value: false },
                      ].map(opt => (
                        <button
                          key={opt.label}
                          onClick={() => setVertical(opt.value)}
                          aria-pressed={vertical === opt.value}
                          className={`px-3.5 py-2 text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 ${
                            vertical === opt.value ? 'bg-blue-600 text-white font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {lowContrast && (
                    <p className="flex items-start gap-2 text-amber-300/90 text-xs bg-amber-500/10 border border-amber-500/25 rounded-xl px-3 py-2.5">
                      <AlertTriangle size={14} className="flex-shrink-0 mt-px" />
                      {color.name} text syns knappt på en {variant.name.toLowerCase()} flaska. Välj en annan färg.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 — artwork */}
            <div className={`bg-[#0d1220] border rounded-2xl overflow-hidden transition-colors duration-200 ${hasImage ? 'border-indigo-500/60' : 'border-white/10 hover:border-white/20'}`}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
                onClick={() => setHasImage(v => !v)}
                aria-pressed={hasImage}
                aria-expanded={hasImage}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${hasImage ? 'bg-indigo-600' : 'bg-white/[0.07]'}`}>
                    <ImageIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Lägg till bild</p>
                    <p className="text-white/70 text-xs mt-0.5">Logga, foto eller grafik</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-indigo-300 text-sm">+{hasText ? 30 : 10} kr</span>
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${hasImage ? 'bg-indigo-600 border-indigo-600' : 'border-white/25'}`}>
                    {hasImage && <Check size={13} className="text-white" strokeWidth={2.5} />}
                  </span>
                </div>
              </button>

              {hasImage && (
                <div className="px-5 pb-5 pt-1 space-y-3">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={onFile}
                    className="hidden"
                  />

                  {artwork ? (
                    <div className="flex items-center gap-3 bg-[#070a14] border border-white/10 rounded-xl p-3">
                      <img
                        src={artwork.url}
                        alt="Din uppladdade bild"
                        className="w-14 h-14 rounded-lg object-contain bg-white/5 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-sm truncate">{artwork.name}</p>
                        <p className="text-emerald-400 text-xs mt-0.5">Visas på flaskan till vänster</p>
                      </div>
                      <button
                        onClick={removeArtwork}
                        aria-label="Ta bort bilden"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="w-full bg-[#070a14] border border-dashed border-white/20 hover:border-indigo-400/60 hover:bg-indigo-500/5 rounded-xl px-4 py-6 flex flex-col items-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Upload size={20} className="text-indigo-300" />
                      <span className="text-white text-sm font-medium">Ladda upp din bild</span>
                      <span className="text-white/50 text-xs">JPG, PNG eller SVG · max {MAX_UPLOAD_MB} MB</span>
                    </button>
                  )}

                  {uploadError && (
                    <p className="flex items-start gap-2 text-red-300 text-xs bg-red-500/10 border border-red-500/25 rounded-xl px-3 py-2.5">
                      <AlertTriangle size={14} className="flex-shrink-0 mt-px" />
                      {uploadError}
                    </p>
                  )}

                  <p className="text-white/55 text-xs leading-relaxed">
                    Förhandsvisningen sker i din webbläsare — bilden laddas inte upp någonstans.
                    Skicka originalfilen till oss via Instagram DM eller mejl när du beställer.
                  </p>
                </div>
              )}
            </div>

            {/* Step 4 — summary */}
            <div ref={summaryRef} className="bg-[#0d1220] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                <p className="text-white font-semibold">Din beställning</p>
              </div>

              <ul className="space-y-2 mb-5">
                {[
                  { label: `Perfect Shaker Activ 800 ml – ${variant.name}`, show: true },
                  { label: 'BPA-fri & läcksäker design', show: true },
                  { label: labelText ? `Text: “${labelText}” · ${font.name} · ${color.name}` : 'Text (skriv in ovan)', show: hasText },
                  { label: artwork ? `Bild: ${artwork.name}` : 'Bild/logga', show: hasImage },
                  { label: 'Hög tryckkvalitet', show: hasImage },
                ].filter(i => i.show).map(item => (
                  <li key={item.label} className="flex items-start gap-2.5 text-sm text-white">
                    <Check size={14} className="text-blue-400 flex-shrink-0 mt-1" />
                    <span className="min-w-0 break-words">{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tabular-nums text-white">{price}</span>
                  <span className="text-blue-300 text-xl font-semibold">kr</span>
                  <span className="text-white/70 text-sm ml-1">inkl. moms</span>
                </div>
                <p className="text-white/60 text-xs mt-1">
                  {!hasText && !hasImage && 'Baspris. Lägg till en bild för +10 kr.'}
                  {hasText  && !hasImage && 'Text ingår i baspriset.'}
                  {!hasText &&  hasImage && 'Bas 120 kr + bild 10 kr.'}
                  {hasText  &&  hasImage && 'Bas 120 kr + text och bild 30 kr.'}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => copy(orderSummary, 'order')}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-semibold text-white text-sm bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  {copied === 'order' ? (
                    <><Check size={17} className="text-emerald-400" /><span className="text-emerald-400">Beställning kopierad!</span></>
                  ) : (
                    <><Copy size={17} className="text-blue-300" />Kopiera din beställning</>
                  )}
                </button>

                <a
                  href="https://www.instagram.com/hydrashakers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-white text-base bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-all duration-200 shadow-xl shadow-blue-700/25 hover:shadow-blue-500/35 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <Instagram size={18} />
                  Beställ via Instagram
                </a>

                <button
                  onClick={() => copy('hydrashakers@gmail.com', 'email')}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-white text-base bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/25 transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  {copied === 'email' ? (
                    <><Check size={18} className="text-emerald-400" /><span className="text-emerald-400">Kopierat!</span></>
                  ) : (
                    <>
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      hydrashakers@gmail.com
                    </>
                  )}
                </button>
              </div>

              <p className="text-white/65 text-xs text-center mt-4 leading-relaxed">
                Kopiera din beställning, klistra in den i ett DM på Instagram eller i ett mejl
                och bifoga din bild. Vi återkommer med bekräftelse och leveranstid.
                Betalning sker via Swish.
              </p>

              {/* Trust row sits with the CTA rather than the preview, which keeps
                  the pinned preview short enough to be useful on a phone. */}
              <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/10">
                {[
                  { icon: ShieldCheck, label: 'BPA-fri' },
                  { icon: Truck,       label: 'Skickas i Sverige' },
                  { icon: Sparkles,    label: 'Handgjord design' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                    <Icon size={16} className="text-blue-400" />
                    <span className="text-white/70 text-[10px] sm:text-[11px] leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clearance for the fixed order bar */}
            <div className="h-20 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Sticky order bar on small screens */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${inView ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-hidden={!inView}
      >
        <div className="bg-[#080d19]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center gap-3">
          <div className="flex-shrink-0">
            <p className="text-white text-xl font-black tabular-nums leading-none">
              {price} <span className="text-blue-300 text-sm font-semibold">kr</span>
            </p>
            <p className="text-white/50 text-[10px] mt-0.5">{variant.name}{hasText && ' · text'}{hasImage && ' · bild'}</p>
          </div>
          <a
            href="https://www.instagram.com/hydrashakers"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={inView ? 0 : -1}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg shadow-blue-700/25"
          >
            <Instagram size={16} />
            Beställ nu
          </a>
        </div>
      </div>
    </section>
  )
}
