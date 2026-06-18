import { Pencil, Hammer, PackageCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Pencil,
    title: 'Välj din gymstil',
    description: 'Berätta hur du vill ha din flaska. Färger, text, din gym-identitet.',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Vi tillverkar den',
    description: 'Vårt team skapar din unika flaska med omsorg och precision. Varje detalj görs med kärlek.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Redo för nästa pass',
    description: 'Din personliga flaska levereras hem. Redo att hysa i gymmet.',
  },
]

export default function HowItWorks() {
  return (
    <section id="hur-det-fungerar" className="py-24 px-4 bg-[#060c1a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            Processen
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Hur det{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)',
              }}
            >
              fungerar
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tre enkla steg för att få din drömflaska. Det har aldrig varit enklare.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.75rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-400 to-blue-600/0 opacity-50 blur-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative flex flex-col items-center text-center group">
                  {/* Step number circle */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 scale-150 group-hover:border-blue-500/40 transition-all duration-300" />
                    {/* Inner circle */}
                    <div className="relative w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-900/50 flex items-center justify-center group-hover:shadow-blue-600/30 transition-shadow duration-300">
                      <Icon size={24} className="text-white" strokeWidth={1.5} />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#060c1a] border border-blue-500/50 flex items-center justify-center">
                      <span className="text-blue-400 text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>

                  {/* Step number label */}
                  <span className="text-blue-600/40 text-xs font-bold tracking-widest uppercase mb-2">{step.number}</span>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>

                  {/* Vertical connector (mobile) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-8 w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-blue-500/10" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA below steps */}
        <div className="text-center mt-16">
          <a
            href="https://www.instagram.com/hydrashakers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-8 py-4 text-base transition-all duration-200 shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            Kom igång nu →
          </a>
        </div>
      </div>
    </section>
  )
}
