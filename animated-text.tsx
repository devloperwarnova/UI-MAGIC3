'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

export function SplitText({ children, className = '', delay = 0, once = true }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: delay + i * 0.03,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  return (
    <motion.div 
      ref={ref} 
      className={`overflow-hidden perspective-1000 ${className}`}
      aria-label={children}
    >
      <div className="flex flex-wrap justify-center preserve-3d">
        {children.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-block"
            style={{ transformOrigin: 'center bottom' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function RevealText({ children, className = '', delay = 0, once = true }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          delay,
          duration: 0.8,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <span className="relative z-10">{children}</span>
      
      {/* Glitch Layers */}
      <motion.span
        className="absolute inset-0 text-foreground/50"
        style={{ clipPath: 'inset(10% 0 60% 0)' }}
        animate={{
          x: [0, -2, 2, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 3,
        }}
      >
        {children}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-foreground/50"
        style={{ clipPath: 'inset(60% 0 10% 0)' }}
        animate={{
          x: [0, 2, -2, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 3,
          delay: 0.1,
        }}
      >
        {children}
      </motion.span>
    </div>
  )
}

export function TypewriterText({ 
  children, 
  className = '', 
  delay = 0,
  speed = 0.05 
}: AnimatedTextProps & { speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={className}>
      {children.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + i * speed }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-foreground ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  )
}

export function FloatingText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScrambleText({ children, className = '' }: { children: string; className?: string }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={className}>
      {children.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1,
          } : {}}
          transition={{ delay: i * 0.05 }}
        >
          {char === ' ' ? '\u00A0' : (
            <motion.span
              animate={isInView ? {
                content: [
                  chars[Math.floor(Math.random() * chars.length)],
                  chars[Math.floor(Math.random() * chars.length)],
                  chars[Math.floor(Math.random() * chars.length)],
                  char
                ]
              } : {}}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {char}
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  )
}

export function WaveText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`flex ${className}`}>
      {children.split('').map((char, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}
