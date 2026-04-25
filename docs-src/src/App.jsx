import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const colors = {
  cyan: '#00bcd4',
  cyanLight: '#26c6da',
  cyanGlow: 'rgba(0, 188, 212, 0.4)',
  pink: '#ff0080',
  purple: '#9c27b0',
  dark: '#0d1117',
  darker: '#010409',
  gray: '#161b22',
  text: '#c9d1d9',
  textMuted: '#8b949e',
  border: '#30363d',
  green: '#238636'
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.darker,
      color: colors.text,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Animated background */}
      <Background />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? `rgba(1,4,9,0.85)` : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{ fontWeight: 800, fontSize: '1.4rem', color: colors.cyan, cursor: 'pointer' }}
          >
            🌈 S3RLINUX
          </motion.div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['Features', 'Get Started', 'Music'].map(link => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                whileHover={{ color: colors.cyan }}
                style={{ 
                  color: scrolled ? colors.text : colors.textMuted, 
                  textDecoration: 'none', 
                  fontSize: '0.95rem', 
                  transition: 'color 0.2s' 
                }}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: colors.green,
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              ⭐ Star on GitHub
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          position: 'relative'
        }}
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Glow behind text */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${colors.cyanGlow} 0%, transparent 70%)`,
            pointerEvents: 'none',
            filter: 'blur(40px)'
          }} />

          <div style={{ maxWidth: 900, position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', marginBottom: '1rem' }}
            >
              🌈
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 900,
                background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.cyan} 50%, ${colors.pink} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                letterSpacing: '-0.03em'
              }}
            >
              S3RLINUX ATOMIC
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: '1.4rem',
                color: colors.textMuted,
                maxWidth: 650,
                margin: '0 auto 2rem',
                lineHeight: 1.8
              }}
            >
              The Linux-based ultimate workstation.
              <br />
              <span style={{ color: colors.cyan }}>Built on Aurora.</span> Powered by S3RL. RAVE ALL NIGHT.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
            >
              <GradientButton>
                🚀 Get S3RLinux
              </GradientButton>
              <Button>
                📖 Documentation
              </Button>
              <SpotifyButton />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                marginTop: '2rem',
                fontSize: '1.8rem',
                fontWeight: 800,
                background: `linear-gradient(90deg, ${colors.cyan}, ${colors.pink})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              RAVE ALL NIGHT 💀
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{ 
                marginTop: '1rem',
                fontStyle: 'italic', 
                color: colors.pink,
                fontSize: '0.9rem' 
              }}
            >
              OOH-OOH OOH-OOH
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <Section id="features" title="✨ What is S3RLinux?">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <Card icon="💻" title="KDE Plasma" desc="Built around KDE Plasma Desktop, carefully customized for the best experience out of the box. Feel right at home." />
          <Card icon="⚡" title="Immutable OSTree" desc="Image-based updates applied in background. Atomic rollbacks to known-good state if anything breaks." />
          <Card icon="🎵" title="S3RL Themed" desc="Custom branding, SDDM theme, Plymouth splash, and the S3RL spirit built in. Because why not." />
          <Card icon="🔒" title="Rock-solid" desc="Updates tested before they reach you. Everything configured, nothing to worry about." />
          <Card icon="🎮" title="Gaming Ready" desc="Support for all graphics cards including Nvidia. Game on, no problem." />
          <Card icon="📦" title="Customizable" desc="Built from bash scripts and Containerfiles. Easy to audit, contribute, and extend." />
        </div>
      </Section>

      {/* Get Started */}
      <Section id="get-started" title="🚀 Get S3RLinux" gray>
        <p style={{ color: colors.textMuted, marginBottom: '2rem', textAlign: 'center' }}>
          Select your hardware configuration to continue.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
          <DownloadCard title="Intel / AMD" desc="For integrated graphics or modern AMD GPUs" recommended />
          <DownloadCard title="Nvidia" desc="For RTX/GTX series graphics cards" />
        </div>

        <CodeSection />
      </Section>

      {/* Music Section */}
      <Section id="music" title="🎵 The S3RL Playlist">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            background: `linear-gradient(135deg, rgba(0,188,212,0.1) 0%, rgba(255,0,128,0.1) 100%)`,
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: '3rem',
            maxWidth: 700,
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: colors.textMuted }}>
            Per the S3RL License (S3RLL): you MUST listen to S3RL while using this OS.
          </p>
          
          <motion.div
            animate={{ 
              textShadow: [`0 0 20px ${colors.cyan}`, `0 0 40px ${colors.cyan}, 0 0 60px ${colors.pink}`, `0 0 20px ${colors.cyan}`]
            }}
            transition={{ repeat: Infinity, duration: 1 }}
            style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}
          >
            RAVE ALL NIGHT
          </motion.div>
          
          <a 
