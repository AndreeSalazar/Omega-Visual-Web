'use client'

import { motion } from 'framer-motion'
import { Check, X, AlertCircle, Rocket } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const renderCell = (value: boolean | string | 'coming', locale: string) => {
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
          {locale === 'es' ? 'Próximamente' : 'Soon'}
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
    <section className="py-24 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          {t.comparison.title}
        </motion.h2>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-text/10 p-4 sm:p-6 shadow-2xl">
            <div className="min-w-[1000px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-text/20">
                    <th className="text-left py-4 px-3 sm:px-4 text-text font-bold text-sm sm:text-base sticky left-0 bg-surface/50 backdrop-blur-sm z-10">
                      {locale === 'es' ? 'Característica' : 'Feature'}
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
                            {renderCell(value, locale)}
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

