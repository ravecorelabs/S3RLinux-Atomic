import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// S3RL THEME - NEON PURPLE/PINK 💀
const colors = {
  purple: '#9c27b0',
  pink: '#ff0080',
  purpleDark: '#7b1fa2',
  pinkLight: '#ff3385',
  cyanGlow: 'rgba(156, 39, 176, 0.4)',
  pinkGlow: 'rgba(255, 0, 128, 0.4)',
  dark: '#0d0a14',
  darker: '#050308',
  gray: '#1a1425',
  text: '#e0d6e8',
  textMuted: '#9e86a8',
  border: '#2d2140',
  green: '#238636'
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [workflowRuns, setWorkflowRuns] = useState([])
  const [loadingRuns, setLoadingRuns] = useState(true)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.85])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch('https://api.github.com/repos/moonlightOS-Meow/S3RLinux-Atomic/actions/runs?per_page=5', {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(res => res.json())
    .then(data => { setWorkflowRuns(data.workflow_runs || []); setLoadingRuns(false) })
    .catch(() => setLoadingRuns(false))
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
      {/* S3RL RAVE BUTTON */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        onClick={() => s3rlRave()}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.85 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100,
          background: `linear-gradient(135deg, ${colors.purple}, ${colors.pink})`,
          border: 'none',
          borderRadius: '50%',
          width: 70,
          height: 70,
          fontSize: '1.8rem',
          cursor: 'pointer',
          boxShadow: `0 0 30px ${colors.pinkGlow}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        💀
      </motion.button>

      {/* Animated background orbs */}
      <Background />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? `rgba(5,3,8,0.9)` : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '1.2rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <motion.div 
            whileHover={{ scale: 1.08, textShadow: `0 0 20px ${colors.pink}` }}
            style={{ fontWeight: 900, fontSize: '1.5rem', color: colors.pink, cursor: 'pointer', textShadow: '0 0 10px rgba(255,0,128,0.5)' }}
          >
            ⚡ S3RLINUX
          </motion.div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['Features', 'Builds', 'Get Started', 'Music'].map(link => (
              <motion.a
                key={link}
                href={link === 'Builds' ? '#workflows' : `#${link.toLowerCase().replace(' ', '-')}`}
                whileHover={{ color: colors.pink, y: -2 }}
                style={{ 
                  color: scrolled ? colors.text : colors.textMuted, 
                  textDecoration: 'none', 
                  fontSize: '0.95rem', 
                  fontWeight: 500,
                  transition: 'color 0.2s' 
                }}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic"
              target="_blank"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: colors.green,
                color: '#fff',
                padding: '0.6rem 1.2rem',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              ⭐ Star
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
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
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
          {/* Glow effects */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{
              position: 'absolute',
              top: '25%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 700,
              height: 700,
              background: `radial-gradient(circle, ${colors.purpleGlow} 0%, transparent 70%)`,
              pointerEvents: 'none',
              filter: 'blur(50px)'
            }}
          />

          <div style={{ maxWidth: 900, position: 'relative', zIndex: 1 }}>
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0, rotate: -360 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
              style={{ fontSize: 'clamp(6rem, 18vw, 12rem)', marginBottom: '0.5rem' }}
            >
              🌈
            </motion.div>

            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                fontWeight: 900,
                background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.purple} 50%, ${colors.pink} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.2rem',
                letterSpacing: '-0.04em',
                lineHeight: 1.1
              }}
            >
              S3RLINUX<br/>ATOMIC
            </motion.h1>

            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: '1.5rem',
                color: colors.textMuted,
                maxWidth: 680,
                margin: '0 auto 2.5rem',
                lineHeight: 1.7
              }}
            >
              The ultimate Happy Hardcore Linux experience.
              <br />
              <span style={{ color: colors.purple, fontWeight: 600 }}>Built on bootc.</span> Powered by S3RL. 
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}
            >
              <GradientButton>🚀 Get S3RLinux</GradientButton>
              <Button>📖 Docs</Button>
              <SpotifyButton />
            </motion.div>

            {/* RAVE ALL NIGHT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              style={{
                marginTop: '3rem',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 800,
                letterSpacing: '0.15em',
                background: `linear-gradient(90deg, ${colors.purple}, ${colors.pink})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              RAVE ALL NIGHT 💀
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.5rem'
          }}
        >
          ↓
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <Section id="features" title="✨ Why S3RLinux?" gray={false}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <Card icon="⚡" title="bootc Powered" desc="Immutable atomic updates. Rollback anytime. Enterprise-grade stability meets DJ-level energy." />
          <Card icon="🎨" title="KDE Plasma" desc="The best desktop experience. Fully themed with S3RL purple/pink magic." />
          <Card icon="🎵" title="Audio Ready" desc="Low latency audio kernel. Plug in your gear and rave. Windows ASIO drivers supported." />
          <Card icon="🎮" title="Gaming Ready" desc="RPMFusion + Steam + Lutris. All your games in one place. No compromises." />
          <Card icon="🔒" title="Security Fixed" desc="Automated security updates. Because nobody wants their box pwned." />
          <Card icon="💀" title="S3RL Themed" desc="Custom SDDM login, Plymouth boot splash, KDE colors. Fully branded." />
        </div>
      </Section>

      {/* BUILDS SECTION */}
      <Section id="workflows" title="🔄 Recent Builds" gray={true}>
        <StatusWidget />
        <div style={{ marginTop: '2rem' }}>
          {loadingRuns ? (
            <p style={{ textAlign: 'center', color: colors.textMuted }}>Loading builds...</p>
          ) : workflowRuns.length === 0 ? (
            <p style={{ textAlign: 'center', color: colors.textMuted }}>No recent builds</p>
          ) : (
            workflowRuns.map(run => <WorkflowCard key={run.id} run={run} />)
          )}
        </div>
      </Section>

      {/* DOWNLOADS SECTION */}
      <Section id="get-started" title="🚀 Get Started" gray={false}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <DownloadCard 
            title="Container Image" 
            desc="ghcr.io/moonlightos-meow/s3rlinux-atomic:latest - For bootc systems"
            recommended={true}
          />
          <DownloadCard 
            title="VM Image (qcow2)" 
            desc="Virtual machine ready. Import into libvirt/VMware. ~3GB"
          />
          <DownloadCard 
            title="ISO Installer" 
            desc="Live ISO for bare metal installation. Write to USB."
          />
        </div>
        <CodeSection />
      </Section>

      {/* MUSIC SECTION */}
      <Section id="music" title="🎵 The Soundtrack" gray={true}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}
        >
          <p style={{ fontSize: '1.2rem', color: colors.textMuted, marginBottom: '1.5rem' }}>
            Every good OS needs a playlist. Here's what plays on loop while you code:
          </p>
          <motion.a
            href="https://open.spotify.com/artist/11aa081aKYUzmeFm0yHdT2"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: '#1DB954',
              color: '#fff',
              borderRadius: 50,
              fontSize: '1.1rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            🎧 Listen to S3RL on Spotify
          </motion.a>
        </motion.div>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: `1px solid ${colors.border}` }}>
        <p style={{ color: colors.textMuted, marginBottom: '0.5rem' }}>
          Built with 💜 by moonlightOS-Meow
        </p>
        <p style={{ color: colors.textMuted, fontSize: '0.85rem', opacity: 0.7 }}>
          RAVE ALL NIGHT 💀 | lol no tech support included
        </p>
      </footer>
    </div>
  )
}

