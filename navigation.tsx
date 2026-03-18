'use client'

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { MagneticButton } from './magnetic-button'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Web OS', href: '/os' },
  { label: 'Settings', href: '/settings' },
  { label: 'Credits', href: '/credits' },
  { label: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined) {
      if (latest > previous && latest > 150) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
    setHasScrolled(latest > 50)
  })

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-colors duration-500
          ${hasScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5' : ''}
        `}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <MagneticButton strength={20}>
              <motion.div
                className="text-lg font-bold tracking-tighter"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-foreground">MAGIC</span>
                <span className="text-foreground/50">UI</span>
              </motion.div>
            </MagneticButton>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <MagneticButton key={item.href} strength={15}>
                <Link
                  href={item.href}
                  className="relative py-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors group"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Underline Animation */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </MagneticButton>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-6 h-4">
              <motion.span
                className="absolute top-0 left-0 w-full h-px bg-foreground"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 7 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute top-1/2 left-0 w-full h-px bg-foreground -translate-y-1/2"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 w-full h-px bg-foreground"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -7 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="relative z-10 h-full flex flex-col items-center justify-center gap-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 50, opacity: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-bold tracking-tight text-foreground hover:text-foreground/70 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Decorative Elements */}
              <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 text-foreground/20 text-xs tracking-[0.5em]"
                variants={{
                  open: { opacity: 1 },
                  closed: { opacity: 0 },
                }}
              >
                INFINITY STUDIOS
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
