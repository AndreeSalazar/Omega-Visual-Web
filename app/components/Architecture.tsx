'use client'

import { motion } from 'framer-motion'
import { Monitor, Network, Code2, Languages, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const iconMap = {
  Desktop: Monitor,
  Network: Network,
  Code: Code2,
  Languages: Languages,
}

export default function Architecture() {
  const { t } = useI18n()
  
  return (
    <section className="py-24 bg-gradient-to-b from-background via-surface to-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(255,107,53,0.08), transparent 50%)',
              'radial-gradient(circle at 70% 50%, rgba(0,255,255,0.08), transparent 50%)',
              'radial-gradient(circle at 30% 50%, rgba(255,107,53,0.08), transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-black mb-4 text-gradient"
          >
            {t.architecture.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text/70 text-lg md:text-xl max-w-3xl mx-auto"
          >
            {t.architecture.subtitle}
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Stack Diagram - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl border border-text/20 p-2 mb-12 shadow-2xl relative overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            
            <div className="relative space-y-2 p-2">
              {t.architecture.stackLayers.map((layer, index) => {
                const Icon = iconMap[layer.icon as keyof typeof iconMap] || Code2
                const isFirst = index === 0
                const isLast = index === t.architecture.stackLayers.length - 1
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`group relative p-6 rounded-xl border-l-4 transition-all ${
                      isFirst
                        ? 'border-primary bg-gradient-to-r from-primary/10 via-primary/5 to-transparent'
                        : isLast
                        ? 'border-secondary bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent'
                        : index === 1
                        ? 'border-accent bg-gradient-to-r from-accent/10 via-accent/5 to-transparent'
                        : 'border-text/30 bg-gradient-to-r from-surface/50 to-transparent'
                    } hover:shadow-lg hover:shadow-primary/20`}
                  >
                    {/* Animated border glow */}
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        isFirst
                          ? 'bg-primary glow-primary'
                          : isLast
                          ? 'bg-secondary glow-secondary'
                          : 'bg-accent'
                      }`}
                      animate={
                        isFirst || isLast
                          ? { opacity: [0.5, 1, 0.5] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            isFirst
                              ? 'bg-primary/20 text-primary'
                              : isLast
                              ? 'bg-secondary/20 text-secondary'
                              : 'bg-accent/20 text-accent'
                          } group-hover:glow-primary transition-all`}
                        >
                          <Icon size={24} />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-text text-lg md:text-xl mb-1 group-hover:text-primary transition-colors">
                            {layer.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-text/60">
                            <ArrowRight size={14} className="text-primary" />
                            <span>{layer.description}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Layer number indicator */}
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isFirst
                          ? 'bg-primary/20 text-primary border border-primary/40'
                          : isLast
                          ? 'bg-secondary/20 text-secondary border border-secondary/40'
                          : 'bg-accent/20 text-accent border border-accent/40'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Technology Badges - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h3 className="text-2xl font-bold text-text mb-8">
              {t.architecture.coreTechTitle}
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {t.architecture.technologies.map((tech, index) => {
              const colors = [
                'from-primary/20 to-primary/40 border-primary/40 text-primary',
                'from-secondary/20 to-secondary/40 border-secondary/40 text-secondary',
                'from-accent/20 to-accent/40 border-accent/40 text-accent',
                'from-primary/20 to-primary/40 border-primary/40 text-primary',
                'from-secondary/20 to-secondary/40 border-secondary/40 text-secondary',
                'from-accent/20 to-accent/40 border-accent/40 text-accent',
                'from-primary/20 to-primary/40 border-primary/40 text-primary',
              ]
              const colorClass = colors[index % colors.length]
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  className={`group relative px-6 py-3 rounded-xl bg-gradient-to-br ${colorClass} border-2 backdrop-blur-sm cursor-default shadow-lg hover:shadow-xl transition-all`}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                  
                  <span className="relative z-10 font-bold text-sm md:text-base">
                    {tech.name}
                  </span>
                  
                  {/* Category badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-background/90 border border-text/20 rounded-full text-xs text-text/50 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {tech.category}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-text/50 text-sm italic">
              {t.architecture.bottomNote}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
