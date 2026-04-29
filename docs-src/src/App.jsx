import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// S3RL THEME - Aurora inspired but with purple/pink 💀
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
  green: '#238636',
  cardBg: '#0f0f18'
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

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
      fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* NAVIGATION */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? `rgba(5,3,8,0.95)` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.span whileHover={{ scale: 1.1, rotate: 5 }} style={{ fontSize: '1.8rem' }}>
              🌈
            </motion.span>
            <span style={{ fontWeight: 700, fontSize: '1.25rem', color: colors.text }}>
              S3RLinux
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['Features', 'Download', 'Compare', 'Community'].map(link => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                whileHover={{ color: colors.pink }}
                style={{ 
                  color: scrolled ? colors.text : colors.textMuted, 
                  textDecoration: 'none', 
                  fontSize: '0.9rem', 
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'transparent',
                color: colors.text,
                padding: '0.5rem 1rem',
                borderRadius: 8,
                fontWeight: 500,
                fontSize: '0.85rem',
                textDecoration: 'none',
                border: `1px solid ${colors.border}`
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '8rem 2rem 6rem',
          position: 'relative'
        }}
      >
        <motion.div style={{ opacity: heroOpacity }}>
          {/* Glow */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 600,
            background: `radial-gradient(circle, ${colors.purpleGlow} 0%, transparent 60%)`,
            pointerEvents: 'none',
            filter: 'blur(60px)'
          }} />

          <div style={{ maxWidth: 800, position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                color: colors.pink,
                fontWeight: 600,
                marginBottom: '1.5rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              The Linux-based ultimate workstation
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight: 800,
                color: colors.text,
                marginBottom: '1.5rem',
                lineHeight: 1.1
              }}
            >
              This is your new desktop.
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: colors.textMuted,
                maxWidth: 600,
                margin: '0 auto 2.5rem',
                lineHeight: 1.7
              }}
            >
              Power on and feel right at home when using your computer, from the first moment on. 
              No distractions or ads. Develop faster than ever before. 
              <span style={{ color: colors.pink }}> RAVE ALL NIGHT.</span>
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <PrimaryButton>Get S3RLinux</PrimaryButton>
              <SecondaryButton>Documentation</SecondaryButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            color: colors.textMuted,
            fontSize: '1.5rem'
          }}
        >
          ↓
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <Section id="features" title="How does S3RLinux fit in for you?">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <FeatureCard 
            icon="⚡"
            title="Automatic updates, forever."
            description="S3RLinux downloads and applies updates automatically in the background. This includes the operating system itself and all installed applications. Let us take care of your updates."
          />
          <FeatureCard 
            icon="🎮"
            title="Expanded hardware support."
            description="S3RLinux includes support for all graphics cards and CPUs, including GPUs from Nvidia. Extended support for game controllers and more."
          />
          <FeatureCard 
            icon="🛠️"
            title="Helping you along the way."
            description="We include scripts and common utilities to help you get started quickly and set up some common pieces of software in a non-intrusive way."
          />
          <FeatureCard 
            icon="👨‍💻"
            title="Developer tools are a click away."
            description="The developer experience includes commonly used developer tools like VS Code and comes preconfigured for containerized development with Docker."
          />
          <FeatureCard 
            icon="🍺"
            title="Homebrew on-tap."
            description="S3RLinux automatically includes Homebrew with every installation, making it easy to discover and install your favorite CLI tools."
          />
          <FeatureCard 
            icon="💀"
            title="For the community, by the community."
            description="S3RLinux is built and maintained by the community, for the community. We are passionate in what we do."
          />
        </div>
      </Section>

      {/* DOWNLOAD SECTION - Simple one button */}
      <Section id="download" title="Download S3RLinux">
        <div style={{ 
          background: colors.cardBg, 
          border: `1px solid ${colors.border}`, 
          borderRadius: 16, 
          padding: '2rem',
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ color: colors.textMuted, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Get the latest S3RLinux Atomic image. Built on bootc with KDE Plasma.
          </p>
          
          <motion.a
            href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/pkgs/container/s3rlinux-atomic"
            target="_blank"
            whileHover={{ scale: 1.02 }}
            style={{
              display: 'block',
              background: colors.purple,
              color: '#fff',
              padding: '1rem 2rem',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              textDecoration: 'none',
              marginBottom: '1.5rem'
            }}
          >
            Download Container Image
          </motion.a>
          
          <p style={{ color: colors.textMuted, fontSize: '0.85rem', marginBottom: '1rem' }}>
            Or use bootc to switch:
          </p>
          <CodeBlock>
            sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest
            sudo reboot
          </CodeBlock>
        </div>
      </Section>

      {/* COMPARE SECTION */}
      <Section id="compare" title="S3RLinux vs other distros">
        <CompareTable />
      </Section>

      {/* COMMUNITY SECTION - No Discord */}
      <Section id="community" title="Join the conversation">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: 700, margin: '0 auto' }}>
          <CommunityCard 
            icon="🐛"
            title="GitHub"
            description="Report bugs, request features, and contribute code. We welcome pull requests!"
            buttonText="Open Issue"
            buttonColor={colors.purple}
          />
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ 
        padding: '4rem 2rem 2rem', 
        borderTop: `1px solid ${colors.border}`,
        background: colors.gray
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🌈</span>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>S3RLinux</span>
            </div>
            <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: 1.6 }}>
              The ultimate Happy Hardcore Linux experience. Built on bootc. Powered by S3RL.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>Documentation</a>
              <a href="#download" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>Download</a>
              <a href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>GitHub</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Project</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>License</a>
              <a href="#" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>Blog</a>
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: 1200, margin: '3rem auto 0', paddingTop: '2rem', borderTop: `1px solid ${colors.border}`, textAlign: 'center' }}>
          <p style={{ color: colors.textMuted, fontSize: '0.85rem' }}>
            © 2026 S3RLinux. Built with 💜 by moonlightOS-Meow. 
            <span style={{ marginLeft: '1rem' }}>RAVE ALL NIGHT 💀</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

