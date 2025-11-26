'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const testimonials = [
  {
    name: '@dev_kernel',
    role: 'OS Developer',
    avatar: '👨‍💻',
    text: 'Built a bootloader in 2 days with Omega-Visual. Would\'ve taken me 2 weeks in Vim. The visual graph makes dependencies crystal clear.',
  },
  {
    name: 'Security Researcher',
    role: '@ RedTeam Inc.',
    avatar: '🛡️',
    text: 'Finally, a tool that makes exploit development visual. ROP chain construction is 10x faster. Our team adopted it instantly.',
  },
  {
    name: 'Professor',
    role: '@ MIT CSAIL',
    avatar: '🎓',
    text: 'Teaching OS dev with Omega-Visual. Students grasp concepts 3x faster. The visual representation is game-changing for education.',
  },
]

export default function Testimonials() {
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
          {t.testimonials.title}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-8 rounded-xl border border-text/10 relative group hover:border-primary/30 transition-all"
            >
              <Quote className="text-primary/20 absolute top-6 right-6 group-hover:text-primary/40 transition-colors" size={40} />
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-3xl group-hover:bg-primary/30 group-hover:glow-primary transition-all"
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <div className="font-bold text-text group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-text/60 group-hover:text-text/80 transition-colors">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-text/80 leading-relaxed italic relative z-10 group-hover:text-text/90 transition-colors">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

