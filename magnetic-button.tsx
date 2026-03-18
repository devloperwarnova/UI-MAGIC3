'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({ 
  children, 
  className = '', 
  onClick,
  strength = 40 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    
    x.set((distX / rect.width) * strength)
    y.set((distY / rect.height) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{ x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}

interface GlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function GlowButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary'
}: GlowButtonProps) {
  const variants = {
    primary: 'bg-foreground text-background hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]',
    secondary: 'bg-transparent border border-foreground/30 text-foreground hover:border-foreground hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]',
    ghost: 'bg-transparent text-foreground hover:bg-foreground/5'
  }

  return (
    <MagneticButton onClick={onClick}>
      <motion.button
        className={`
          relative px-8 py-4 text-sm font-medium tracking-wider uppercase
          transition-all duration-500 ease-out overflow-hidden group
          ${variants[variant]}
          ${className}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)',
          }}
        />
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    </MagneticButton>
  )
}

export function CircleButton({ 
  children, 
  className = '', 
  onClick 
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <MagneticButton onClick={onClick} strength={30}>
      <motion.button
        className={`
          relative w-20 h-20 rounded-full border border-foreground/30
          flex items-center justify-center
          transition-all duration-500 ease-out
          hover:border-foreground hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
          group overflow-hidden
          ${className}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Rotating Border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner Circle */}
        <div className="absolute inset-1 rounded-full bg-background" />
        
        {/* Content */}
        <span className="relative z-10 text-foreground group-hover:scale-110 transition-transform duration-300">
          {children}
        </span>
      </motion.button>
    </MagneticButton>
  )
}
