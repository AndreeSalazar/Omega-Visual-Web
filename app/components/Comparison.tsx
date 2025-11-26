'use client'

import { motion } from 'framer-motion'
import { Check, X, AlertCircle, Rocket } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const renderCell = (value: boolean | string | 'coming', soonText: string) => {
  if (value === true) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex items-center justify-center"
      >
        <Check className="text-primary" size={22} strokeWidth={3} />
      </motion.div>
    )
  }
  if (value === false) {
    return (
      <div className="flex items-center justify-center">
        <X className="text-text/30" size={20} strokeWidth={2.5} />
      </div>
    )
  }
  if (value === 'partial') {
    return (
      <div className="flex items-center justify-center">
        <AlertCircle className="text-accent" size={20} strokeWidth={2.5} />
      </div>
    )
  }
  if (value === 'coming') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-1"
      >
        <Rocket className="text-secondary" size={16} />
        <span className="text-secondary text-xs font-bold">
          {soonText}
        </span>
      </motion.div>
    )
  }
  return null
}

export default function Comparison() {
  const { t, locale } = useI18n()
  
  // Tool order: Core tools first, then node-based tools, then Omega-Visual
  const toolKeys = ['visualStudio', 'vsCode', 'houdini', 'blender', 'unreal', 'nodeRed', 'maxMsp', 'touchDesigner', 'omegaVisual'] as const
  
  return (
    <section className="py-24 bg-gradient-to-b from-background via-surface to-background relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.4), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="text-center mb-16 relative"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #00D9FF 0%, #00D9FF 40%, #4ADE80 60%, #4ADE80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 25px rgba(0, 217, 255, 0.5)) drop-shadow(0 0 40px rgba(74, 222, 128, 0.3))',
              letterSpacing: '-0.03em',
              lineHeight: '1.1',
            }}
          >
            {t.comparison.title}
          </motion.h2>
          {/* Decorative underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #00D9FF, #4ADE80, transparent)',
            }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-text/10 p-4 sm:p-6 shadow-2xl">
            <div className="min-w-[1000px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-text/20">
                    <th className="text-left py-4 px-3 sm:px-4 text-text font-bold text-sm sm:text-base sticky left-0 bg-surface/50 backdrop-blur-sm z-10">
                      {t.comparison.featureLabel}
                    </th>
                    {toolKeys.map((toolKey) => (
                      <th
                        key={toolKey}
                        className={`text-center py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold ${
                          toolKey === 'omegaVisual'
                            ? 'text-primary bg-primary/10 border-l-2 border-primary/50'
                            : 'text-text/70'
                        }`}
                      >
                        {t.comparison.tools[toolKey]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparison.features.map((feature, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className={`border-b border-text/5 hover:bg-background/50 transition-colors group ${
                        feature.omegaHighlight ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="py-4 px-3 sm:px-4 text-text font-semibold text-sm sm:text-base sticky left-0 bg-surface/50 backdrop-blur-sm z-10 group-hover:bg-background/70 transition-colors">
                        {feature.name}
                      </td>
                      {toolKeys.map((toolKey) => {
                        const value = feature[toolKey] as boolean | string | 'coming'
                        return (
                          <td
                            key={toolKey}
                            className={`py-4 px-2 sm:px-4 text-center ${
                              toolKey === 'omegaVisual' && feature.omegaHighlight
                                ? 'bg-primary/10 border-l-2 border-primary/50'
                                : ''
                            }`}
                          >
                            {renderCell(value, t.comparison.soon)}
                          </td>
                        )
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