href="https://open.spotify.com/artist/11aa081aKYUzmeFm0yHdT2"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#1DB954',
              color: '#fff',
              padding: '0.8rem 1.5rem',
              borderRadius: 50,
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            🎧 Listen on Spotify
          </a>
          
          <p style={{ marginTop: '1.5rem', fontStyle: 'italic', opacity: 0.5, fontSize: '0.85rem' }}>
            "lol no tech support included"
          </p>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer style={{
        padding: '4rem 2rem 2rem',
        borderTop: `1px solid ${colors.border}`,
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          {['GitHub', 'Documentation', 'License'].map((link, i) => (
            <motion.a
              key={link}
              href={i === 0 ? 'https://github.com/moonlightOS-Meow/S3RLinux-Atomic' : i === 1 ? '#' : '#'}
              whileHover={{ color: colors.cyan }}
              style={{ 
                color: colors.textMuted, 
                textDecoration: 'none',
                transition: 'color 0.2s' 
              }}
            >
              {link}
            </motion.a>
          ))}
        </motion.div>
        
        <p style={{ color: colors.textMuted, fontSize: '0.9rem' }}>
          Proudly built with 💜 by the S3RLinux team.
        </p>
        <p style={{ color: colors.textMuted, fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Based on Aurora. Not affiliated with Fedora, KDE, or Red Hat.
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ 
            marginTop: '1.5rem',
            color: colors.cyan,
            fontStyle: 'italic',
            fontWeight: 600
          }}
        >
          RAVE ALL NIGHT 💀 OOH-OOH
        </motion.p>
      </footer>
    </div>
  )
}

function Background() {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '10%',
        width: 500,
        height: 500,
        background: `radial-gradient(circle, ${colors.cyanGlow} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '10%',
        width: 400,
        height: 400,
        background: `radial-gradient(circle, rgba(255,0,128,0.3) 0%, transparent 70%)`,
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
    </>
  )
}

function Section({ children, id, title, gray }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      style={{
        padding: '6rem 2rem',
        background: gray ? colors.gray : colors.darker
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          marginBottom: '2.5rem',
          textAlign: 'center'
        }}>
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  )
}

function GradientButton({ children }) {
  return (
    <motion.a
      href="#get-started"
      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${colors.cyan}` }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.8rem 1.5rem',
        borderRadius: 8,
        fontWeight: 600,
        fontSize: '1rem',
        textDecoration: 'none',
        background: `linear-gradient(135deg, ${colors.cyan}, ${colors.pink})`,
        color: '#fff',
        boxShadow: `0 0 20px ${colors.cyanGlow}`,
        transition: 'all 0.3s'
      }}
    >
      {children}
    </motion.a>
  )
}

function Button({ children }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.8rem 1.5rem',
        borderRadius: 8,
        fontWeight: 600,
        fontSize: '1rem',
        textDecoration: 'none',
        background: 'transparent',
        color: colors.text,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.2s'
      }}
    >
      {children}
    </motion.a>
  )
}

function SpotifyButton() {
  return (
    <motion.a
      href="https://open.spotify.com/artist/11aa081aKYUzmeFm0yHdT2"
      target="_blank"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.8rem 1.5rem',
        borderRadius: 8,
        fontWeight: 600,
        fontSize: '1rem',
        textDecoration: 'none',
        background: '#1DB954',
        color: '#fff',
        transition: 'all 0.2s'
      }}
    >
      🎵 S3RL
    </motion.a>
  )
}

function Card({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, borderColor: colors.cyan }}
      style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '2rem',
        transition: 'all 0.3s ease'
      }}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
      >
        {icon}
      </motion.div>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{title}</h3>
      <p style={{ color: colors.textMuted, lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  )
}

function DownloadCard({ title, desc, recommended }) {
  return (
    <motion.div
      whileHover={{ borderColor: colors.cyan, scale: 1.02 }}
      style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        textAlign: 'left'
      }}
    >
      {recommended && (
        <span style={{
          background: colors.cyan,
          color: colors.darker,
          padding: '0.2rem 0.6rem',
          borderRadius: 4,
          fontSize: '0.7rem',
          fontWeight: 700
        }}>
          RECOMMENDED
        </span>
      )}
      <h3 style={{ fontSize: '1.2rem', marginTop: recommended ? '0.75rem' : 0 }}>{title}</h3>
      <p style={{ color: colors.textMuted, fontSize: '0.85rem' }}>{desc}</p>
    </motion.div>
  )
}

function CodeSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      style={{
        maxWidth: 600,
        margin: '2.5rem auto 0',
        textAlign: 'center'
      }}
    >
      <p style={{ color: colors.textMuted, marginBottom: '1rem' }}>Or use bootc to switch:</p>
      <pre style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '1.5rem',
        textAlign: 'left',
        overflowX: 'auto'
      }}>
        <code style={{ color: colors.cyan, fontFamily: 'monospace' }}>
{`sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest
sudo reboot`}
        </code>
      </pre>
    </motion.div>
  )
}

export default App