// RAVE MODE - confetti explosion 💀
function s3rlRave() {
  const confetti = () => {
    for (let i = 0; i < 50; i++) {
      const hue = Math.random() * 360
      const rave = document.createElement('div')
      rave.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -20px;
        width: ${8 + Math.random() * 12}px;
        height: ${8 + Math.random() * 12}px;
        background: hsl(${hue}, 100%, 60%);
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px hsl(${hue}, 100%, 50%);
        animation: r3e ${1.5 + Math.random()}s ease-in forwards;
      `
      document.body.appendChild(rave)
      setTimeout(() => rave.remove(), 2500)
    }
  confetti()
}

const style = document.createElement('style')
style.textContent = `
  @keyframes r3e {
    to { transform: translateY(100vh) rotate(720deg) scale(0); opacity: 0; }
  }
`
document.head.appendChild(style)

function Background() {
  return (
    <>
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '8%', left: '8%', width: 550, height: 550, background: `radial-gradient(circle, ${colors.purpleGlow} 0%, transparent 70%)`, filter: 'blur(90px)', pointerEvents: 'none' }} 
      />
      <motion.div 
        animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        style={{ position: 'fixed', bottom: '12%', right: '12%', width: 420, height: 420, background: `radial-gradient(circle, rgba(255,0,128,0.25) 0%, transparent 70%)`, filter: 'blur(90px)', pointerEvents: 'none' }} 
      />
    </>
  )
}

function Section({ children, id, title, gray }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      style={{ padding: '7rem 2rem', background: gray ? colors.gray : colors.darker }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, ${colors.text}, ${colors.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </motion.section>
  )
}

function GradientButton({ children }) {
  return (
    <motion.a
      href="#get-started"
      whileHover={{ scale: 1.08, boxShadow: `0 0 40px ${colors.purple}` }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.9rem 1.8rem',
        borderRadius: 10,
        fontWeight: 600,
        fontSize: '1rem',
        textDecoration: 'none',
        background: `linear-gradient(135deg, ${colors.purple}, ${colors.pink})`,
        color: '#fff',
        boxShadow: `0 0 25px ${colors.purpleGlow}`
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
      whileHover={{ scale: 1.05, borderColor: colors.pink }} 
      whileTap={{ scale: 0.98 }} 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.8rem', borderRadius: 10, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', background: 'transparent', color: colors.text, border: `1px solid ${colors.border}` }}
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
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px #1DB954' }} 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.8rem', borderRadius: 10, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', background: '#1DB954', color: '#fff' }}
    >
      🎵 S3RL
    </motion.a>
  )
}

function Card({ icon, title, desc }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, borderColor: colors.purple }}
      style={{ background: colors.darker, border: `1px solid ${colors.border}`, borderRadius: 16, padding: '2rem', transition: 'border-color 0.3s' }}
    >
      <motion.div 
        animate={{ rotate: [0, 8, -8, 0] }} 
        transition={{ repeat: Infinity, duration: 5 }} 
        style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
      >
        {icon}
      </motion.div>
      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', fontWeight: 600 }}>{title}</h3>
      <p style={{ color: colors.textMuted, lineHeight: 1.65, fontSize: '0.95rem' }}>{desc}</p>
    </motion.div>
  )
}

function StatusWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <img 
          src="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/actions/workflows/build.yml/badge.svg" 
          alt="Build Status"
          style={{ height: 22 }}
        />
        <img 
          src="https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/s3rlinux-atomic" 
          alt="ArtifactHub"
          style={{ height: 22 }}
        />
        <a href="https://stats.uptimerobot.com/wYoVLjGhlA" target="_blank" style={{ textDecoration: 'none' }}>
          <img 
            src="https://img.shields.io/uptimerobot/status/795507046.svg" 
            alt="Uptime"
            style={{ height: 22 }}
          />
        </a>
      </div>
      <p style={{ color: colors.textMuted, fontSize: '0.9rem' }}>
        ✅ Container image built successfully
      </p>
    </motion.div>
  )
}

function DownloadCard({ title, desc, recommended }) {
  return (
    <motion.div 
      whileHover={{ borderColor: colors.pink, scale: 1.03, boxShadow: `0 0 25px ${colors.pinkGlow}` }} 
      style={{ background: colors.darker, border: `1px solid ${colors.border}`, borderRadius: 14, padding: '1.75rem', cursor: 'pointer', textAlign: 'left' }}
    >
      {recommended && <span style={{ background: colors.purple, color: '#fff', padding: '0.25rem 0.7rem', borderRadius: 5, fontSize: '0.7rem', fontWeight: 700 }}>RECOMMENDED</span>}
      <h3 style={{ fontSize: '1.25rem', marginTop: recommended ? '0.8rem' : 0, marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: colors.textMuted, fontSize: '0.9rem' }}>{desc}</p>
    </motion.div>
  )
}

function CodeSection() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }}
      style={{ maxWidth: 600, margin: '3rem auto 0', textAlign: 'center' }}
    >
      <p style={{ color: colors.textMuted, marginBottom: '1rem' }}>Or use bootc to switch:</p>
      <pre style={{ background: colors.darker, border: `1px solid ${colors.border}`, borderRadius: 14, padding: '1.75rem', textAlign: 'left', overflowX: 'auto' }}>
        <code style={{ color: colors.pink, fontFamily: "'Fira Code', monospace", fontSize: '0.95rem' }}>{`sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest
sudo reboot`}</code>
      </pre>
    </motion.div>
  )
}

function WorkflowCard({ run }) {
  const statusEmoji = {
    success: '✅',
    failure: '❌',
    queued: '⏳',
    in_progress: '🔄'
  }
  const date = new Date(run.created_at).toLocaleDateString()
  const time = new Date(run.created_at).toLocaleTimeString()
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        background: colors.darker,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginTop: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <span style={{ fontSize: '1.6rem' }}>{statusEmoji[run.status] || '❓'}</span>
        <div>
          <p style={{ fontWeight: 600, fontSize: '1rem' }}>{run.name}</p>
          <p style={{ color: colors.textMuted, fontSize: '0.85rem' }}>{date} at {time}</p>
        </div>
      </div>
      <motion.a 
        href={run.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ color: colors.pink }} 
        style={{ color: colors.purple, textDecoration: 'none', fontSize: '0.9rem' }}
      >
        View on GitHub →
      </motion.a>
    </motion.div>
  )
}

export default App