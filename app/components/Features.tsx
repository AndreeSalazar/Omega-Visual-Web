'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

export default function Features() {
  const { t, locale } = useI18n()
  
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background via-surface/30 to-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,107,53,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-black mb-4 text-gradient"
          >
            {t.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text/60 text-lg max-w-2xl mx-auto"
          >
            {locale === 'es' 
              ? 'Características diseñadas para desarrolladores profesionales'
              : 'Features designed for professional developers'}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {t.features.items.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`flex gap-5 glass-effect p-7 rounded-2xl border-2 transition-all group relative overflow-hidden ${
                feature.comingSoon
                  ? 'border-primary/60 hover:border-primary/90 bg-gradient-to-br from-primary/10 via-surface/60 to-secondary/10 shadow-2xl shadow-primary/20 hover:shadow-primary/30'
                  : 'border-text/20 hover:border-primary/60 bg-surface/40 hover:bg-surface/60 shadow-xl hover:shadow-2xl'
              }`}
            >
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-700 ${
                feature.comingSoon
                  ? 'from-primary/15 via-secondary/8 to-primary/15 group-hover:from-primary/20 group-hover:via-secondary/12 group-hover:to-primary/20'
                  : 'from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/8 group-hover:via-primary/5 group-hover:to-primary/8'
              }`} />
              
              {/* Subtle corner accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${
                feature.comingSoon
                  ? 'from-primary/20 to-transparent'
                  : 'from-primary/5 to-transparent'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />

              <div className="relative z-10 flex gap-5 w-full">
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                      feature.comingSoon
                        ? 'bg-gradient-to-br from-secondary/50 to-secondary/70 border-2 border-primary/70 shadow-primary/30'
                        : 'bg-gradient-to-br from-primary/30 to-primary/50 border-2 border-primary/40 group-hover:border-primary/60 group-hover:glow-primary'
                    }`}
                  >
                    <Check className={`${feature.comingSoon ? 'text-white' : 'text-white'}`} size={26} strokeWidth={3} />
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3 flex-wrap">
                    <h3 className={`text-xl font-bold transition-colors leading-tight ${
                      feature.comingSoon 
                        ? 'text-primary group-hover:text-primary/90' 
                        : 'text-text group-hover:text-primary'
                    }`}>
                      {feature.title}
                    </h3>
                    {feature.comingSoon && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.08, y: -3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white relative overflow-hidden shadow-lg"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(0, 180, 200, 0.5) 0%, rgba(0, 220, 240, 0.7) 50%, rgba(0, 180, 200, 0.5) 100%)',
                          border: '2px solid rgba(255, 107, 53, 1)',
                          boxShadow: '0 0 25px rgba(255, 107, 53, 0.7), inset 0 0 20px rgba(0, 220, 240, 0.4)',
                        }}
                      >
                        {/* Animated shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-lg"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                        {/* Pulsing glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          animate={{
                            boxShadow: [
                              '0 0 25px rgba(255, 107, 53, 0.7)',
                              '0 0 40px rgba(255, 107, 53, 0.9)',
                              '0 0 25px rgba(255, 107, 53, 0.7)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Star/Sparkle icon - white */}
                        <motion.span
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                            scale: { duration: 2, repeat: Infinity },
                          }}
                          className="relative z-10 flex items-center"
                        >
                          <Sparkles size={14} className="text-white" fill="white" strokeWidth={2.5} />
                        </motion.span>
                        {/* Text */}
                        <span className="relative z-10 font-bold tracking-wide">
                          {locale === 'es' ? 'Próximamente' : 'Coming Soon'}
                        </span>
                      </motion.span>
                    )}
                  </div>
                  <p className={`text-base leading-relaxed transition-colors ${
                    feature.comingSoon 
                      ? 'text-text/85 group-hover:text-text/100' 
                      : 'text-text/75 group-hover:text-text/95'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

