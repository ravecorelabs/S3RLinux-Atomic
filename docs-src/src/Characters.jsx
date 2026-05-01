import { useState } from 'react'
import { motion } from 'framer-motion'

const colors = {
  text: '#e8e6ee',
  textMuted: '#9e9aaa',
  border: '#2a2a3a',
  cardBg: '#12121a'
}

const characters = [
  {
    id: 'dj-s3r-l',
    name: 'DJ S3R-L',
    role: 'Main Mascot',
    description: 'The main character - chibi DJ! Pastel glowing hair, white-pink visor, main character energy!',
    color: '#ff0080',
    image: 'https://i.imgur.com/9itwj9L_d.webp'
  },
  {
    id: 'atom-chan',
    name: 'Atom-chan',
    role: 'OS Mascot',
    description: 'Tiny glowing girl with atomic rings orbiting! Blue/white particle aura.',
    color: '#4488ff',
    image: 'https://i.imgur.com/tHZRzg2_d.webp'
  },
  {
    id: 'nightcore-neko',
    name: 'Nightcore Neko + Manjaro',
    role: 'Roast Duo',
    description: 'Neko holding Manjaro by hoodie! "I-I do not have delayed updates~!!!" 😭💚 "wahhhhhh~!!!"',
    color: '#aa00ff',
    image: 'https://i.imgur.com/RJlEU2w_d.webp'
  }
]

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
        borderRadius: 16,
        padding: '1.5rem',
        cursor: 'pointer',
        boxShadow: hovered ? `0 0 20px ${char.color}20` : 'none'
      }}
    >
      <motion.div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <img 
          src={char.image} 
          alt={char.name}
          style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 12, objectFit: 'contain' }} 
        />
      </motion.div>
      
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: char.color, marginBottom: '0.25rem', textAlign: 'center' }}>
        {char.name}
      </h3>
      
      <p style={{ fontSize: '0.7rem', color: colors.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', textAlign: 'center' }}>
        {char.role}
      </p>
      
      <p style={{ fontSize: '0.85rem', color: colors.textMuted, lineHeight: 1.5, textAlign: 'center' }}>
        {char.description}
      </p>
    </motion.div>
  )
}

export default function Characters() {
  return (
    <div style={{ minHeight: '100vh', background: '#050308', color: colors.text, fontFamily: "'Inter', 'Segoe UI', sans-serif", paddingTop: '5rem', paddingBottom: '4rem' }}>
      
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 1rem' }}>
        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #ff0080, #aa00ff, #4488ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem' 
        }}>
          MEET THE DEGENERATES 💀
        </h1>
        <p style={{ fontSize: '1rem', color: colors.textMuted }}>S3RLinux Atomic</p>
      </motion.div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {characters.map((char, index) => (<CharacterCard key={char.id} char={char} index={index} />))}
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', marginTop: '2.5rem', padding: '0 1rem' }}>
        <p style={{ color: '#4a4a5a', fontSize: '0.75rem', letterSpacing: '0.1em' }}>© RaveCore-Labs • 2026</p>
      </motion.div>
    </div>
  )
}