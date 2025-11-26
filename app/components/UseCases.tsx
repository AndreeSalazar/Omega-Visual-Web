'use client'

import { motion } from 'framer-motion'
import { HardDrive, Settings, Gamepad2, Shield, Building2, Cpu } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const useCaseIcons = [
  HardDrive,
  Settings,
  Gamepad2,
  Shield,
  Building2,
  Cpu,
]

export default function UseCases() {
  const { t } = useI18n()
  
  return (
    <section id="use-cases" className="py-32 bg-gradient-to-b from-background via-surface/40 to-background relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(224,231,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(224,231,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient tracking-tight"
            style={{
              textShadow: '0 4px 40px rgba(0, 217, 255, 0.3)',
            }}
          >
            {t.useCases.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {t.useCases.subtitle || 'Solving complex computing challenges through visual node composition'}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.useCases.items.map((useCase, index) => {
            const Icon = useCaseIcons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="glass-effect-premium p-8 rounded-2xl border-2 border-text/20 hover:border-primary/60 transition-all group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/30"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-secondary/0 group-hover:from-primary/8 group-hover:via-primary/5 group-hover:to-secondary/8 transition-all duration-700" />
                
                {/* Corner accent glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />

                <div className="relative z-10">
                  {/* Icon container */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/50 rounded-xl flex items-center justify-center mb-5 group-hover:glow-primary transition-all shadow-lg border-2 border-primary/40"
                  >
                    <Icon className="text-white" size={32} strokeWidth={2.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-text group-hover:text-primary transition-colors leading-tight">
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text/75 mb-5 leading-relaxed group-hover:text-text/95 transition-colors text-base">
                    {useCase.description}
                  </p>

                  {/* Example */}
                  <div className="pt-4 border-t border-text/10 group-hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-xs font-semibold uppercase tracking-wide mt-0.5">
                        {t.useCases.exampleLabel || 'Example'}
                      </span>
                      <p className="text-sm text-text/60 italic group-hover:text-text/80 transition-colors flex-1">
                        {useCase.example}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

