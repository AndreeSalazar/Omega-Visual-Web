'use client'

import { motion } from 'framer-motion'
import { FileText, Link2, Users, Network, Code2, Zap } from 'lucide-react'

const problems = [
  {
    icon: FileText,
    title: 'Assembly is Text',
    description: 'Escribes 5,000 líneas en Vim. Si algo falla, buscas manualmente en archivos dispersos.',
  },
  {
    icon: Link2,
    title: 'Composition is Manual',
    description: 'Macros, includes, headers. Cada cambio = recompilar todo. Git conflicts infinitos.',
  },
  {
    icon: Users,
    title: 'Teams Work in Silos',
    description: 'Desarrollador A espera que B termine. Merge hell. 2 horas de overhead por 10 líneas.',
  },
]

const solutions = [
  {
    icon: Network,
    title: 'Visual Nodes',
    description: 'Cada archivo es un nodo. Doble-click para editar. Conexiones muestran dependencias.',
    image: 'canvas-nodes',
  },
  {
    icon: Code2,
    title: 'Houdini-Style Composition',
    description: '{{node_name}} hereda código upstream. Dual-view: Raw vs Composed. Automático.',
    image: 'placeholder-composition',
  },
  {
    icon: Zap,
    title: 'Real-Time Collaboration',
    description: 'Ve cursores de tu equipo. Conecta nodos en vivo. Run All = compila en cada PC.',
    image: 'collaboration',
  },
]

export default function ProblemSolution() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-surface to-background">
      {/* Problems Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          System Development is Broken
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-8 rounded-xl border-text/10 hover:border-primary/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors"
                >
                  <problem.icon className="text-primary" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-text group-hover:text-primary transition-colors">
                  {problem.title}
                </h3>
                <p className="text-text/70 leading-relaxed group-hover:text-text/90 transition-colors">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transition Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-16"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 border-4 border-primary/30 border-t-primary rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              ⚡
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Solutions Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          Omega-Visual Changes Everything
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-surface to-background p-8 rounded-xl border border-secondary/20 hover:border-secondary/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:via-secondary/10 group-hover:to-secondary/5 transition-all duration-500" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/30 group-hover:glow-secondary transition-all"
                >
                  <solution.icon className="text-secondary" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-text group-hover:text-secondary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-text/70 leading-relaxed mb-6 group-hover:text-text/90 transition-colors">
                  {solution.description}
                </p>
                
                {/* Placeholder for screenshot with shimmer effect */}
                <div className="w-full h-48 bg-background/50 rounded-lg border border-text/10 flex items-center justify-center relative overflow-hidden group-hover:border-secondary/30 transition-colors">
                  <div className="absolute inset-0 shimmer" />
                  <span className="text-text/40 text-sm relative z-10">Screenshot: {solution.image}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

