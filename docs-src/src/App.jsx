import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const colors = {
  cyan: '#00bcd4',
  cyanLight: '#26c6da',
  cyanDark: '#0097a7',
  purple: '#9c27b0',
  dark: '#0d1117',
  darker: '#010409',
  gray: '#161b22',
  text: '#c9d1d9',
  textMuted: '#8b949e',
  border: '#30363d'
}

function App() {
  const [scrolled, setScrolled] = useState(false)

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
          background: scrolled ? `rgba(1,4,9,0.9)` : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
          transition: 'all 0.3s'
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
          <div style={{ fontWeight: 'bold', fontSize: '1.3rem', color: colors.cyan }}>
            🌈 S3RLINUX
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Features', 'Get Started', 'Community'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${colors.cyan}15 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 800, position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              marginBottom: '1rem'
            }}
          >
            🌈
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.cyan} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}
          >
            S3RLINUX ATOMIC
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '1.25rem',
              color: colors.textMuted,
              maxWidth: 600,
              margin: '0 auto 2rem',
              lineHeight: 1.7
            }}
          >
            The Linux-based ultimate workstation.
            <br />
            Built on Aurora. Powered by S3RL. RAVE ALL NIGHT.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Button primary>
              🚀 Get S3RLinux
            </Button>
            <Button>
              📖 Documentation
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            style={{
              marginTop: '3rem',
              color: colors.cyan,
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}
          >
            RAVE ALL NIGHT 💀
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section id="features" style={{ padding: '6rem 2rem', background: colors.gray }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle>What is S3RLinux?</SectionTitle>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <FeatureCard
              icon="💻"
              title="KDE Plasma"
              desc="Built around the customizable and adaptable KDE Plasma Desktop Environment, carefully customized for the best experience out of the box."
            />
            <FeatureCard
              icon="⚡"
              title="Immutable OSTree"
              desc="Image-based updates that get applied in the background. Rollback to a known-good state if anything breaks."
            />
            <FeatureCard
              icon="🎵"
              title="S3RL Themed"
              desc="Because why not. Custom branding, SDDM theme, Plymouth splash, and the S3RL spirit built in."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle>Built different.</SectionTitle>
          
          <div style={{ display: 'grid', gap: '3rem', marginTop: '3rem' }}>
            <FeatureRow
              icon="🔒"
              title="Rock-solid security"
              desc="Updates are built and tested before they reach you. Everything configured, nothing to worry about."
            />
            <FeatureRow
              icon="🎮"
              title="Gaming ready"
              desc="Support for all graphics cards including Nvidia. Game on, no problem."
            />
            <FeatureRow
              icon="📦"
              title="Customizable"
              desc="Built from bash scripts and Containerfiles. Easy to audit, contribute, and extend."
            />
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section id="get-started" style={{ padding: '6rem 2rem', background: colors.gray }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <SectionTitle>Get S3RLinux</SectionTitle>
          
          <p style={{ color: colors.textMuted, marginBottom: '2rem', fontSize: '1.1rem' }}>
            Select your hardware configuration to continue.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <DownloadCard
              title="Intel / AMD"
              desc="For integrated graphics or modern AMD GPUs"
              badge="Recommended"
            />
            <DownloadCard
              title="Nvidia"
              desc="For RTX/GTX series graphics cards"
            />
          </div>

          <CodeBlock>{`# Switch to our image
sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest

# Reboot
sudo reboot`}</CodeBlock>
        </div>
      </section>

      {/* Community */}
      <section id="community" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <SectionTitle>For the community, by the community.</SectionTitle>
          
          <p style={{ color: colors.textMuted, marginBottom: '2rem', maxWidth: 600, margin: '1rem auto' }}>
            S3RLinux is built and maintained by the community. We are passionate in what we do.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Button>GitHub</Button>
            <Button>Discord</Button>
            <Button>Forums</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        borderTop: `1px solid ${colors.border}`,
        textAlign: 'center'
      }}>
        <p style={{ color: colors.textMuted, fontSize: '0.9rem' }}>
          Proudly built with 💜 by the S3RLinux team.
        </p>
        <p style={{ color: colors.textMuted, fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Based on Aurora. Not affiliated with Fedora, KDE, or Red Hat.
        </p>
        <p style={{ color: colors.cyan, marginTop: '1rem', fontStyle: 'italic' }}>
          RAVE ALL NIGHT 💀 OOH-OOH
        </p>
      </footer>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <motion.h2
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        textAlign: 'center'
      }}
    >
      {children}
    </motion.h2>
  )
}

function Button({ children, primary }) {
  return (
    <motion.a
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
        background: primary ? colors.cyan : 'transparent',
        color: primary ? colors.darker : colors.text,
        border: primary ? 'none' : `1px solid ${colors.border}`,
        transition: 'all 0.2s'
      }}
    >
      {children}
    </motion.a>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '2rem',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: colors.text }}>{title}</h3>
      <p style={{ color: colors.textMuted, lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  )
}

function FeatureRow({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start'
      }}
    >
      <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>{icon}</div>
      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: colors.textMuted, lineHeight: 1.7 }}>{desc}</p>
      </div>
    </motion.div>
  )
}

function DownloadCard({ title, desc, badge }) {
  return (
    <motion.div
      whileHover={{ borderColor: colors.cyan }}
      style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '2rem',
        textAlign: 'left',
        transition: 'all 0.3s',
        cursor: 'pointer'
      }}
    >
      {badge && (
        <span style={{
          background: colors.cyan,
          color: colors.darker,
          padding: '0.25rem 0.75rem',
          borderRadius: 4,
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          {badge}
        </span>
      )}
      <h3 style={{ fontSize: '1.3rem', marginTop: badge ? '1rem' : 0, marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: colors.textMuted, fontSize: '0.9rem' }}>{desc}</p>
    </motion.div>
  )
}

function CodeBlock({ children }) {
  return (
    <motion.pre
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '1.5rem',
        marginTop: '2rem',
        overflowX: 'auto',
        textAlign: 'left'
      }}
    >
      <code style={{ color: colors.cyan, fontFamily: 'monospace', fontSize: '0.95rem' }}>
        {children}
      </code>
    </motion.pre>
  )
}

export default App