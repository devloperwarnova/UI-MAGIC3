'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import Link from 'next/link'

interface Card3DProps {
  children: ReactNode
  className?: string
  href?: string
}

export function Card3D({ children, className = '', href }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const CardWrapper = href ? Link : 'div'
  const wrapperProps = href ? { href } : {}

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="preserve-3d"
        style={{ rotateX, rotateY }}
      >
        <CardWrapper {...(wrapperProps as any)} className="block">
          {children}
        </CardWrapper>
      </motion.div>
    </motion.div>
  )
}

interface GlassCardProps {
  children: ReactNode
  className?: string
  href?: string
  glowColor?: string
}

export function GlassCard({ 
  children, 
  className = '', 
  href,
  glowColor = 'rgba(255, 255, 255, 0.1)'
}: GlassCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const CardContent = (
    <motion.div
      ref={ref}
      className={`
        relative overflow-hidden rounded-xl
        bg-foreground/[0.02] backdrop-blur-xl
        border border-foreground/10
        transition-all duration-500
        hover:border-foreground/30
        hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)]
        group
        ${className}
      `}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, ${glowColor}, transparent 40%)`,
        }}
      />
      
      {/* Border Gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-foreground/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-foreground/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-foreground/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-foreground/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{CardContent}</Link>
  }

  return CardContent
}

export function PortalCard({ 
  title, 
  subtitle, 
  href, 
  index = 0 
}: { 
  title: string
  subtitle?: string
  href: string
  index?: number
}) {
  return (
    <Card3D className="w-full" href={href}>
      <motion.div
        className="
          relative p-8 md:p-12 h-full min-h-[300px]
          bg-gradient-to-br from-foreground/[0.03] to-transparent
          border border-foreground/10 rounded-2xl
          overflow-hidden group cursor-pointer
          hover:border-foreground/30
          transition-colors duration-500
        "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
              style={{ top: `${20 + i * 20}%` }}
              initial={{ x: '-100%', opacity: 0 }}
              whileHover={{ x: '100%', opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
            />
          ))}
        </div>
        
        {/* Number */}
        <motion.div
          className="absolute top-4 right-4 text-6xl md:text-8xl font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <motion.h3
            className="text-2xl md:text-4xl font-bold tracking-tight mb-2 group-hover:text-foreground transition-colors"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          {subtitle && (
            <p className="text-foreground/50 text-sm md:text-base tracking-wide">
              {subtitle}
            </p>
          )}
          
          {/* Arrow */}
          <motion.div
            className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center text-foreground/30 group-hover:text-foreground transition-colors"
            initial={{ x: 0, opacity: 0.5 }}
            whileHover={{ x: 10, opacity: 1 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
        
        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 70%)',
          }}
        />
      </motion.div>
    </Card3D>
  )
}

export function FloatingOrb({ 
  size = 200, 
  delay = 0,
  className = ''
}: { 
  size?: number
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function GridPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
