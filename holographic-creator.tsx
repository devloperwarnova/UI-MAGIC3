'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export function HolographicCreator() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['25deg', '-25deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-25deg', '25deg'])
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.2, 0.8])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative max-w-lg mx-auto perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Holographic Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        style={{
          background: `
            conic-gradient(
              from 0deg,
              rgba(255,255,255,0.1),
              rgba(255,255,255,0.3),
              rgba(255,255,255,0.1),
              rgba(255,255,255,0.3),
              rgba(255,255,255,0.1)
            )
          `,
          filter: 'blur(30px)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Card */}
      <motion.div
        className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        style={{ filter: `brightness(${brightness})` }}
      >
        {/* Holographic Scanline */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 50%, rgba(255,255,255,0.02) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `
              linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
            `,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '200% 0%'] : '0% 0%',
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
        />

        <div className="relative p-8">
          {/* Glitch Effect Header */}
          <motion.div
            className="text-xs tracking-[0.5em] text-white/40 uppercase mb-6 font-mono"
            animate={isHovered ? {
              textShadow: [
                '0 0 0 transparent',
                '2px 0 0 rgba(255,255,255,0.3)',
                '-2px 0 0 rgba(255,255,255,0.3)',
                '0 0 0 transparent',
              ],
            } : {}}
            transition={{ duration: 0.2, repeat: isHovered ? Infinity : 0, repeatDelay: 2 }}
          >
            Creator Profile
          </motion.div>

          {/* 3D Avatar Container */}
          <div className="flex items-center gap-6 mb-8">
            <motion.div
              className="relative w-24 h-24"
              style={{ transform: 'translateZ(40px)' }}
            >
              {/* Avatar Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-1 rounded-full border border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Avatar */}
              <motion.div
                className="absolute inset-3 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-3xl font-bold">A</span>
              </motion.div>

              {/* Status Indicator */}
              <motion.div
                className="absolute bottom-1 right-1 w-4 h-4 bg-white rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255,255,255,0.4)',
                    '0 0 0 10px rgba(255,255,255,0)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            <div style={{ transform: 'translateZ(30px)' }}>
              <motion.h3
                className="text-2xl font-bold tracking-tight mb-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Made by
              </motion.h3>
              <motion.a
                href="https://instagram.com/l.ankit_jaiswal.l"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-white/60 hover:text-white transition-colors font-mono"
                whileHover={{ scale: 1.02 }}
              >
                @l.ankit_jaiswal.l
              </motion.a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6" style={{ transform: 'translateZ(20px)' }}>
            {[
              { label: 'Projects', value: '50+' },
              { label: 'Experience', value: '5Y' },
              { label: 'Awards', value: '12' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 bg-white/5 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <motion.div
                  className="text-xl font-bold"
                  animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Instagram Link Button */}
          <motion.a
            href="https://instagram.com/l.ankit_jaiswal.l"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-white/10 hover:bg-white hover:text-black rounded-xl text-center font-semibold transition-colors relative overflow-hidden group"
            style={{ transform: 'translateZ(10px)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
              transition={{ duration: 0.6 }}
            />
            <span className="relative">Follow on Instagram</span>
          </motion.a>

          {/* Holographic Lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                top: `${20 + i * 20}%`,
                left: 0,
                right: 0,
              }}
              animate={{
                opacity: isHovered ? [0, 0.5, 0] : 0,
                x: isHovered ? ['-100%', '100%'] : '-100%',
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: isHovered ? Infinity : 0,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Particles */}
      {isHovered && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/50 rounded-full"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 300,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  )
}
