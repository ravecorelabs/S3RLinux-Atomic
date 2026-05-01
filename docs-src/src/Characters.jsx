import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const colors = {
  text: '#e8e6ee',
  textMuted: '#9e9aaa',
  border: '#2a2a3a',
  cardBg: '#12121a',
  auroraPurple: '#9146ff',
  auroraPink: '#ec4899',
  auroraBlue: '#3b82f6',
  auroraCyan: '#06b6d4'
}

const characters = [
  {
    id: 'dj-s3r-l',
    name: 'DJ S3R-L',
    icon: '🎧',
    role: 'Main Mascot',
    description: 'The main character - chibi DJ! Pastel glowing hair, white-pink visor, main character energy!',
    color: '#ff0080',
    gradient: 'linear-gradient(135deg, #ff0080, #ff3385)',
    image: 'https://i.imgur.com/9itwj9L_d.webp'
  },
  {
    id: 'atom-chan',
    name: 'Atom-chan',
    icon: '⚛️',
    role: 'OS Mascot',
    description: 'Tiny glowing girl with atomic rings orbiting! Blue/white particle aura.',
    color: '#4488ff',
    gradient: 'linear-gradient(135deg, #4488ff, #88ccff)',
    image: 'https://i.imgur.com/tHZRzg2_d.webp'
  },
  {
    id: 'nightcore-neko',
    name: 'Nightcore Neko + Manjaro',
    icon: '🐱',
    role: 'Roast Duo',
    description: 'Neko holding Manjaro by hoodie! "I-I do not have delayed updates~!!!" 😭💚 "wahhhhhh~!!!"',
    color: '#aa00ff',
    gradient: 'linear-gradient(135deg, #aa00ff, #ff00ff)',
    image: 'https://i.imgur.com/RJlEU2w_d.webp'
  }
]

// Aurora card with glow
function CharacterCard({ char, index }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${hovered ? char.color : colors.border}`,
        borderRadius: 20,
        padding: '1.5rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? `0 8px 32px ${char.color}30` : 'none'
      }}
    >
      {/* Aurora glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 50% 0%, ${char.color}20, transparent 70%)`,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Top gradient line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: char.gradient,
          transformOrigin: 'left'
        }}
      />
      
      {/* Image or Icon */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{ 
          marginBottom: '1rem', 
          display: 'flex', 
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {char.image ? (
          <motion.img 
            src={char.image} 
            alt={char.name}
            animate={{ 
              filter: hovered ? `drop-shadow(0 0 12px ${char.color})` : 'none'
            }}
            style={{ 
              maxWidth: '100%', 
              maxHeight: 140,
              borderRadius: 12,
              objectFit: 'contain'
            }} 
          />
        ) : (
          <motion.span
            animate={{ 
              textShadow: hovered ? `0 0 20px ${char.color}` : 'none'
            }}
            style={{ fontSize: '3rem' }}
          >
            {char.icon}
          </motion.span>
        )}
      </motion.div>
      
      {/* Name with gradient */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.15 }}
        style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          background: char.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.25rem',
          textAlign: 'center'
        }}
      >
        {char.name}
      </motion.h3>
      
      {/* Role badge */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.15 }}
        style={{
          fontSize: '0.7rem',
          color: char.color,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.75rem',
          textAlign: 'center'
        }}
      >
        {char.role}
      </motion.p>
      
      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.15 }}
        style={{
          fontSize: '0.85rem',
          color: colors.textMuted,
          lineHeight: 1.5,
          textAlign: 'center'
        }}
      >
        {char.description}
      </motion.p>
      
      {/* Bottom orbit dots */}
      <motion.div
        animate={{ rotate: hovered ? 360 : 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          bottom: 8,
          right: 12,
          width: 20,
          height: 20,
          border: `2px solid ${char.color}40`,
          borderRadius: '50%',
          borderTopColor: char.color
        }}
      />
    </motion.div>
  )
}

export default function Characters() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #08060f 0%, #0d0a18 50%, #0a0d15 100%)',
      color: colors.text,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      paddingTop: '5rem',
      paddingBottom: '4rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Aurora background elements */}
      <motion.div
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(145, 70, 255, 0.1) 0%, transparent 60%)',
          filter: 'blur(80px)'
        }}
      />
      
      <motion.div
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
          filter: 'blur(60px)'
        }}
      />
      
      <motion.div
        animate={{ 
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '40%',
          right: '20%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 60%)',
          filter: 'blur(50px)'
        }}
      />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ 
          textAlign: 'center', 
          marginBottom: '2.5rem', 
          padding: '0 1rem', 
          position: 'relative',
          zIndex: 1 
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff0080, #9146ff, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          MEET THE DEGENERATES 💀
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '1rem',
            color: colors.textMuted,
            fontWeight: 500
          }}
        >
          S3RLinux Atomic • The Degenerates
        </motion.p>
      </motion.div>

      {/* Characters Grid */}
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        position: 'relative',
        zIndex: 1
      }}>
        {characters.map((char, index) => (
          <CharacterCard key={char.id} char={char} index={index} />
        ))}
      </div>
      
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ 
          textAlign: 'center', 
          marginTop: '2.5rem', 
          padding: '0 1rem',
          position: 'relative',
          zIndex: 1 
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ 
            color: '#4a4a5a', 
            fontSize: '0.75rem',
            letterSpacing: '0.1em'
          }}
        >
          © RaveCore-Labs • 2026
        </motion.p>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          style={{
            position: 'absolute',
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: i % 2 === 0 ? colors.auroraPurple : colors.auroraPink
          }}
        />
      ))}
    </div>
  )
}