// SECTIONS
function Section({ children, id, title }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      style={{ padding: '6rem 2rem', background: colors.darker }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
          fontWeight: 700, 
          marginBottom: '3rem', 
          textAlign: 'center',
          color: colors.text
        }}>
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  )
}

// BUTTONS
function PrimaryButton({ children }) {
  return (
    <motion.a
      href="#download"
      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${colors.purple}` }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.8rem 1.75rem',
        borderRadius: 10,
        fontWeight: 600,
        fontSize: '1rem',
        textDecoration: 'none',
        background: colors.purple,
        color: '#fff',
        boxShadow: `0 0 20px ${colors.purpleGlow}`
      }}
    >
      {children}
    </motion.a>
  )
}

function SecondaryButton({ children }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05, borderColor: colors.pink }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.8rem 1.75rem',
        borderRadius: 10,
        fontWeight: 500,
        fontSize: '1rem',
        textDecoration: 'none',
        background: 'transparent',
        color: colors.text,
        border: `1px solid ${colors.border}`
      }}
    >
      {children}
    </motion.a>
  )
}

// FEATURE CARDS
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: colors.purple }}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '1.75rem',
        transition: 'border-color 0.2s'
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.75rem', color: colors.text }}>{title}</h3>
      <p style={{ color: colors.textMuted, lineHeight: 1.65, fontSize: '0.95rem' }}>{description}</p>
    </motion.div>
  )
}

// CODE BLOCK
function CodeBlock({ children }) {
  return (
    <pre style={{ 
      background: colors.darker, 
      border: `1px solid ${colors.border}`, 
      borderRadius: 10, 
      padding: '1rem 1.25rem', 
      textAlign: 'left', 
      overflowX: 'auto',
      fontSize: '0.9rem'
    }}>
      <code style={{ color: colors.pink, fontFamily: "'Fira Code', monospace" }}>{children}</code>
    </pre>
  )
}

// COMPARE TABLE
function CompareTable() {
  const features = [
    { name: 'Automatic Updates', s3rl: true, fedora: false, arch: false, ubuntu: 'some' },
    { name: 'Immutable System', s3rl: true, fedora: false, arch: false, ubuntu: false },
    { name: 'KDE Plasma', s3rl: true, fedora: 'opt', arch: true, ubuntu: 'opt' },
    { name: 'Homebrew Ready', s3rl: true, fedora: false, arch: true, ubuntu: true },
    { name: 'Game Ready', s3rl: true, fedora: 'opt', arch: true, ubuntu: 'opt' },
    { name: 'S3RL Themed', s3rl: true, fedora: false, arch: false, ubuntu: false },
  ]
  
  const Check = () => <span style={{ color: colors.green }}>✓</span>
  const Cross = () => <span style={{ color: '#f85149' }}>✗</span>
  const Some = () => <span style={{ color: colors.textMuted }}>~</span>
  
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
            <th style={{ padding: '1rem', textAlign: 'left', color: colors.textMuted, fontWeight: 500, fontSize: '0.85rem' }}>FEATURE</th>
            <th style={{ padding: '1rem', textAlign: 'center', color: colors.pink, fontWeight: 600, fontSize: '0.9rem' }}>S3RLINUX</th>
            <th style={{ padding: '1rem', textAlign: 'center', color: colors.textMuted, fontWeight: 500, fontSize: '0.9rem' }}>FEDORA</th>
            <th style={{ padding: '1rem', textAlign: 'center', color: colors.textMuted, fontWeight: 500, fontSize: '0.9rem' }}>ARCH</th>
            <th style={{ padding: '1rem', textAlign: 'center', color: colors.textMuted, fontWeight: 500, fontSize: '0.9rem' }}>UBUNTU</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
              <td style={{ padding: '1rem', color: colors.text, fontSize: '0.95rem' }}>{f.name}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{f.s3rl ? <Check /> : <Cross />}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{f.fedora === true ? <Check /> : f.fedora === 'opt' ? <Some /> : <Cross />}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{f.arch === true ? <Check /> : f.arch === 'opt' ? <Some /> : <Cross />}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{f.ubuntu === true ? <Check /> : f.ubuntu === 'opt' ? <Some /> : <Cross />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// COMMUNITY CARD
function CommunityCard({ icon, title, description, buttonText, buttonColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>{title}</h3>
      <p style={{ color: colors.textMuted, lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{description}</p>
      <motion.a
        href="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues"
        target="_blank"
        whileHover={{ scale: 1.05 }}
        style={{
          display: 'inline-block',
          padding: '0.6rem 1.5rem',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none',
          background: buttonColor,
          color: '#fff'
        }}
      >
        {buttonText}
      </motion.a>
    </motion.div>
  )
}

export default App