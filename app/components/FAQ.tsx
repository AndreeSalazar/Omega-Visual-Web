'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const faqs = [
  {
    question: 'Is this actually compiling real Assembly?',
    answer:
      'Yes! Omega-Visual uses NASM + GCC. The output is real x86-64 binaries. Not simulated.',
  },
  {
    question: 'Can I use my existing code?',
    answer:
      'Absolutely. Import .asm, .c, .cpp files as nodes. Edit in dual-view.',
  },
  {
    question: 'How is this different from Houdini?',
    answer:
      'Houdini is for VFX (particles, rendering). Omega-Visual is for CODE (compilers, kernels, software).',
  },
  {
    question: 'Does it support other architectures (ARM, RISC-V)?',
    answer: 'x86-64 first. ARM64 and RISC-V support coming in Q2 2025.',
  },
  {
    question: 'Can I collaborate with my team?',
    answer:
      'Collaboration is on the roadmap (Q2 2025). Currently single-user.',
  },
  {
    question: 'Is the code open-source?',
    answer:
      'The core is proprietary. We\'ll open-source node libraries and templates.',
  },
]

export default function FAQ() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          {t.faq.title}
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface/50 backdrop-blur-sm rounded-xl border border-text/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-surface/70 transition-colors"
              >
                <span className="text-lg font-bold text-text pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-primary flex-shrink-0" size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-text/70 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

