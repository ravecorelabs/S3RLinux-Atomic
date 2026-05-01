import { useState } from 'react'
import { motion } from 'framer-motion'

const colors = {
  text: '#e8e6ee',
  textMuted: '#9e9aaa',
  border: '#2a2a3a',
  auroraBg: '#0d0a14',
  auroraPurple: '#9146ff',
  auroraBlue: '#3b82f6',
  auroraPink: '#ec4899'
}

const characters = [
  {
    id: 'dj-s3r-l',
    name: 'DJ S3R-L',
    icon: '🎧',
    role: 'Main Mascot',
    description: 'The main character - a chibi DJ representing S3RL himself! Pastel glowing hair, white-pink shining visor, slight forward stance.',
    color: '#ff0080',
    accent: '#ff3385'
  },
  {
    id: 'atom-chan',
    name: 'Atom-chan',
    icon: '⚛️',
    role: 'OS Mascot',
    description: 'Tiny glowing girl with atomic rings orbiting! Blue/white particle aura.',
    color: '#4488ff',
    accent: '#88ccff'
  },
  {
    id: 'nightcore-neko',
    name: 'Nightcore Neko',
    icon: '🐱',
    role: 'Roast Cannon',
    description: 'Famous for grabbing Manjaro by the hoodie. "I‑I do not have delayed updates~!!!" 😭💚',
    color: '#aa00ff',
    accent: '#ff00ff'
  },
  {
    id: 'manjaro',
    name: 'Manjaro',
    icon: '🐰',
    role: 'Roast Victim',
    description: 'Gets grabbed by the hoodie and dangled. Legs kicking mid-air. "wahhhhhh~!!!" 💚',
    color: '#00aa44',
    accent: '#44ff88'
  }
]

export default function Characters() {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0a14 0%, #1a0a2e 50%, #0d1420 100%)',
      color: colors.text,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      paddingTop: '5rem',
      paddingBottom: '3rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Aurora orbs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(145, 70, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)'
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1rem', position: 'relative', zIndex: 1 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff0080, #9146ff, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.3rem'
          }}
        >
          MEET THE SQUAD ✨
        </motion.h1>
        <p style={{ fontSize: '1rem', color: colors.textMuted, fontWeight: 500 }}>
          S3RLinux Atomic • Main Cast
        </p>
      </motion.div>

      {/* 2x2 GRID - TIGHT */}
      <div style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '0 1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.75rem',
        position: 'relative',
        zIndex: 1
      }}>
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: `0 0 25px ${char.color}30` }}
            onMouseEnter={() => setHovered(char.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: 'rgba(21, 21, 32, 0.7)',
              border: `2px solid ${hovered === char.id ? char.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 14,
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              backdropFilter: 'blur(8px)'
            }}
          >
            {/* Icon */}
            <motion.div whileHover={{ scale: 1.1 }} style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              {char.icon}
            </motion.div>
            
            {/* Name */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.text, marginBottom: '0.15rem', textAlign: 'center' }}>
              {char.name}
            </h3>
            
            {/* Role */}
            <p style={{ fontSize: '0.7rem', color: char.color, fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>
              {char.role}
            </p>
            
            {/* Description */}
            <p style={{ fontSize: '0.8rem', color: colors.textMuted, lineHeight: 1.4, textAlign: 'center' }}>
              {char.description}
            </p>
            
            {/* Bottom strip */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${char.color}, ${char.accent})` }} />
          </motion.div>
        ))}
      </div>
      
      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ textAlign: 'center', marginTop: '1.5rem', padding: '0 1rem', position: 'relative', zIndex: 1 }}
      >
        <p style={{ color: '#4a4a5a', fontSize: '0.75rem' }}>S3RLINUX ATOMIC • 2026 💀</p>
      </motion.div>
    </div>
  )
}