'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const settingSections = [
  { id: 'appearance', name: 'Appearance', icon: '◐' },
  { id: 'animations', name: 'Animations', icon: '◇' },
  { id: 'performance', name: 'Performance', icon: '⚡' },
  { id: 'audio', name: 'Audio', icon: '♪' },
  { id: 'about', name: 'About', icon: 'ⓘ' },
]

function AnimatedSwitch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <motion.button
      className={`relative w-16 h-8 rounded-full ${enabled ? 'bg-white' : 'bg-white/10'}`}
      onClick={onChange}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`absolute top-1 w-6 h-6 rounded-full ${enabled ? 'bg-black' : 'bg-white/40'}`}
        animate={{ left: enabled ? '34px' : '4px' }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      {enabled && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.5 }}
          style={{ boxShadow: '0 0 20px rgba(255,255,255,0.8)' }}
        />
      )}
    </motion.button>
  )
}

function AnimatedSlider({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <motion.span
          className="text-white font-mono w-12 text-right"
          key={value}
          initial={{ scale: 1.2, color: '#fff' }}
          animate={{ scale: 1, color: 'rgba(255,255,255,0.8)' }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden group">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-white/20 via-white to-white rounded-full"
          style={{ width: `${value}%` }}
          layoutId={label}
          transition={{ type: 'spring', damping: 20 }}
        />
        <motion.div
          className="absolute h-full w-full"
          style={{
            background: `linear-gradient(90deg, transparent ${value - 2}%, rgba(255,255,255,0.5) ${value}%, transparent ${value + 2}%)`,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"
          style={{ left: `calc(${value}% - 10px)` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('appearance')
  const [settings, setSettings] = useState({
    darkMode: true,
    animations: true,
    particles: true,
    blur: true,
    sound: false,
    animationSpeed: 75,
    particleDensity: 60,
    blurIntensity: 50,
    glowStrength: 80,
    transitionDuration: 40,
  })

  const updateSetting = (key: string, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative border-b border-white/10 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-white/60 hover:text-white"
              whileHover={{ x: -5 }}
            >
              <span>←</span>
              <span className="text-sm">Back</span>
            </motion.button>
          </Link>
          
          <motion.h1
            className="text-xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Settings
          </motion.h1>
          
          <div className="w-16" />
        </div>
      </motion.header>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {settingSections.map((section, i) => (
              <motion.button
                key={section.id}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeSection === section.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="font-medium">{section.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection === 'appearance' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold mb-6">Appearance</h2>
                    
                    {[
                      { key: 'darkMode', label: 'Dark Mode', desc: 'Enable dark theme across the UI' },
                      { key: 'blur', label: 'Glassmorphism', desc: 'Enable blur effects on panels' },
                    ].map((item) => (
                      <motion.div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-white/40">{item.desc}</div>
                        </div>
                        <AnimatedSwitch
                          enabled={settings[item.key as keyof typeof settings] as boolean}
                          onChange={() => updateSetting(item.key, !settings[item.key as keyof typeof settings])}
                        />
                      </motion.div>
                    ))}

                    <AnimatedSlider
                      value={settings.glowStrength}
                      onChange={v => updateSetting('glowStrength', v)}
                      label="Glow Strength"
                    />
                  </div>
                )}

                {activeSection === 'animations' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold mb-6">Animations</h2>
                    
                    <motion.div
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div>
                        <div className="font-medium">Enable Animations</div>
                        <div className="text-sm text-white/40">Master toggle for all animations</div>
                      </div>
                      <AnimatedSwitch
                        enabled={settings.animations}
                        onChange={() => updateSetting('animations', !settings.animations)}
                      />
                    </motion.div>

                    <AnimatedSlider
                      value={settings.animationSpeed}
                      onChange={v => updateSetting('animationSpeed', v)}
                      label="Animation Speed"
                    />

                    <AnimatedSlider
                      value={settings.transitionDuration}
                      onChange={v => updateSetting('transitionDuration', v)}
                      label="Transition Duration"
                    />

                    {/* Animation Preview */}
                    <div className="p-6 bg-black/50 rounded-xl">
                      <div className="text-sm text-white/40 mb-4">Preview</div>
                      <div className="flex gap-4">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-12 h-12 bg-white/20 rounded-lg"
                            animate={{
                              y: [0, -20, 0],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: (100 - settings.animationSpeed) / 20 + 0.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'performance' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold mb-6">Performance</h2>
                    
                    <motion.div
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div>
                        <div className="font-medium">Particle Effects</div>
                        <div className="text-sm text-white/40">Enable floating particle animations</div>
                      </div>
                      <AnimatedSwitch
                        enabled={settings.particles}
                        onChange={() => updateSetting('particles', !settings.particles)}
                      />
                    </motion.div>

                    <AnimatedSlider
                      value={settings.particleDensity}
                      onChange={v => updateSetting('particleDensity', v)}
                      label="Particle Density"
                    />

                    <AnimatedSlider
                      value={settings.blurIntensity}
                      onChange={v => updateSetting('blurIntensity', v)}
                      label="Blur Intensity"
                    />

                    {/* Performance Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'FPS', value: '60' },
                        { label: 'GPU', value: '45%' },
                        { label: 'Memory', value: '128MB' },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="p-4 bg-white/5 rounded-xl text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <motion.div
                            className="text-3xl font-bold font-mono"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'audio' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold mb-6">Audio</h2>
                    
                    <motion.div
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div>
                        <div className="font-medium">Interface Sounds</div>
                        <div className="text-sm text-white/40">Play sounds on interactions</div>
                      </div>
                      <AnimatedSwitch
                        enabled={settings.sound}
                        onChange={() => updateSetting('sound', !settings.sound)}
                      />
                    </motion.div>

                    {/* Visualizer */}
                    <div className="p-6 bg-black/50 rounded-xl">
                      <div className="text-sm text-white/40 mb-4">Audio Visualizer</div>
                      <div className="flex items-end justify-center gap-1 h-20">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 bg-white/60 rounded-t"
                            animate={{
                              height: [20, 40 + Math.random() * 40, 20],
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.05,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'about' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold mb-6">About</h2>
                    
                    <div className="text-center py-12">
                      <motion.div
                        className="text-6xl font-bold tracking-tighter mb-4"
                        animate={{ 
                          textShadow: [
                            '0 0 20px rgba(255,255,255,0)',
                            '0 0 40px rgba(255,255,255,0.5)',
                            '0 0 20px rgba(255,255,255,0)',
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        MAGIC UI
                      </motion.div>
                      <div className="text-white/40 mb-8">Version 2026.1.0</div>
                      
                      <div className="space-y-2 text-sm text-white/60">
                        <div>Built by Magic UI + Infinity Studios</div>
                        <div className="text-white/40">© 2026 Infinity Studios</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Components', value: '100+' },
                        { label: 'Animations', value: '1000+' },
                        { label: 'Pages', value: '15+' },
                        { label: 'FPS Target', value: '120' },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          className="p-4 bg-white/5 rounded-xl"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="text-2xl font-bold">{item.value}</div>
                          <div className="text-xs text-white/40">{item.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
