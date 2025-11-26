'use client'

import { motion } from 'framer-motion'
import { Check, Wrench, Clock, Sparkles, Code, Box, Users, Zap } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const iconMap = {
  Check,
  Wrench,
  Clock,
  Sparkles,
  Code,
  Box,
  Users,
  Zap,
}

export default function Roadmap() {
  const { t, locale } = useI18n()
  
  return (
    <section className="py-32 bg-gradient-to-b from-background via-surface/50 to-background relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(224,231,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(224,231,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-black mb-4 text-gradient"
          >
            {t.roadmap.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text/60 text-lg"
          >
            {t.roadmap.conceptBirth}
          </motion.p>
        </motion.div>

        {/* Inspirations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-text mb-4">
              {t.roadmap.inspirations.title}
            </h3>
            <p className="text-text/70 text-lg max-w-3xl mx-auto">
              {t.roadmap.inspirations.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Houdini */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-xl border border-primary/30 hover:border-primary/60 transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary">
                <Box className="text-primary" size={24} />
              </div>
              <h4 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                {t.roadmap.inspirations.houdini.name}
              </h4>
              <p className="text-text/70 text-sm leading-relaxed">
                {t.roadmap.inspirations.houdini.description}
              </p>
            </motion.div>

            {/* VSCode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/40 rounded-lg flex items-center justify-center mb-4 group-hover:glow-secondary">
                <Code className="text-secondary" size={24} />
              </div>
              <h4 className="text-xl font-bold text-text mb-2 group-hover:text-secondary transition-colors">
                {t.roadmap.inspirations.vscode.name}
              </h4>
              <p className="text-text/70 text-sm leading-relaxed">
                {t.roadmap.inspirations.vscode.description}
              </p>
            </motion.div>

            {/* Unreal Engine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-xl border border-accent/30 hover:border-accent/60 transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/40 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-accent" size={24} />
              </div>
              <h4 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                {t.roadmap.inspirations.unreal.name}
              </h4>
              <p className="text-text/70 text-sm leading-relaxed">
                {t.roadmap.inspirations.unreal.description}
              </p>
            </motion.div>

            {/* Figma */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-xl border border-text/20 hover:border-text/40 transition-all group relative"
            >
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                  {t.roadmap.future}
                </span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-text/20 to-text/40 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-text/60" size={24} />
              </div>
              <h4 className="text-xl font-bold text-text mb-2">
                {t.roadmap.inspirations.figma.name}
              </h4>
              <p className="text-text/70 text-sm leading-relaxed mb-2">
                {t.roadmap.inspirations.figma.description}
              </p>
              <p className="text-text/50 text-xs italic">
                {t.roadmap.inspirations.figma.note}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          <div className="space-y-16">
            {t.roadmap.milestones.map((milestone, index) => {
              const Icon = iconMap[milestone.icon as keyof typeof iconMap] || Check
              const isLeft = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`inline-block glass-effect p-6 rounded-xl border max-w-md shadow-lg ${
                        milestone.status === 'completed'
                          ? 'border-primary/50 bg-primary/5'
                          : milestone.status === 'in-progress'
                          ? 'border-secondary/50 bg-secondary/5'
                          : 'border-text/20'
                      } ${isLeft ? 'md:ml-auto' : ''}`}
                    >
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            milestone.status === 'completed'
                              ? 'bg-primary/20 text-primary border border-primary/40'
                              : milestone.status === 'in-progress'
                              ? 'bg-secondary/20 text-secondary border border-secondary/40 animate-pulse'
                              : 'bg-text/20 text-text/60 border border-text/30'
                          }`}
                        >
                          {milestone.period}
                        </span>
                        <div
                          className={`flex items-center gap-2 ${
                            milestone.status === 'completed'
                              ? 'text-primary'
                              : milestone.status === 'in-progress'
                              ? 'text-secondary'
                              : 'text-text/40'
                          }`}
                        >
                          <Icon size={18} />
                          {milestone.status === 'completed' && (
                            <span className="text-xs font-semibold">
                              {t.roadmap.completed}
                            </span>
                          )}
                          {milestone.status === 'in-progress' && (
                            <span className="text-xs font-semibold">
                              {t.roadmap.inProgress}
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-text mb-2">{milestone.title}</h3>
                      <p className="text-text/70 text-sm leading-relaxed mb-2">
                        {milestone.description}
                      </p>
                      {milestone.note && (
                        <p className="text-text/50 text-xs italic border-t border-text/10 pt-2 mt-2">
                          {milestone.note}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                    <motion.div
                      animate={
                        milestone.status === 'in-progress'
                          ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-8 h-8 rounded-full border-4 ${
                        milestone.status === 'completed'
                          ? 'bg-primary border-primary glow-primary'
                          : milestone.status === 'in-progress'
                          ? 'bg-secondary border-secondary glow-secondary animate-pulse'
                          : 'bg-background border-text/30'
                      }`}
                    />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
