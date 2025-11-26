'use client'

import { motion } from 'framer-motion'

const stackLayers = [
  { name: 'C++ / Vulkan / Qt (Desktop)', description: 'Visual Editor' },
  { name: 'Node Graph Engine + Compositor', description: 'Houdini-style' },
  { name: 'LanguageExecutor (Multi-compiler)', description: 'NASM, GCC, Python' },
  { name: 'Assembly x86-64 | C++ | Python...', description: '12+ languages' },
]

const technologies = ['C++20', 'Vulkan', 'Qt6', 'NASM', 'GCC', 'LLVM', 'CMake']

export default function Architecture() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          Powered by Modern Tech
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {/* Stack Diagram */}
          <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-text/10 p-8 mb-8">
            <div className="space-y-0">
              {stackLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 border-l-4 ${
                    index === 0
                      ? 'border-primary bg-primary/5 rounded-t-lg'
                      : index === stackLayers.length - 1
                      ? 'border-secondary bg-secondary/5 rounded-b-lg'
                      : 'border-text/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-text text-lg">{layer.name}</div>
                      <div className="text-sm text-text/60 mt-1">← {layer.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-surface border border-secondary/20 rounded-lg text-text hover:border-secondary transition-all"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

