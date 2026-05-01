import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const colors = {
  purple: '#9c27b0',
  pink: '#ff0080',
  purpleDark: '#7b1fa2',
  pinkLight: '#ff3385',
  cyanGlow: 'rgba(156, 39, 176, 0.4)',
  pinkGlow: 'rgba(255, 0, 128, 0.4)',
  dark: '#0d0a14',
  darker: '#050308',
  gray: '#151520',
  grayLight: '#1e1e2a',
  text: '#e8e6ee',
  textMuted: '#9e9aaa',
  border: '#2a2a3a',
  green: '#00ff88',
  cyan: '#00ffff'
}

const characters = [
  {
    id: 'dj-s3r-l',
    name: 'DJ S3R-L',
    emoji: '🎧',
    icon: '🎧',
    role: 'Main Mascot',
    description: 'The main character - a chibi DJ representing S3RL himself! Pastel glowing hair, white-pink shining visor, slight forward stance. Main character energy!',
    color: '#ff0080',
    accent: '#ff3385'
  },
  {
    id: 'atom-chan',
    name: 'Atom-chan',
    emoji: '⚛️',
    icon: '⚛️',
    role: 'Mascot',
    description: 'Tiny glowing girl with atomic rings orbiting! Blue/white particle aura. The OS mascot!',
    color: '#4488ff',
    accent: '#88ccff'
  },
  {
    id: 'nightcore-neko',
    name: 'Nightcore Neko',
    emoji: '🌙',
    icon: '🐱',
    role: 'Roast Cannon',
    description: 'Raver cat with glowing purple ribbon tails! Famous for grabbing Manjaro by the hoodie and dangling them. "I‑I do not have delayed updates~!!!" 😭💚',
    color: '#aa00ff',
    accent: '#ff00ff'
  },
  {
    id: 'manjaro',
    name: 'Manjaro',
    emoji: '🥺',
    icon: '🐰',
    role: 'Roast Victim',
    description: 'Gets grabbed by the hoodie and dangled by Neko. Legs kicking mid-air. Watery eyes. "wahhhhhh~!!!" 💚',
    color: '#00aa44',
    accent: '#44ff88'
  }
]

export default function Characters() {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.darker,
      color: colors.text,
      fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
      paddingTop: '5rem',
      paddingBottom: '4rem'
    }}>
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '0 2rem'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff0080, #aa00ff, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}
        >
          S3RLINUX ATOMIC
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '1.3rem',
            color: colors.textMuted,
            fontWeight: 500
          }}
        >
          Meet the Cast ✨
        </motion.p>
      </motion.div>

      {/* CHARACTERS GRID */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: `0 0 40px ${char.color}40`
            }}
            onClick={() => setSelected(selected === char.id ? null : char.id)}
            onMouseEnter={() => setHovered(char.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: colors.gray,
              border: `2px solid ${selected === char.id ? char.color : colors.border}`,
              borderRadius: 20,
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Gradient overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered === char.id ? 1 : 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at center, ${char.color}15, transparent)`,
                pointerEvents: 'none'
              }}
            />
            
            {/* Character Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
            >
              {char.icon}
            </motion.div>
            
            {/* Character Name */}
            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: colors.text,
              marginBottom: '0.25rem',
              textAlign: 'center'
            }}>
              {char.name}
            </h3>
            
            {/* Role */}
            <p style={{
              fontSize: '0.8rem',
              color: char.color,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {char.role}
            </p>
            
            {/* Description */}
            <p style={{
              fontSize: '0.9rem',
              color: colors.textMuted,
              lineHeight: 1.6,
              textAlign: 'center'
            }}>
              {char.description}
            </p>
            
            {/* Color indicator */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: char.gradient || `linear-gradient(90deg, ${char.color}, ${char.accent})`
            }} />
          </motion.div>
        ))}
      </div>
      
      {/* FOOTNOTE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '0 2rem'
        }}
      >
        <p style={{ color: colors.textMuted, fontSize: '0.9rem' }}>
          Full cast poster coming soon! 🎨
        </p>
      </motion.div>
    </div>
  )
}