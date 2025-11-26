'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Languages, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'
import { useState, useEffect } from 'react'

export default function LanguagePrompt() {
  const { locale, setLocale, t } = useI18n()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem('languagePromptDismissed')
    if (!dismissed) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000) // Show after 2 seconds
      return () => clearTimeout(timer)
    } else {
      setIsDismissed(true)
    }
  }, [])

  const handleKeepCurrent = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('languagePromptDismissed', 'true')
  }

  const handleSwitch = () => {
    const newLocale = locale === 'en' ? 'es' : 'en'
    setLocale(newLocale)
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('languagePromptDismissed', 'true')
  }

  const handleClose = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('languagePromptDismissed', 'true')
  }

  // Don't show if already dismissed or not visible yet
  if (isDismissed || !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Enhanced backdrop overlay with gradient and particles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40"
            onClick={handleClose}
          >
            {/* Multi-layer gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/5 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-secondary/5 to-black/60" />
            <div className="absolute inset-0 backdrop-blur-xl" />
            
            {/* Animated particles effect */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/30"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
          
           {/* Banner - Perfectly centered */}
           <motion.div
             initial={{ opacity: 0, y: -40, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -40, scale: 0.9 }}
             transition={{ 
               type: "spring", 
               damping: 30, 
               stiffness: 400,
               mass: 0.8
             }}
             className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl px-4 sm:px-6"
             style={{
               transform: 'translate(-50%, -50%)',
             }}
           >
            <div className="relative">
              {/* Multi-layer glow effects with enhanced depth */}
              <motion.div
                className="absolute -inset-4 rounded-3xl blur-3xl opacity-60"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.5), transparent 60%), radial-gradient(circle at 70% 70%, rgba(0, 217, 255, 0.5), transparent 60%)',
                    'radial-gradient(circle at 70% 30%, rgba(0, 217, 255, 0.5), transparent 60%), radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.5), transparent 60%)',
                    'radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.5), transparent 60%), radial-gradient(circle at 70% 70%, rgba(0, 217, 255, 0.5), transparent 60%)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -inset-2 rounded-3xl blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40 rounded-3xl" />
              </motion.div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-3xl blur-xl opacity-40" />
              
              {/* Main container with premium glass effect */}
              <div className="relative rounded-3xl overflow-hidden backdrop-blur-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 32, 64, 0.85) 0%, rgba(16, 20, 40, 0.9) 50%, rgba(26, 32, 64, 0.85) 100%)',
                  boxShadow: `
                    0 30px 60px -12px rgba(0, 0, 0, 0.6),
                    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
                    0 0 100px rgba(255, 107, 53, 0.1),
                    0 0 100px rgba(0, 217, 255, 0.1)
                  `,
                }}
              >
                {/* Premium animated border with gradient */}
                <motion.div
                  className="absolute -inset-[3px] rounded-3xl"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255, 107, 53, 0.8), rgba(0, 217, 255, 0.8), rgba(255, 107, 53, 0.8))',
                    backgroundSize: '300% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '300% 0%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <div className="absolute inset-[3px] rounded-3xl bg-gradient-to-br from-surface/90 to-surface/95" />
                {/* Enhanced animated background layers */}
                <motion.div
                  className="absolute inset-0 opacity-25"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 217, 255, 0.4), transparent 50%), radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.1), transparent 80%)',
                      'radial-gradient(circle at 80% 30%, rgba(0, 217, 255, 0.4), transparent 50%), radial-gradient(circle at 20% 70%, rgba(255, 107, 53, 0.4), transparent 50%), radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.1), transparent 80%)',
                      'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 217, 255, 0.4), transparent 50%), radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.1), transparent 80%)',
                    ],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Premium shimmer effect with multiple layers */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 25%, transparent 50%, rgba(255, 255, 255, 0.1) 75%, transparent 100%)',
                    backgroundSize: '200% 200%',
                  }}
                />
                
                {/* Subtle grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />
                
                 {/* Content container - optimized for readability and centering */}
                 <div className="relative p-8 sm:p-10">
                   <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
                     {/* Enhanced Icon */}
                     <div className="flex-shrink-0">
                       <motion.div
                         initial={{ scale: 0, rotate: -180 }}
                         animate={{ scale: 1, rotate: 0 }}
                         transition={{ 
                           delay: 0.2, 
                           type: "spring", 
                           stiffness: 200,
                           damping: 15
                         }}
                         className="relative"
                       >
                         {/* Outer glow rings */}
                         <motion.div
                           className="absolute inset-0 rounded-2xl"
                           animate={{
                             scale: [1, 1.15, 1],
                             opacity: [0.5, 0.3, 0.5],
                           }}
                           transition={{
                             duration: 3,
                             repeat: Infinity,
                             ease: "easeInOut",
                           }}
                         >
                           <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-2xl blur-xl" />
                         </motion.div>
                         
                         {/* Icon container */}
                         <div className="relative">
                           <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-60" />
                           <div 
                             className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border-2 shadow-2xl"
                             style={{
                               background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(0, 217, 255, 0.2) 100%)',
                               borderImage: 'linear-gradient(135deg, rgba(255, 107, 53, 0.6), rgba(0, 217, 255, 0.6)) 1',
                               boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                             }}
                           >
                             <motion.div
                               animate={{
                                 scale: [1, 1.1, 1],
                               }}
                               transition={{
                                 duration: 2,
                                 repeat: Infinity,
                                 ease: "easeInOut",
                               }}
                             >
                               <Languages className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
                             </motion.div>
                             
                             {/* Pulsing glow inside icon */}
                             <motion.div
                               className="absolute inset-0 rounded-2xl"
                               animate={{
                                 boxShadow: [
                                   '0 0 20px rgba(255, 107, 53, 0.6), inset 0 0 20px rgba(255, 107, 53, 0.2)',
                                   '0 0 40px rgba(0, 217, 255, 0.6), inset 0 0 30px rgba(0, 217, 255, 0.3)',
                                   '0 0 20px rgba(255, 107, 53, 0.6), inset 0 0 20px rgba(255, 107, 53, 0.2)',
                                 ],
                               }}
                               transition={{
                                 duration: 2.5,
                                 repeat: Infinity,
                                 ease: "easeInOut",
                               }}
                             />
                           </div>
                         </div>
                       </motion.div>
                     </div>

                     {/* Text Section - centered and readable */}
                     <div className="w-full">
                       <motion.h3
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                         className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight"
                         style={{
                           background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 50%, #C7D2FE 100%)',
                           WebkitBackgroundClip: 'text',
                           WebkitTextFillColor: 'transparent',
                           backgroundClip: 'text',
                           filter: 'drop-shadow(0 2px 20px rgba(224, 231, 255, 0.4))',
                         }}
                       >
                         {t.languagePrompt.title}
                       </motion.h3>
                       <motion.p
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                         className="text-base sm:text-lg text-text/95 leading-relaxed font-medium mb-6"
                         style={{
                           textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
                         }}
                       >
                         {t.languagePrompt.subtitle}
                       </motion.p>
                     </div>

                     {/* Buttons - centered and properly spaced */}
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                       <motion.button
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                         whileHover={{ 
                           scale: 1.05, 
                           y: -2,
                           boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                         }}
                         whileTap={{ scale: 0.97 }}
                         onClick={handleKeepCurrent}
                         className="px-8 py-4 rounded-2xl text-base sm:text-lg font-bold transition-all relative overflow-hidden group flex items-center justify-center gap-3 min-w-[200px]"
                         style={{
                           background: 'linear-gradient(135deg, rgba(26, 32, 64, 0.95) 0%, rgba(16, 20, 40, 0.98) 100%)',
                           border: '2px solid rgba(224, 231, 255, 0.25)',
                           boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                           color: '#E0E7FF',
                         }}
                       >
                         {/* USA Flag SVG */}
                         <svg 
                           className="w-8 h-6 flex-shrink-0" 
                           viewBox="0 0 7410 3900" 
                           xmlns="http://www.w3.org/2000/svg"
                         >
                           <rect width="7410" height="3900" fill="#b22234"/>
                           <path d="M0,450h7410m0,600H0m0,600h7410m0,600H0m0,600h7410m0,600H0" stroke="#fff" strokeWidth="300"/>
                           <rect width="2964" height="2100" fill="#3c3b6e"/>
                           <g fill="#fff">
                             <g id="s18">
                               <g id="s9">
                                 <g id="s5">
                                   <g id="s4">
                                     <path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"/>
                                     <use href="#s" y="420"/>
                                     <use href="#s" y="840"/>
                                     <use href="#s" y="1260"/>
                                   </g>
                                   <use href="#s" y="1680"/>
                                 </g>
                                 <use href="#s4" x="247" y="210"/>
                               </g>
                               <use href="#s9" x="494"/>
                             </g>
                             <use href="#s18" x="988"/>
                             <use href="#s18" x="1976"/>
                             <use href="#s9" x="2470"/>
                             <use href="#s5" x="2964"/>
                           </g>
                         </svg>
                         <span className="relative z-10">{t.languagePrompt.keepCurrent}</span>
                         <motion.div
                           className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0"
                           initial={{ x: '-100%' }}
                           whileHover={{ x: '100%' }}
                           transition={{ duration: 0.7, ease: "easeInOut" }}
                         />
                         <motion.div
                           className="absolute inset-0 opacity-0 group-hover:opacity-100"
                           style={{
                             background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%)',
                           }}
                           transition={{ duration: 0.3 }}
                         />
                       </motion.button>
                       
                       <motion.button
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                         whileHover={{ 
                           scale: 1.05,
                           y: -2,
                           boxShadow: "0 25px 50px rgba(255, 107, 53, 0.6)",
                         }}
                         whileTap={{ scale: 0.97 }}
                         onClick={handleSwitch}
                         className="px-8 py-4 rounded-2xl text-base sm:text-lg font-extrabold text-white transition-all relative overflow-hidden group flex items-center justify-center gap-3 min-w-[200px]"
                         style={{
                           background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 25%, #00D9FF 75%, #00B8D4 100%)',
                           backgroundSize: '200% 100%',
                           boxShadow: '0 15px 35px rgba(255, 107, 53, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                         }}
                       >
                         <motion.div
                           className="absolute inset-0"
                           animate={{
                             backgroundPosition: ['0% 0%', '100% 0%'],
                           }}
                           transition={{
                             duration: 3,
                             repeat: Infinity,
                             ease: "linear",
                           }}
                         />
                         {/* Peru Flag SVG */}
                         <svg 
                           className="w-8 h-6 flex-shrink-0" 
                           viewBox="0 0 900 600" 
                           xmlns="http://www.w3.org/2000/svg"
                         >
                           <rect width="900" height="600" fill="#D91023"/>
                           <rect x="0" y="0" width="300" height="600" fill="#D91023"/>
                           <rect x="300" y="0" width="300" height="600" fill="#ffffff"/>
                           <rect x="600" y="0" width="300" height="600" fill="#D91023"/>
                         </svg>
                         <span className="relative z-10 drop-shadow-lg">{t.languagePrompt.switchTo}</span>
                         <motion.div
                           className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100"
                           transition={{ duration: 0.4 }}
                         />
                         <motion.div
                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                           initial={{ x: '-100%' }}
                           whileHover={{ x: '100%' }}
                           transition={{ duration: 1, ease: "easeInOut" }}
                         />
                       </motion.button>
                       
                       <motion.button
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                         whileHover={{ 
                           scale: 1.15, 
                           rotate: 90,
                           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
                         }}
                         whileTap={{ scale: 0.9 }}
                         onClick={handleClose}
                         className="p-4 rounded-xl transition-all"
                         style={{
                           background: 'linear-gradient(135deg, rgba(26, 32, 64, 0.8), rgba(16, 20, 40, 0.9))',
                           border: '2px solid rgba(224, 231, 255, 0.15)',
                           color: 'rgba(224, 231, 255, 0.8)',
                           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                         }}
                         aria-label={t.languagePrompt.close}
                       >
                         <X className="w-6 h-6" />
                       </motion.button>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

