import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const colors = {
  cyan: '#00bcd4',
  cyanGlow: 'rgba(0, 188, 212, 0.5)',
  dark: '#1a1a1a',
  darker: '#0a0a0a',
  gray: '#2d2d30',
  text: '#d2d2d2',
  pink: '#ff0080',
  purple: '#8000ff'
}

function App() {
  const [particles, setParticles] = useState([])
  const [beat, setBeat] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(p => [...p.slice(-30), {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 4 + 2,
        size: Math.random() * 8 + 4,
        color: Math.random() > 0.5 ? colors.cyan : colors.pink
      }])
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(p => p.map(pt => ({
        ...pt,
        x: pt.x + pt.vx,
        y: pt.y + pt.vy
      })).filter(pt => pt.y < window.innerHeight + 50))
    }, 16)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setBeat(b => !b), 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at center, ${colors.dark} 0%, ${colors.darker} 50%, #050505 100%)`,
      color: colors.text,
      fontFamily: "'Segoe UI', 'Noto Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${colors.cyanGlow} 1px, transparent 1px),
          linear-gradient(90deg, ${colors.cyanGlow} 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.1,
        animation: 'gridMove 20s linear infinite'
      }} />

      <style>{`
        @keyframes gridMove {
          from { transform: translateY(0); }
          to { transform: translateY(50px); }
        }
      `}</style>

      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: p.x, y: p.y, scale: 0 }}
          animate={{ x: p.x, y: p.y, scale: 1 }}
          exit={{ scale: 0 }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 20px ${p.color}`,
            pointerEvents: 'none'
          }}
        />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ textAlign: 'center', padding: '3rem 0' }}
        >
          <motion.div
            animate={{ scale: beat ? 1.05 : 1 }}
            style={{
              display: 'inline-block',
              fontSize: '6rem',
              filter: 'drop-shadow(0 0 30px rgba(0, 188, 212, 0.8))'
            }}
          >
            🌈
          </motion.div>

          <motion.h1
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              background: `linear-gradient(135deg, #fff 0%, ${colors.cyan} 50%, ${colors.pink} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '1rem 0',
              textShadow: 'none'
            }}
          >
            S3RLINUX ATOMIC
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              width: 200,
              height: 4,
              background: `linear-gradient(90deg, transparent, ${colors.cyan}, ${colors.pink}, transparent)`,
              margin: '1rem auto',
              borderRadius: 2
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ fontSize: '1.4rem', color: '#999', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}
          >
            The distro that exists because why not. Based on Aurora (KDE).
            <br />
            Immutable OSTree. The S3RL spirit lives on.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ marginTop: '1.5rem', fontSize: '2rem', fontWeight: 'bold', color: colors.cyan }}
          >
            RAVE ALL NIGHT 💀
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', margin: '2.5rem 0' }}>
            {['🎵 S3RL Themed', '💻 KDE Plasma', '⚡ Immutable OSTree', '🔒 bootc', '🎨 Custom Branding'].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, background: colors.cyan, color: colors.darker, boxShadow: `0 0 30px ${colors.cyan}` }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '0.8rem 1.5rem',
                  borderRadius: 50,
                  border: `1px solid ${colors.cyanGlow}`,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* License Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: `linear-gradient(135deg, rgba(0,188,212,0.15) 0%, rgba(255,0,128,0.1) 100%)`,
            border: `2px solid transparent`,
            borderImage: `linear-gradient(135deg, ${colors.cyan}, ${colors.pink}) 1`,
            borderRadius: 24,
            padding: '3rem',
            margin: '3rem 0',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: -50,
              left: -50,
              width: 100,
              height: 100,
              background: colors.cyan,
              filter: 'blur(50px)',
              opacity: 0.3
            }}
          />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: colors.cyan }}>
            🎵 THE S3RL LICENSE (S3RLL)
          </h2>
          
          <motion.div
            animate={{ 
              textShadow: [
                `0 0 20px ${colors.cyan}`, 
                `0 0 40px ${colors.cyan}, 0 0 60px ${colors.pink}`,
                `0 0 20px ${colors.cyan}`
              ]
            }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', letterSpacing: '0.1em' }}
          >
            RAVE ALL NIGHT
          </motion.div>
          
          <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
            Per the license: you MUST listen to S3RL while using this OS.
          </p>
          <motion.p
            style={{ marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.6, fontSize: '0.9rem' }}
          >
            "lol no tech support included"
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          ✨ Features
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
          {[
            { icon: '💻', title: 'KDE Plasma', desc: 'Because GNOME is fine but KDE hits different. Ricing paradise.' },
            { icon: '⚡', title: 'Immutable OSTree', desc: 'Atomic updates. Rollback when things break. The future.' },
            { icon: '🎨', title: 'Custom Branding', desc: 'S3RL-themed OS colors, SDDM login, Plymouth splash, KDE theme.' },
            { icon: '🔄', title: 'Based on Aurora', desc: 'Built on Universal Blue\'s Aurora. Fedora foundation with KDE.' },
            { icon: '📦', title: 'Customizable', desc: 'Just edit the Containerfile and build.sh. Add your own packages.' },
            { icon: '🌐', title: 'GitHub CI/CD', desc: 'Automatic builds on push. GitHub Actions powered.' }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, boxShadow: `0 20px 40px ${colors.cyanGlow}` }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s',
                perspective: 1000
              }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
              >
                {feature.icon}
              </motion.div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: colors.cyan }}>{feature.title}</h3>
              <p style={{ opacity: 0.75, lineHeight: 1.6 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Code Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '3rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>🚀 Quick Start</h2>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CodeBlock code={`# Switch to our image
sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest

# Reboot
sudo reboot`} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '3rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>🔨 Building Locally</h2>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CodeBlock code={`# Install just first
just build`} />
          </motion.div>
          <p style={{ marginTop: '1rem', textAlign: 'center', opacity: 0.6 }}>
            Or trigger a build from GitHub Actions.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            padding: '3rem 0',
            marginTop: '5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
            {[
              ['GitHub', 'https://github.com/moonlightOS-Meow/S3RLinux-Atomic'],
              ['Releases', 'https://github.com/moonlightOS-Meow/S3RLinux-Atomic/releases'],
              ['Issues', 'https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues']
            ].map(([name, url], i) => (
              <motion.a
                key={name}
                href={url}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ color: colors.cyan, scale: 1.1 }}
                style={{ color: colors.text, textDecoration: 'none', transition: 'all 0.3s' }}
              >
                {name}
              </motion.a>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Built with 💜 and UNTZ UNTZ
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: '0.5rem' }}
          >
            © 2026 S3RLinux • RAVE ALL NIGHT 💀
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: '1.5rem', fontStyle: 'italic', opacity: 0.5 }}
          >
            OOH-OOH OOH-OOH
          </motion.p>
        </motion.footer>
      </div>
    </div>
  )
}

function CodeBlock({ code }) {
  return (
    <motion.pre
      whileHover={{ scale: 1.01 }}
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)',
        padding: '1.5rem 2rem',
        borderRadius: 16,
        overflowX: 'auto',
        border: `1px solid ${colors.cyanGlow}`,
        boxShadow: `0 0 30px rgba(0,188,212,0.2), inset 0 0 30px rgba(0,188,212,0.05)`
      }}
    >
      <code style={{ 
        color: colors.cyan, 
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: '1rem',
        lineHeight: 1.8
      }}>
        {code}
      </code>
    </motion.pre>
  )
}

export default App