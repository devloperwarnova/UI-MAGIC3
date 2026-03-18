'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GlowButton, CircleButton } from './magnetic-button'
import { SplitText, GlitchText } from './animated-text'
import { FloatingOrb, GridPattern } from './interactive-cards'
import Link from 'next/link'

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <GridPattern className="opacity-30" />
      
      {/* Floating Orbs */}
      <FloatingOrb size={400} className="top-1/4 -left-48" delay={0} />
      <FloatingOrb size={300} className="bottom-1/4 -right-32" delay={2} />
      <FloatingOrb size={200} className="top-1/2 left-1/2 -translate-x-1/2" delay={4} />

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-screen bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ y, opacity, scale }}
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-xs tracking-[0.3em] text-foreground/60 uppercase">
            <motion.span
              className="w-2 h-2 rounded-full bg-foreground"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Experience the Future
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="mb-6">
          <SplitText 
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none" 
            delay={0.3}
          >
            MAGIC UI
          </SplitText>
        </div>

        {/* Subtitle with Glitch */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <GlitchText className="text-lg md:text-2xl text-foreground/50 tracking-wide">
            1000+ MICRO-INTERACTIONS
          </GlitchText>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { number: '1000+', label: 'Animations' },
            { number: '60', label: 'FPS' },
            { number: '2026', label: 'Design' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-xs tracking-[0.2em] text-foreground/40 uppercase mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <Link href="/showcase">
            <GlowButton variant="primary">
              Explore Showcase
            </GlowButton>
          </Link>
          <Link href="/credits">
            <GlowButton variant="secondary">
              Learn More
            </GlowButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <CircleButton>
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </CircleButton>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-24 left-8 w-20 h-20 border-l border-t border-foreground/10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute top-24 right-8 w-20 h-20 border-r border-t border-foreground/10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      />
      <motion.div
        className="absolute bottom-24 left-8 w-20 h-20 border-l border-b border-foreground/10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      />
      <motion.div
        className="absolute bottom-24 right-8 w-20 h-20 border-r border-b border-foreground/10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      />
    </section>
  )
}
