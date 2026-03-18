'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function Parallax({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up'
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const getTransform = () => {
    const distance = 100 * speed
    switch (direction) {
      case 'up': return useTransform(scrollYProgress, [0, 1], [distance, -distance])
      case 'down': return useTransform(scrollYProgress, [0, 1], [-distance, distance])
      case 'left': return useTransform(scrollYProgress, [0, 1], [distance, -distance])
      case 'right': return useTransform(scrollYProgress, [0, 1], [-distance, distance])
    }
  }

  const transform = getTransform()
  const springTransform = useSpring(transform, { damping: 30, stiffness: 100 })

  const style = direction === 'up' || direction === 'down'
    ? { y: springTransform }
    : { x: springTransform }

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  )
}

export function FadeInOnScroll({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up'
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleOnScroll({ 
  children, 
  className = '' 
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const springScale = useSpring(scale, { damping: 20, stiffness: 100 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale: springScale, opacity }}
    >
      {children}
    </motion.div>
  )
}

export function RotateOnScroll({ 
  children, 
  className = '',
  degrees = 10
}: {
  children: ReactNode
  className?: string
  degrees?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees])
  const springRotate = useSpring(rotate, { damping: 30, stiffness: 100 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateZ: springRotate }}
    >
      {children}
    </motion.div>
  )
}

export function RevealOnScroll({ 
  children, 
  className = '',
  direction = 'up'
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const clipPaths = {
    up: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0 0 0 0)',
    },
    down: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0 0)',
    },
    left: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0)',
    },
    right: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0 0 0)',
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
      transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ 
  children, 
  className = '' 
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function HorizontalScroll({ 
  children, 
  className = '' 
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <div ref={ref} className="h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className={`flex gap-8 ${className}`} style={{ x }}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-50"
      style={{ scaleX }}
    />
  )
}
