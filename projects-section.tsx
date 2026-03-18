'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

const projects = [
  {
    id: 1,
    name: 'WARNOVA',
    description: 'Next-Generation Platform',
    url: 'http://warnova.ct.ws',
    gradient: 'from-white/20 via-white/5 to-transparent',
  },
  {
    id: 2,
    name: 'CLASICX',
    description: 'Premium Experience',
    url: 'https://clasicx.netlify.app/',
    gradient: 'from-white/10 via-white/20 to-white/5',
  },
]

function Project3DCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg'])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          className={`relative h-80 bg-gradient-to-br ${project.gradient} rounded-2xl border border-white/10 overflow-hidden`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 70%)',
            }}
          />

          {/* Floating Particles */}
          {isHovered && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              initial={{
                x: Math.random() * 400,
                y: 320,
                opacity: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-8" style={{ transform: 'translateZ(50px)' }}>
            {/* Project Number */}
            <motion.div
              className="absolute top-6 right-6 text-8xl font-bold text-white/5"
              animate={isHovered ? { scale: 1.2, opacity: 0.1 } : { scale: 1, opacity: 0.05 }}
            >
              0{index + 1}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-2"
              style={{ transform: 'translateZ(30px)' }}
            >
              {project.name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + i * 0.03 }}
                  whileHover={{ y: -5, color: '#fff' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h3>

            <motion.p
              className="text-white/40 text-sm tracking-wide"
              style={{ transform: 'translateZ(20px)' }}
            >
              {project.description}
            </motion.p>

            {/* Arrow Indicator */}
            <motion.div
              className="absolute bottom-6 right-6 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.5)' }}
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <motion.span
                className="text-xl"
                animate={isHovered ? { x: 3 } : { x: 0 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Border Glow on Hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: isHovered
                ? '0 0 60px rgba(255,255,255,0.1), inset 0 0 60px rgba(255,255,255,0.05)'
                : 'none',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </a>
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-xs tracking-[0.5em] text-white/40 uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Projects
          </motion.h2>
          
          <div className="overflow-hidden">
            <motion.h3
              className="text-5xl md:text-7xl font-bold tracking-tighter"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
              Featured Work
            </motion.h3>
          </div>
          
          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Project3DCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -left-20 top-1/2 w-40 h-40 border border-white/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -right-20 top-1/3 w-60 h-60 border border-white/5 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </section>
  )
}
