import { Droplets, Lock, Thermometer, Palette } from 'lucide-react'

const features = [
  {
    icon: Droplets,
    title: 'BPA-fri & Säker',
    description: '100% fri från skadliga ämnen. Säker för daglig träning och gjord för att hålla länge.',
    gradient: 'from-blue-600 to-blue-400',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: Lock,
    title: 'Läcksäker Design',
    description: 'Kasta den i gymväskan utan att tänka en sekund. Tål smällar, stötar och svettig träning.',
    gradient: 'from-indigo-600 to-blue-500',
    glow: 'shadow-indigo-500/20',
  },
  {
    icon: Thermometer,
    title: '800 ml Kapacitet',
    description: 'Rymmer mer än nog för ett helt träningspass. Stort nog att räcka, lätt nog att bära.',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: Palette,
    title: '100% Personlig',
    description: 'Ingen flaska är den andra lik. Välj din design och visa din gymstil.',
    gradient: 'from-blue-700 to-blue-500',
    glow: 'shadow-blue-600/20',
  },
]

export default function Features() {
  return (
    <section
      id="om-oss"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#07090f' }}
    >
      {/* Gym background photo — workout/training scene */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1920&q=80'), url('/gym-section-bg.svg')",
        }}
      />
      <div className="absolute inset-0 bg-[#07090f]/80" />

      {/* Section dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            Fördelar
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Varför{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)',
              }}
            >
              Hydra Shakers?
            </span>
          </h2>
          <p className="text-blue-100/70 text-lg max-w-2xl mx-auto">
            Byggd för gymmet. Designad för dig. Vi kombinerar prestanda och stil utan kompromiss.
          </p>
        </div>

        {/* Feature Cards — 2x2 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative bg-[#0d1220] border border-white/10 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.glow} mb-6`}>
                  <Icon size={26} className="text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-blue-600/0 group-hover:bg-blue-600/3 transition-all duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
