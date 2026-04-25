import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const colors = {
  cyan: '#00bcd4',
  dark: '#1a1a1a',
  darker: '#0a0a0a',
  gray: '#2d2d30',
  text: '#d2d2d2'
}

function App() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(p => [...p.slice(-20), {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 2
      }])
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loop = () => {
      setParticles(p => p.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy
      })).filter(p => p.y < window.innerHeight + 20))
    }
    const id = setInterval(loop, 16)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darker} 100%)`,
      color: colors.text,
      fontFamily: "'Segoe UI', 'Noto Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: p.x, y: p.y }}
          animate={{ x: p.x, y: p.y }}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: colors.cyan,
            boxShadow: `0 0 10px ${colors.cyan}`
          }}
        />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ textAlign: 'center', padding: '4rem 0' }}
        >
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              fontSize: '4rem',
              background: `linear-gradient(135deg, #fff, ${colors.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '1rem 0',
              textShadow: `0 0 30px rgba(0, 188, 212, 0.3)`
            }}
          >
            🌈 S3RLINUX ATOMIC
          </motion.h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-block',
              background: colors.cyan,
              color: colors.darker,
              padding: '0.5rem 1rem',
              borderRadius: 20,
              fontWeight: 'bold',
              margin: '0.5rem 0'
            }}
          >
            bootc Image
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '1.3rem', color: '#888', maxWidth: 700, margin: '0 auto' }}
          >
            We made a distro because why not. Based on Aurora (KDE). Immutable OSTree.
            The S3RL spirit lives on.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.5 }}
          >
            RAVE ALL NIGHT 💀
          </motion.p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', margin: '2rem 0' }}>
            {['🎵 S3RL Themed', '💻 KDE Plasma', '⚡ Immutable OSTree', '🔒 bootc', '🎨 Custom Branding'].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, background: colors.cyan, color: colors.darker }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.8rem 1.5rem',
                  borderRadius: 50,
                  border: '1px solid rgba(255,255,255,0.2)',
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            background: 'rgba(0,188,212,0.1)',
            border: `2px solid ${colors.cyan}`,
            borderRadius: 20,
            padding: '2rem',
            margin: '3rem 0',
            textAlign: 'center'
          }}
        >
          <h2 style={{ color: colors.cyan, fontSize: '2rem', marginBottom: '1rem' }}>
            🎵 THE S3RL LICENSE (S3RLL)
          </h2>
          <motion.p
            animate={{ textShadow: [`0 0 10px ${colors.cyan}`, `0 0 30px ${colors.cyan}`, `0 0 10px ${colors.cyan}`] }}
            transition={{ repeat: Infinity, duration: 1 }}
            style={{ fontSize: '3rem', fontWeight: 'bold' }}
          >
            RAVE ALL NIGHT
          </motion.p>
          <p style={{ marginTop: '1rem' }}>
            Per the license: you MUST listen to S3RL while using this OS.
          </p>
          <p style={{ fontStyle: 'italic', opacity: 0.7, marginTop: '0.5rem' }}>
            "lol no tech support included"
          </p>
        </motion.div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>✨ Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ y: -5, borderColor: colors.cyan, boxShadow: `0 10px 30px rgba(0,188,212,0.2)` }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: colors.cyan }}>{feature.title}</h3>
              <p style={{ opacity: 0.8 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀 Quick Start</h2>
          <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: 10, overflowX: 'auto' }}><code>{`# Switch to our image
sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest

# Reboot
sudo reboot`}</code></pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>🔨 Building Locally</h2>
          <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: 10, overflowX: 'auto' }}><code>{`# Install just first
just build`}</code></pre>
          <p style={{ marginTop: '1rem' }}>Or trigger a build from GitHub Actions.</p>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            textAlign: 'center',
            padding: '2rem 0',
            marginTop: '4rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.9rem',
            opacity: 0.7
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', margin: '1rem 0' }}>
            <a href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic" style={{ color: colors.text, textDecoration: 'none' }}>GitHub</a>
            <a href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/releases" style={{ color: colors.text, textDecoration: 'none' }}>Releases</a>
            <a href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues" style={{ color: colors.text, textDecoration: 'none' }}>Issues</a>
          </div>
          <p>Built with 💜 and UNTZ UNTZ</p>
          <p>© 2026 S3RLinux • RAVE ALL NIGHT 💀</p>
          <p style={{ marginTop: '1rem', fontStyle: 'italic', opacity: 0.5 }}>OOH-OOH OOH-OOH</p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App