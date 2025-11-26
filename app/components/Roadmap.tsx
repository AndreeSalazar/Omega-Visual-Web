'use client'

import { motion } from 'framer-motion'
import { Check, Wrench, Clock, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const milestones = [
  {
    status: 'completed',
    quarter: 'Q4 2024',
    title: 'Core Engine',
    description: 'Visual nodes, Assembly compilation, Multi-language',
    icon: Check,
  },
  {
    status: 'in-progress',
    quarter: 'Q1 2025',
    title: 'Parameter System',
    description: 'ch() expressions, auto-extraction, super nodes',
    icon: Wrench,
  },
  {
    status: 'planned',
    quarter: 'Q2 2025',
    title: 'Collaboration',
    description: 'Figma-style multi-user, chat, cursors',
    icon: Clock,
  },
  {
    status: 'planned',
    quarter: 'Q3 2025',
    title: 'Marketplace',
    description: 'Buy/sell node templates, compiler libraries',
    icon: Sparkles,
  },
  {
    status: 'planned',
    quarter: 'Q4 2025',
    title: 'Enterprise Features',
    description: 'SSO, teams, private repos, SLA',
    icon: Sparkles,
  },
]

export default function Roadmap() {
  const { t } = useI18n()
  
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          {t.roadmap.title}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div
                    className={`inline-block bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-text/10 max-w-md ${
                      index % 2 === 0 ? 'md:ml-auto' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          milestone.status === 'completed'
                            ? 'bg-primary/20 text-primary'
                            : milestone.status === 'in-progress'
                            ? 'bg-secondary/20 text-secondary'
                            : 'bg-text/20 text-text/60'
                        }`}
                      >
                        {milestone.quarter}
                      </span>
                      <milestone.icon
                        className={`${
                          milestone.status === 'completed'
                            ? 'text-primary'
                            : milestone.status === 'in-progress'
                            ? 'text-secondary'
                            : 'text-text/40'
                        }`}
                        size={20}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">{milestone.title}</h3>
                    <p className="text-text/70">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full border-4 ${
                      milestone.status === 'completed'
                        ? 'bg-primary border-primary'
                        : milestone.status === 'in-progress'
                        ? 'bg-secondary border-secondary animate-pulse'
                        : 'bg-background border-text/30'
                    }`}
                  />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

