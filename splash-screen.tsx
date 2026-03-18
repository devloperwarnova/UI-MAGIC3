'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 1200)
      }, 3500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0, 1, 0.8],
      scale: [0.8, 1.1, 1],
      transition: { duration: 2, ease: 'easeOut' },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.645, 0.045, 0.355, 1] },
    },
  }

  const welcomeText = "WELCOME TO"
  const magicText = "MAGIC UI"
  const byText = "BY INFINITY STUDIOS"

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 0.03 : 0 }}
              transition={{ duration: 1 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`h-${i}`}
                  className="absolute h-px w-full bg-foreground/20"
                  style={{ top: `${(i + 1) * 5}%` }}
                  initial={{ scaleX: 0, originX: i % 2 ? 1 : 0 }}
                  animate={{ scaleX: phase >= 1 ? 1 : 0 }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className="absolute w-px h-full bg-foreground/20"
                  style={{ left: `${(i + 1) * 5}%` }}
                  initial={{ scaleY: 0, originY: i % 2 ? 1 : 0 }}
                  animate={{ scaleY: phase >= 1 ? 1 : 0 }}
                  transition={{ delay: i * 0.05 + 0.3, duration: 0.8 }}
                />
              ))}
            </motion.div>
          </div>

          {/* Radial Glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={glowVariants}
            initial="initial"
            animate={phase >= 2 ? "animate" : "initial"}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-foreground/10 via-transparent to-transparent blur-3xl" />
          </motion.div>

          {/* Scan Line Effect */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-foreground/50 to-transparent"
            initial={{ y: '-100%' }}
            animate={{ y: ['0%', '10000%'] }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          />

          {/* Main Content */}
          <div className="relative text-center perspective-1000">
            {/* Welcome To */}
            <motion.div
              className="overflow-hidden mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
            >
              <div className="flex justify-center gap-1 text-sm md:text-lg tracking-[0.5em] text-foreground/60 font-mono">
                {welcomeText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={phase >= 1 ? "visible" : "hidden"}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* MAGIC UI - Main Title */}
            <motion.div className="overflow-hidden relative">
              <div className="flex justify-center perspective-1000">
                {magicText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={phase >= 2 ? "visible" : "hidden"}
                    className="inline-block text-6xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter glow-text"
                    style={{
                      textShadow: phase >= 3 ? '0 0 80px rgba(255,255,255,0.5), 0 0 120px rgba(255,255,255,0.3)' : 'none'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>

              {/* Glitch Effect Overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.1, repeat: 3, delay: 2 }}
              >
                <div className="flex justify-center text-6xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter text-foreground/50 blur-sm">
                  {magicText}
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Lines */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.div
                className="h-px w-20 md:w-40 bg-gradient-to-r from-transparent via-foreground to-transparent origin-left"
                variants={lineVariants}
                initial="hidden"
                animate={phase >= 3 ? "visible" : "hidden"}
              />
              <motion.div
                className="h-px w-20 md:w-40 bg-gradient-to-r from-transparent via-foreground to-transparent origin-right"
                variants={lineVariants}
                initial="hidden"
                animate={phase >= 3 ? "visible" : "hidden"}
              />
            </div>

            {/* By Infinity Studios */}
            <motion.div
              className="mt-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 4 ? 1 : 0 }}
            >
              <div className="flex justify-center gap-1 text-xs md:text-sm tracking-[0.3em] text-foreground/50 font-mono">
                {byText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="mt-12 mx-auto w-48 h-px bg-foreground/10 overflow-hidden rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-foreground/50 via-foreground to-foreground/50"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>

          {/* Corner Decorations */}
          {[
            'top-8 left-8',
            'top-8 right-8 rotate-90',
            'bottom-8 left-8 -rotate-90',
            'bottom-8 right-8 rotate-180',
          ].map((position, i) => (
            <motion.div
              key={i}
              className={`absolute ${position} w-8 h-8`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: phase >= 1 ? 0.3 : 0, scale: phase >= 1 ? 1 : 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-foreground" />
              <div className="absolute top-0 left-0 w-px h-full bg-foreground" />
            </motion.div>
          ))}

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-foreground/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
