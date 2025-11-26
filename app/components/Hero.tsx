'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Zap, Check, Play, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'
import { getAssetPath } from '@/lib/utils'

export default function Hero() {
  const { t } = useI18n()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPath, setVideoPath] = useState('')
  
  // Get video path on client side to ensure correct basePath
  useEffect(() => {
    setVideoPath(getAssetPath('videos/Video-01.mp4'))
  }, [])


  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }

  // Auto-play video when state changes
  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [isVideoPlaying])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.15), transparent 50%)',
              'radial-gradient(circle at 60% 40%, rgba(255,107,53,0.2), transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.15), transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 80% 20%, rgba(0,217,255,0.15), transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(0,217,255,0.2), transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(0,217,255,0.15), transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(224,231,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(224,231,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating particles with glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const startX = Math.random() * 1920
          const startY = Math.random() * 1080
          const size = Math.random() * 3 + 1
          const duration = Math.random() * 15 + 15
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                background: i % 3 === 0 
                  ? 'radial-gradient(circle, rgba(255,107,53,0.6), transparent)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(0,217,255,0.6), transparent)'
                  : 'radial-gradient(circle, rgba(255,217,61,0.4), transparent)',
                boxShadow: `0 0 ${size * 4}px currentColor`,
              }}
              initial={{
                x: startX,
                y: startY,
                opacity: 0,
              }}
              animate={{
                y: [startY, Math.random() * 1080, startY],
                x: [startX, Math.random() * 1920, startX],
                opacity: [0, 1, 0.5, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.3, 0.5, 0.7, 1],
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-[1.05] tracking-tight"
          >
            <motion.span
              className="text-gradient block mb-2"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              {t.hero.title1}
            </motion.span>
            <motion.span
              className="text-gradient block"
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
            >
              {t.hero.title2}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl text-text/90 mb-16 max-w-4xl mx-auto whitespace-pre-line leading-relaxed font-medium"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-24"
          >
          {[
            { icon: Code, text: t.hero.badge1, colorClass: 'border-secondary/40 hover:border-secondary/80', iconClass: 'text-secondary', glow: 'glow-secondary' },
            { icon: Zap, text: t.hero.badge2, colorClass: 'border-accent/40 hover:border-accent/80', iconClass: 'text-accent', glow: '' },
            { icon: Check, text: t.hero.badge3, colorClass: 'border-primary/40 hover:border-primary/80', iconClass: 'text-primary', glow: 'glow-primary' },
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15, y: -4 }}
              className={`flex items-center gap-3 px-6 py-3 glass-effect rounded-xl ${badge.colorClass} ${badge.glow} transition-all cursor-default shadow-lg hover:shadow-xl`}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <badge.icon size={20} className={badge.iconClass} />
              </motion.div>
              <span className="text-base font-bold">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
        </div>

        {/* Hero Image/Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative w-full max-w-[1600px] mx-auto">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-2xl opacity-30 animate-pulse" />
            
            <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-primary/40 shadow-2xl">
              <AnimatePresence mode="wait">
                {!isVideoPlaying ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden"
                  >
                    {/* Video thumbnail as background */}
                    <div className="absolute inset-0">
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                        onLoadedMetadata={(e) => {
                          // Seek to a good frame for thumbnail
                          const video = e.target as HTMLVideoElement
                          if (video.duration) {
                            video.currentTime = video.duration * 0.1 // 10% into video
                          }
                        }}
                        onError={(e) => {
                          console.warn('Video thumbnail failed to load:', e)
                        }}
                      >
                        <source src={videoPath || getAssetPath('videos/Video-01.mp4')} type="video/mp4" />
                      </video>
                      
                      {/* Professional gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.1),transparent_70%)]" />
                    </div>
                    
                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 md:p-16">
                      {/* Preview text with better styling */}
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-center mb-16"
                      >
                        <motion.h3
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring' }}
                          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
                        >
                          <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
                            {t.hero.videoPreviewTitle}
                          </span>
                          <br />
                          <span className="text-white">{t.hero.videoPreviewSubtitle}</span>
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed"
                        >
                          {t.hero.videoPreviewDescription}
                        </motion.p>
                      </motion.div>
                      
                      {/* Enhanced Play button */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                        className="cursor-pointer group"
                        onClick={handlePlayVideo}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          {/* Multiple animated glow rings */}
                          <motion.div
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="absolute inset-0 bg-primary rounded-full blur-3xl"
                          />
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 0.3,
                            }}
                            className="absolute inset-0 bg-secondary rounded-full blur-2xl"
                          />
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.6, 0.9, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 0.6,
                            }}
                            className="absolute inset-0 bg-accent rounded-full blur-xl"
                          />
                          
                          {/* Main Play button */}
                          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-primary/80 transition-all border-4 border-white/30 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                            <Play size={56} className="text-white ml-3 relative z-10" fill="white" strokeWidth={2} />
                          </div>
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="text-white/90 text-lg md:text-xl mt-8 text-center group-hover:text-primary font-bold transition-colors drop-shadow-lg"
                        >
                          {t.hero.clickToPlay}
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-video bg-black"
                  >
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      onLoadedData={() => {
                        if (videoRef.current) {
                          videoRef.current.play().catch((err) => {
                            console.error('Video play error:', err)
                          })
                        }
                      }}
                      onError={(e) => {
                        console.error('Video failed to load:', e)
                        // Show error message to user
                        const video = e.target as HTMLVideoElement
                        const parent = video.parentElement
                        if (parent) {
                          const errorDiv = document.createElement('div')
                          errorDiv.className = 'absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-8'
                          errorDiv.innerHTML = `
                            <div class="text-4xl mb-4">⚠️</div>
                            <p class="text-xl mb-2">Video no encontrado</p>
                            <p class="text-sm text-white/60">Asegúrate de que Video-01.mp4 esté en /public/videos/</p>
                            <p class="text-xs text-white/40 mt-2">Ruta esperada: ${getAssetPath('videos/Video-01.mp4')}</p>
                          `
                          parent.appendChild(errorDiv)
                        }
                      }}
                    >
                      <source src={videoPath || getAssetPath('videos/Video-01.mp4')} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Professional video controls overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Top gradient */}
                      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                      
                      {/* Bottom gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      
                      {/* Side gradients for better focus */}
                      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                    </div>
                    
                    {/* Control button */}
                    <div className="absolute top-6 right-6 z-20 pointer-events-auto">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsVideoPlaying(false)
                          if (videoRef.current) {
                            videoRef.current.pause()
                            videoRef.current.currentTime = 0
                          }
                        }}
                        className="px-5 py-2.5 bg-surface/95 backdrop-blur-xl rounded-xl text-text text-sm font-semibold hover:bg-surface border-2 border-primary/50 hover:border-primary transition-all flex items-center gap-2 shadow-2xl"
                      >
                        <ArrowRight size={18} className="rotate-180" />
                        <span>{t.hero.backToPreview}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-12 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-surface/30"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-4 bg-gradient-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

