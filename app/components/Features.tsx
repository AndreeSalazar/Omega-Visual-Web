'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const features = [
  {
    title: 'Real Assembly x86-64',
    description: 'NASM + GCC pipeline. Compiles to actual binaries. Not a toy.',
  },
  {
    title: '12+ Languages Supported',
    description: 'Assembly, C, C++, Python, JavaScript, Rust, Java, Go. Mix languages in same graph.',
  },
  {
    title: 'Houdini-Style Placeholders',
    description: '{{node_name}} automatically resolves upstream. Recursive composition.',
  },
  {
    title: 'Dual-View Editor',
    description: 'Toggle Raw (with placeholders) vs Composed (fully resolved). Tab key.',
  },
  {
    title: 'Live Execution',
    description: 'Integrated terminal. See output in real-time. Debug visually.',
  },
  {
    title: 'Parameter Extraction (Coming Soon)',
    description: 'ch("param") automatically extracts from upstream. Change once, affects all.',
  },
  {
    title: 'Multi-Mode Execution',
    description: 'TEST mode (single node), FULL mode (composed), PARALLEL mode (all nodes).',
  },
  {
    title: 'Git Integration',
    description: 'Graphs serialize to JSON. Diff-friendly. CI/CD compatible.',
  },
  {
    title: 'Collaboration (Roadmap)',
    description: 'Figma-style cursors. Edit together. Chat integrated. Conflict-free.',
  },
  {
    title: 'Super Nodes (Nested)',
    description: 'Nodes contain nodes infinitely. Collapse 100-node compiler to 1 visual block.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          Enterprise-Grade Features
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: index % 2 === 0 ? 5 : -5, scale: 1.02 }}
              className="flex gap-4 glass-effect p-6 rounded-xl border border-text/10 hover:border-primary/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500" />
              <div className="relative z-10 flex gap-4 w-full">
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 group-hover:glow-primary transition-all"
                  >
                    <Check className="text-primary" size={22} />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-text group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text/70 leading-relaxed group-hover:text-text/90 transition-colors">
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

