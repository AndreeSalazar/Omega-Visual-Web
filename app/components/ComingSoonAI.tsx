'use client'

import { motion } from 'framer-motion'
import { Sparkles, Brain, Users, Zap, Eye } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

export default function ComingSoonAI() {
  const { t } = useI18n()
  
  return (
    <section className="py-24 bg-gradient-to-b from-background via-surface to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255,107,53,0.1), transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(0,255,255,0.1), transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255,107,53,0.1), transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-full mb-8 border-primary/40 glow-primary shadow-lg"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="text-primary" size={20} />
            </motion.span>
            <span className="text-sm font-bold text-text">
              {t.comingSoonAI.badge}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="text-gradient block mb-2">
              {t.comingSoonAI.title1}
            </span>
            <span className="text-text block">
              {t.comingSoonAI.title2}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-text/80 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {t.comingSoonAI.description}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* AI Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="glass-effect p-8 rounded-2xl border border-primary/30 hover:border-primary/60 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-primary/10 transition-all duration-500" />
            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:glow-primary"
              >
                <Brain className="text-primary" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-text mb-4 group-hover:text-primary transition-colors">
                {t.comingSoonAI.feature1Title}
              </h3>
              <p className="text-text/70 leading-relaxed group-hover:text-text/90 transition-colors">
                {t.comingSoonAI.feature1Description}
              </p>
            </div>
          </motion.div>

          {/* Real-time Collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="glass-effect p-8 rounded-2xl border border-secondary/30 hover:border-secondary/60 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/10 group-hover:via-secondary/5 group-hover:to-secondary/10 transition-all duration-500" />
            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:glow-secondary"
              >
                <Users className="text-secondary" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-text mb-4 group-hover:text-secondary transition-colors">
                {t.comingSoonAI.feature2Title}
              </h3>
              <p className="text-text/70 leading-relaxed group-hover:text-text/90 transition-colors">
                {t.comingSoonAI.feature2Description}
              </p>
            </div>
          </motion.div>

          {/* Continuous Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="glass-effect p-8 rounded-2xl border border-accent/30 hover:border-accent/60 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:via-accent/5 group-hover:to-accent/10 transition-all duration-500" />
            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:glow-primary"
              >
                <Eye className="text-accent" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-text mb-4 group-hover:text-accent transition-colors">
                {t.comingSoonAI.feature3Title}
              </h3>
              <p className="text-text/70 leading-relaxed group-hover:text-text/90 transition-colors">
                {t.comingSoonAI.feature3Description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 glass-effect rounded-full border border-primary/40 glow-primary">
            <Zap className="text-primary" size={24} />
            <span className="text-text font-semibold text-lg">
              {t.comingSoonAI.cta}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

