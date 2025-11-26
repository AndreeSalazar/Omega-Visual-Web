'use client'

import { motion } from 'framer-motion'
import { HardDrive, Settings, Gamepad2, Shield, Building2, Cpu } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const useCases = [
  {
    icon: HardDrive,
    title: 'Operating Systems',
    description: 'Build bootloaders, kernels, drivers. Modular. Test in QEMU with one click.',
    example: 'Mini bootloader in 3 connected nodes',
  },
  {
    icon: Settings,
    title: 'Compiler Construction',
    description: 'Frontend, optimizer, backend. Each phase = nodes. Change target arch in seconds.',
    example: 'Compiler graph with 20+ nodes',
  },
  {
    icon: Gamepad2,
    title: 'GPU Kernels (CUDA/ROCm)',
    description: 'Optimize matrix multiply. Parameters: block_size, shared_mem. Instant variants.',
    example: 'Kernel node with visible parameters',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Build shellcodes, ROP chains. Modular exploits. Test payloads visually.',
    example: 'Exploit chain with 5 nodes',
  },
  {
    icon: Building2,
    title: 'Fintech / Crypto',
    description: 'Custom crypto algorithms. ASM-optimized for speed. Audit via visual graph.',
    example: 'AES encryption node in Assembly',
  },
  {
    icon: Cpu,
    title: 'AI Inference Engines',
    description: 'Build custom runtimes for ASIC chips. Parameters auto-extracted. Deploy fast.',
    example: 'Inference pipeline visual',
  },
]

export default function UseCases() {
  const { t } = useI18n()
  
  return (
    <section id="use-cases" className="py-24 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          {t.useCases.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass-effect p-6 rounded-xl border border-text/10 hover:border-primary/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 group-hover:glow-primary transition-all"
                >
                  <useCase.icon className="text-primary" size={28} />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-text group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-text/70 mb-4 leading-relaxed group-hover:text-text/90 transition-colors">
                  {useCase.description}
                </p>
                <div className="text-sm text-text/50 italic group-hover:text-text/70 transition-colors">
                  Example: {useCase.example}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

