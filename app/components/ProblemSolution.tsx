'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Link2, Users, Network, Code2, Zap, X, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'
import { getAssetPath } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export default function ProblemSolution() {
  const { t, locale } = useI18n()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const problems = [
    {
      icon: FileText,
      title: t.problemSolution.problems[0].title,
      description: t.problemSolution.problems[0].description,
    },
    {
      icon: Link2,
      title: t.problemSolution.problems[1].title,
      description: t.problemSolution.problems[1].description,
    },
    {
      icon: Users,
      title: t.problemSolution.problems[2].title,
      description: t.problemSolution.problems[2].description,
    },
  ]

  const solutions = [
    {
      icon: Network,
      title: t.problemSolution.solutions[0].title,
      description: t.problemSolution.solutions[0].description,
      image: getAssetPath('images/1.png'),
      alt: 'Omega-Visual Node Canvas Editor',
      comingSoon: false,
    },
    {
      icon: Code2,
      title: t.problemSolution.solutions[1].title,
      description: t.problemSolution.solutions[1].description,
      image: 'placeholder-composition',
      alt: 'Houdini-Style Composition',
      comingSoon: true,
    },
    {
      icon: Zap,
      title: t.problemSolution.solutions[2].title,
      description: t.problemSolution.solutions[2].description,
      image: 'collaboration',
      alt: 'Real-Time Collaboration',
      comingSoon: true,
    },
  ]
  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-surface to-background">
      {/* Problems Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #E0E7FF 0%, #00D9FF 50%, #4ADE80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 20px rgba(0, 217, 255, 0.4))',
              letterSpacing: '-0.03em',
              lineHeight: '1.1',
            }}
          >
            {t.problemSolution.problemTitle}
          </motion.h2>
          {t.problemSolution.problemSubtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-text/60 mt-4 max-w-2xl mx-auto"
            >
              {t.problemSolution.problemSubtitle}
            </motion.p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect p-8 rounded-2xl border-2 border-text/10 hover:border-primary/60 transition-all group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/15 group-hover:to-primary/10 transition-all duration-500" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/40 group-hover:glow-primary transition-all shadow-lg"
                >
                  <problem.icon className="text-primary" size={36} strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 text-text group-hover:text-primary transition-colors">
                  {problem.title}
                </h3>
                <p className="text-text/75 leading-relaxed group-hover:text-text/95 transition-colors text-base">
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
          {t.problemSolution.solutionTitle}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-gradient-to-br from-surface/80 to-background/90 p-8 rounded-2xl border-2 transition-all group relative overflow-hidden shadow-xl hover:shadow-2xl ${
                solution.comingSoon 
                  ? 'border-accent/40 hover:border-accent/70 hover:shadow-accent/20 opacity-90' 
                  : 'border-secondary/30 hover:border-secondary/70 hover:shadow-secondary/20'
              }`}
            >
              {/* Coming Soon Badge - Creative Design */}
              {solution.comingSoon && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  className="absolute top-4 right-4 z-20"
                >
                  <motion.span
                    className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white overflow-hidden shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 25%, #FFD700 75%, #FF6B35 100%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    {/* Sparkle icon */}
                    <motion.span
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity },
                      }}
                      className="relative z-10"
                    >
                      <Sparkles size={14} className="text-white" fill="white" strokeWidth={2.5} />
                    </motion.span>
                    {/* Text */}
                    <span className="relative z-10 font-bold tracking-wide">
                      {t.features.comingSoon}
                    </span>
                  </motion.span>
                </motion.div>
              )}

              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
                solution.comingSoon
                  ? 'from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:via-accent/15 group-hover:to-accent/10'
                  : 'from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/10 group-hover:via-secondary/15 group-hover:to-secondary/10'
              }`} />
              
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${
                solution.comingSoon ? 'from-accent/20 to-transparent' : 'from-secondary/20 to-transparent'
              }`} />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`w-20 h-20 bg-gradient-to-br rounded-xl flex items-center justify-center mb-6 transition-all shadow-lg ${
                    solution.comingSoon
                      ? 'from-accent/30 to-accent/10 group-hover:bg-accent/40 group-hover:glow-primary'
                      : 'from-secondary/30 to-secondary/10 group-hover:bg-secondary/40 group-hover:glow-secondary'
                  }`}
                >
                  <solution.icon className={solution.comingSoon ? 'text-accent' : 'text-secondary'} size={36} strokeWidth={2.5} />
                </motion.div>
                <h3 className={`text-2xl md:text-3xl font-black mb-4 transition-colors ${
                  solution.comingSoon
                    ? 'text-text/80 group-hover:text-accent'
                    : 'text-text group-hover:text-secondary'
                }`}>
                  {solution.title}
                </h3>
                <p className={`leading-relaxed mb-6 transition-colors text-base ${
                  solution.comingSoon
                    ? 'text-text/65 group-hover:text-text/85'
                    : 'text-text/75 group-hover:text-text/95'
                }`}>
                  {solution.description}
                </p>
                
                {/* Benefit badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    solution.comingSoon ? 'bg-accent' : 'bg-secondary'
                  }`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    solution.comingSoon ? 'text-accent/80' : 'text-secondary/80'
                  }`}>
                    {locale === 'es' ? 'Beneficio Clave' : 'Key Benefit'}
                  </span>
                </div>
                
                {/* Image preview */}
                {solution.image && solution.image !== 'canvas-nodes' && solution.image !== 'placeholder-composition' && solution.image !== 'collaboration' ? (
                  <div 
                    className="w-full h-48 rounded-xl border-2 border-text/10 relative overflow-hidden group-hover:border-secondary/40 transition-all shadow-inner bg-background/80 cursor-pointer"
                    onClick={() => setSelectedImage(solution.image)}
                  >
                    <Image
                      src={solution.image}
                      alt={solution.alt || solution.title}
                      fill
                      className="object-contain p-2 transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="text-text/0 group-hover:text-text/80 text-xs font-semibold transition-colors">
                        {locale === 'es' ? 'Clic para ampliar' : 'Click to enlarge'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-background/60 to-surface/40 rounded-xl border-2 border-text/10 flex items-center justify-center relative overflow-hidden group-hover:border-secondary/40 transition-all shadow-inner">
                    <div className="absolute inset-0 shimmer opacity-30" />
                    <span className="text-text/50 text-xs relative z-10 font-mono">Preview: {solution.image}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-surface/90 backdrop-blur-sm border-2 border-text/20 hover:border-primary/50 flex items-center justify-center transition-all hover:scale-110 group"
              >
                <X className="text-text group-hover:text-primary transition-colors" size={24} />
              </button>

              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-text/20 shadow-2xl bg-background/50">
                <Image
                  src={selectedImage}
                  alt="Full size preview"
                  fill
                  className="object-contain p-8"
                  sizes="100vw"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

