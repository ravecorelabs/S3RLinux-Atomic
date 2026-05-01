import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Wiki from './Wiki.jsx'
import Characters from './Characters.jsx'
import { Route, Link, useLocation, Router } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

// Device detection hook
function useDeviceType() {
  const [deviceType, setDeviceType] = useState('desktop')
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < 768 || height < 500
      const isTablet = width >= 768 && width < 1024
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      if (isMobile) setDeviceType('mobile')
      else if (isTablet) setDeviceType('tablet')
      else if (isTouch) setDeviceType('touch')
      else setDeviceType('desktop')
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])
  
  return deviceType
}

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
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'
  const isTablet = deviceType === 'tablet'
  const isTouch = deviceType === 'touch'
  
  return (
    <Router hook={useHashLocation}>
      <Route path="/">
        {() => <HomePage deviceType={deviceType} isMobile={isMobile} isTablet={isTablet} isTouch={isTouch} />}
      </Route>
      <Route path="/wiki">
        {() => <WikiPage />}
      </Route>
      <Route path="/wiki/:article">
        {() => <WikiPage />}
      </Route>
      <Route path="/characters">
        {() => <CharactersPage />}
      </Route>
    </Router>
  )
}

function WikiPage() {
  return <Wiki />
}

function CharactersPage() {
  return <Characters />
}

function HomePage({ deviceType, isMobile, isTablet, isTouch }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = ['Features', 'Blog', 'Download', 'Install', 'Compare', 'Wiki', 'Characters', 'FAQ']

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.darker,
      color: colors.text,
      fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* DECORATIVE CORNERS - No more white lines */}
      <CornerDecorations />

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
            {/* Mobile Menu Button */}
            {(isMobile || isTablet) && (
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: colors.text,
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </motion.button>
            )}
            
            {/* Desktop Nav Links */}
            {navLinks.map(link => {
              const isWiki = link === 'Wiki'
              const isChars = link === 'Characters'
              const href = isWiki ? '#/wiki' : isChars ? '#/characters' : null
              return (
                <div key={link}>
                  {isWiki || isChars ? (
                    <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <motion.span
                        whileHover={{ color: colors.pink }}
                        style={{ color: scrolled ? colors.text : colors.textMuted, textDecoration: 'none', fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
                      >
                        {link}
                      </motion.span>
                    </a>
                  ) : (
                    <motion.div
                      whileHover={{ color: colors.pink }}
                      onClick={() => scrollToSection(link.toLowerCase())}
                      style={{ color: scrolled ? colors.text : colors.textMuted, cursor: 'pointer', fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
                    >
                      {link}
                    </motion.div>
                  )}
                </div>
              )
            })}
            <motion.a
              href="https://github.com/RaveCore-Labs/S3RLinux-Atomic"
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
      
      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          style={{
            position: 'fixed',
            top: 70,
            right: 0,
            bottom: 0,
            width: isMobile ? '80%' : '60%',
            background: colors.gray,
            borderLeft: `1px solid ${colors.border}`,
            padding: '2rem',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {navLinks.map(link => {
            const isWiki = link === 'Wiki'
            const isChars = link === 'Characters'
            return (
              <motion.div
                key={link}
                whileTap={{ scale: 0.95 }}
              >
                {isWiki ? (
                  <a href="#/wiki" onClick={() => setMobileMenuOpen(false)}>
                    <div style={{
                      color: colors.text,
                      fontSize: isMobile ? '1.2rem' : '1.5rem',
                      fontWeight: 500,
                      padding: '0.75rem 0',
                      borderBottom: `1px solid ${colors.border}`,
                      cursor: 'pointer'
                    }}>
                      {link}
                    </div>
                  </a>
                ) : isChars ? (
                  <a href="#/characters" onClick={() => setMobileMenuOpen(false)}>
                    <div style={{
                      color: colors.text,
                      fontSize: isMobile ? '1.2rem' : '1.5rem',
                      fontWeight: 500,
                      padding: '0.75rem 0',
                      borderBottom: `1px solid ${colors.border}`,
                      cursor: 'pointer'
                    }}>
                      {link}
                    </div>
                  </a>
                ) : (
                  <div
                    onClick={() => { scrollToSection(link.toLowerCase()); setMobileMenuOpen(false) }}
                    style={{
                      color: colors.text,
                      fontSize: isMobile ? '1.2rem' : '1.5rem',
                      fontWeight: 500,
                      padding: '0.75rem 0',
                      borderBottom: `1px solid ${colors.border}`,
                      cursor: 'pointer'
                    }}
                  >
                    {link}
                  </div>
                )}
              </motion.div>
            )
          })}
          <motion.a
            href="https://github.com/RaveCore-Labs/S3RLinux-Atomic"
            target="_blank"
            style={{
              background: colors.purple,
              color: '#fff',
              padding: '1rem',
              borderRadius: 8,
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 600,
              marginTop: '1rem'
            }}
          >
            ⭐ Star on GitHub
          </motion.a>
        </motion.div>
      )}

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
                fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
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
              <SecondaryButton href="#/wiki">Documentation</SecondaryButton>
              <SpotifyButton />
            </motion.div>
            
            {/* FUN TAGLINE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                marginTop: '2rem',
                color: colors.textMuted,
                fontSize: '0.95rem'
              }}
            >
              💀 "lol no tech support included" 💀
            </motion.div>
          </div>
        </motion.div>

        {/* BADGES - Fixed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '3rem'
          }}
        >
          <img src="https://github.com/RaveCore-Labs/S3RLinux-Atomic/actions/workflows/build.yml/badge.svg" alt="Build" style={{ height: 24 }} />
          <img src="https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/s3rlinux-atomic" alt="ArtifactHub" style={{ height: 24 }} />
          <img src="https://img.shields.io/docker/pull/ghcr.io/ravecore-labs/s3rlinux-atomic?label=pulls" alt="Pulls" style={{ height: 24 }} />
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

      {/* BLOG SECTION */}
      <Section id="blog" title="Latest from the Blog">
        <BlogSection />
      </Section>

      {/* KDE SECTION */}
      <Section id="kde" title="Built with KDE Plasma">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <FeatureCard 
            icon="🎨"
            title="Fully Themed"
            description="Complete S3RL theming - Plasma Login Manager (PLM) login screen, Plymouth boot splash, KDE color scheme, icons, and more."
          />
          <FeatureCard 
            icon="🔧"
            title="Highly Customizable"
            description="KDE Plasma is the most customizable desktop environment. Tweak every detail to match your workflow."
          />
          <FeatureCard 
            icon="📱"
            title="Wayland Support"
            description="Modern Wayland display server with excellent fractional scaling and tablet support."
          />
        </div>
      </Section>

      {/* DOWNLOAD SECTION */}
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
          <div style={{
            background: 'rgba(0,200,100,0.08)',
            border: '1px solid rgba(0,200,100,0.3)',
            borderRadius: 10,
            padding: '12px 20px',
            marginBottom: '1.5rem',
            color: '#4caf50',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            ✅ STABLE ENOUGH TO DAILY DRIVE — Only cosmetic bugs remain. Go ahead and rave. 🌈
          </div>

          <p style={{ color: colors.textMuted, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            Get the latest S3RLinux Atomic image. Built on bootc with KDE Plasma.
          </p>
          <p style={{ color: colors.textMuted, marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            💀 Don't be shy — just try it. It won't bite. Probably. We need downloads. Please. The dev is literally at a school grill right now counting on you.
          </p>
          <p style={{ color: colors.textMuted, marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            🌈 Every download makes the dev 0.01% happier. You want them to be happy right? RIGHT?
          </p>
          <p style={{ color: colors.textMuted, marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            ⭐ Star the repo. Fork it. Tell your friends. Tell your enemies. Tell your cat. TELL EVERYONE.
          </p>

          <div style={{
            background: 'rgba(255,0,0,0.06)',
            border: '1px solid rgba(255,0,0,0.25)',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: '1.5rem',
            textAlign: 'left',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            color: '#ff8080'
          }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: '#ff4444', letterSpacing: 1 }}>⚕️ PUCK CITY HOSPITAL — INCIDENT REPORT #2026-04-30</div>
            <div><strong>Patient:</strong> Ash (XALATATH), age 14, Dark Wizard King</div>
            <div><strong>Incident:</strong> Forcibly fed hot sausage by school teacher during outdoor grill event</div>
            <div><strong>Symptoms:</strong> Mild trauma, satisfaction, slight guilt about enjoying it</div>
            <div><strong>Treatment:</strong> Patient was instructed to download S3RLinux Atomic to cope</div>
            <div><strong>Doctor's note:</strong> "We have reviewed the case. The sausage was good. We recommend 1x S3RLinux install daily."</div>
            <div><strong>Status:</strong> <span style={{ color: '#4caf50' }}>DISCHARGED — condition: raving</span></div>
          </div>
          
          <motion.a
            href="https://github.com/RaveCore-Labs/S3RLinux-Atomic/pkgs/container/s3rlinux-atomic"
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
sudo bootc switch ghcr.io/ravecore-labs/s3rlinux-atomic:latest
sudo reboot
          </CodeBlock>
        </div>
      </Section>

      {/* INSTALL SECTION */}
      <Section id="install" title="Installation">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <InstallCard 
            title="From Fedora"
            steps={[
              "Enable RPMFusion (optional for gaming): sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm",
              "Install bootc: sudo dnf install bootc",
              "Reboot into bootc: sudo bootc install to-disk --replace",
              "Or run: sudo bootc switch ghcr.io/ravecore-labs/s3rlinux-atomic:latest && sudo reboot"
            ]}
          />
          <InstallCard 
            title="From Windows"
            steps={[
              "Install WSL2: wsl --install",
              "Install bootc: wsl -d fedora -- yum install bootc",
              "Switch: bootc switch ghcr.io/ravecore-labs/s3rlinux-atomic:latest",
              "Reboot and select S3RLinux in BIOS/UEFI"
            ]}
          />
          <InstallCard 
            title="Fresh Install"
            steps={[
              "Download ISO from GitHub Actions",
              "Write to USB: sudo dd if=output.iso of=/dev/sdX bs=4M status=progress",
              "Boot from USB",
              "Follow the installer prompts"
            ]}
          />
        </div>
      </Section>

      {/* COMPARE SECTION */}
      <Section id="compare" title="S3RLinux vs other distros">
        <CompareTable />
      </Section>

      {/* FAQ SECTION - MORE FUNNY */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <FAQCard 
            question="Is S3RLinux based on Fedora?"
            answer="Yes! S3RLinux Atomic is built on top of Aurora, which is a KDE Plasma flavor of Fedora. It uses bootc/OSTree for immutable atomic updates. Not Arch. Never Arch. We made a promise. We kept the promise."
          />
          <FAQCard 
            question="Can I use S3RLinux as my daily driver?"
            answer="Absolutely. It includes all the essentials - web browser, code editor, terminal, media players, and gaming support. Perfect for daily use. Your waifu will be jealous."
          />
          <FAQCard 
            question="How do I update S3RLinux?"
            answer="Updates happen automatically in the background! Just use your computer and let it do its thing. You can also run: sudo bootc upgrade. Reboot to apply. Easy peasy lemon squeezy."
          />
          <FAQCard 
            question="Can I roll back if something breaks?"
            answer="Yes! bootc maintains previous versions. Boot into the previous deployment from the boot menu to roll back. Like hitting Ctrl+Z but for your entire OS. We've all been there."
          />
          <FAQCard 
            question="Does it include RPMFusion?"
            answer="RPMFusion is not pre-installed (to keep base clean), but you can easily enable it with: sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm. Gaming awaits. Your FPS will thank you."
          />
          <FAQCard 
            question="Is this free?"
            answer="Yes! S3RLinux is free and open source under the SAL license. However, per the license, you MUST listen to S3RL while using it. This is not optional. We will find out. We always find out. 👀"
          />
          <FAQCard 
            question="Why is it purple and pink?"
            answer="Because S3RL. That's it. That's the entire reason. Purple represents the darkness of the club at 3AM. Pink represents the UV lights. Together they create perfect Happy Hardcore energy. Science."
          />
          <FAQCard 
            question="What if my GPU isn't supported?"
            answer="Honestly? Try AMD. Seriously, just use AMD. NVIDIA users will have a fun time with drivers. But hey, at least the boot splash looks cool while you're troubleshooting. We've heard the stories. We believe you."
          />
          <FAQCard 
            question="Can I contribute?"
            answer="Yes! Pull requests welcome. Just don't remove the S3RL references. We will find you. Also, maybe read the AGENTS.md first. Or don't. Live dangerously. We don't care anymore. Just don't break it. Actually, break it. That's how we learn."
          />
          <FAQCard 
            question="What does 'Atomic' mean?"
            answer="It means the OS is immutable - you can't mess it up (easily). Updates are applied atomically, like quantum entanglement but for packages. If something breaks, roll back. Simple. Clean. No garbage everywhere. Your /home is sacred. / is disposable. The future is here."
          />
          <FAQCard 
            question="Why no tech support?"
            answer="Because lol. We're just some random person who likes Happy Hardcore and making OSes. If you need help, maybe try the issue tracker? Or a fortune teller? Or maybe just... read the error message? revolutionary concept we know"
          />
          <FAQCard 
            question="What's the deal with this license?"
            answer="The SAL (S3RLinux Atomic License) is a joke license that says you must listen to S3RL while using this OS. We can't actually enforce it. But seriously, you should listen to S3RL. Your ears will thank you. Your soul will ascend. OOH-OOH OOH-OOH"
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
              The ultimate Happy Hardcore Linux experience. Built on bootc. Powered by S3RL. <br/><br/>
              🔊 <a href="https://open.spotify.com/artist/11aa081aKYUzmeFm0yHdT2" target="_blank" style={{ color: colors.pink }}>Listen to S3RL</a> while using this OS - per license requirements. We mean it.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); const el = document.getElementById('download'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }} style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>Download</a>
              <a href="#" onClick={(e) => { e.preventDefault(); const el = document.getElementById('install'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }} style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>Installation</a>
              <a href="https://github.com/RaveCore-Labs/S3RLinux-Atomic" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>GitHub</a>
              <a href="https://artifacthub.io/packages/helm/s3rlinux-atomic/s3rlinux-atomic" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>ArtifactHub</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Project</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="https://github.com/RaveCore-Labs/S3RLinux-Atomic/blob/main/LICENSE" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>License</a>
              <a href="https://github.com/RaveCore-Labs/S3RLinux-Atomic/blob/main/CONTRIBUTING.md" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>Contribute</a>
              <a href="https://github.com/RaveCore-Labs/S3RLinux-Atomic/issues" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem' }}>Issues</a>
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: 1200, margin: '3rem auto 0', paddingTop: '2rem', borderTop: `1px solid ${colors.border}`, textAlign: 'center' }}>
          <p style={{ color: colors.textMuted, fontSize: '0.85rem' }}>
            © 2026 S3RLinux. Built with 💜 by RaveCore-Labs. 
            <span style={{ marginLeft: '1rem' }}>RAVE ALL NIGHT 💀</span>
          </p>
          <p style={{ color: colors.textMuted, fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.7 }}>
            lol no tech support included. You're on your own. Good luck. 🍀
          </p>
        </div>
      </footer>
    </div>
  )
}

// CORNER DECORATIONS - Gone! No more white lines
function CornerDecorations() {
  return null
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
      href="#"
      onClick={(e) => { e.preventDefault(); const el = document.getElementById('download'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
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

function SecondaryButton({ children, href = "#" }) {
  const isInternal = href.startsWith('/')
  
  if (isInternal) {
    return (
      <motion.div
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
        <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>{children}</Link>
      </motion.div>
    )
  }
  
  return (
    <motion.a
      href={href}
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

function SpotifyButton() {
  return (
    <motion.a
      href="https://open.spotify.com/artist/11aa081aKYUzmeFm0yHdT2"
      target="_blank"
      whileHover={{ scale: 1.05, background: '#1DB954' }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.8rem 1.75rem',
        borderRadius: 10,
        fontWeight: 600,
        fontSize: '1rem',
        textDecoration: 'none',
        background: '#1DB954',
        color: '#fff'
      }}
    >
      🎵 S3RL
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

// INSTALL CARD
function InstallCard({ title, steps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '1.75rem'
      }}
    >
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: colors.pink }}>{title}</h3>
      <ol style={{ paddingLeft: '1.25rem', color: colors.textMuted, lineHeight: 1.8 }}>
        {steps.map((step, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
        ))}
      </ol>
    </motion.div>
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

// BLOG SECTION - Interactive with animated modals
function BlogSection() {
  const [activePost, setActivePost] = useState(null)
  
  const posts = [
    { 
      id: 'ravecore-rebrand',
      title: "We Became an Org (Kinda) - Introducing RaveCore Labs", 
      date: "2026-04-30",
      author: "RaveCore-Labs",
      avatar: "💀",
      readTime: "3 min read",
      excerpt: "moonlightOS-Meow is dead. Long live RaveCore Labs! We rebranded from a personal account to an org-like presence because looking professional is easy when you're the only one here.",
      tags: ["Branding", "RaveCore", "Announcement"],
      content: `Big changes today! We've officially rebranded from moonlightOS-Meow to RaveCore Labs.

The Rebrand
Remember when we were just one person with a weird GitHub username? Yeah, that. Now we're an "org." Technically it's still one person. But now we look like a team. And that's what matters.

Why RaveCore Labs?
- "Rave" - because S3RL
- "Core" - because we build atomic images
- "Labs" - because we sound like mad scientists

What Changes?
Honestly? Almost nothing. The website moved. The container images moved. But your installed S3RLinux keeps working fine. Updates will come from the new registry. We'll handle the redirect magic.

What Stays the Same?
- Same chaos
- Same S3RL requirement
- Same no tech support policy
- Same purple/pink aesthetic
- Same one-person operation (with lots of bots)

The Future
We're building this like a real project now. Better docs, better branding, better vibes. The "org" name gives us room to grow — if anyone ever wants to join the rave.

For now, it's just me, the bots, and S3RL at 3AM. And honestly? That's enough.

RAVE ALL NIGHT 💀`,
    },
    { 
      id: 'aurora-f44-update',
      title: "Aurora F44 Spring 2026 Update - SDDM Replaced by Plasma Login Manager", 
      date: "2026-04-30",
      author: "RaveCore-Labs",
      avatar: "🚀",
      readTime: "6 min read",
      excerpt: "Aurora Spring26 brings Fedora 44, Plasma Login Manager replaces SDDM, Konsole as default terminal, and more major changes.",
      tags: ["Aurora", "Fedora 44", "Plasma"],
      content: `The Aurora Spring 2026 Update has arrived, and the latest stream is now based on Fedora 44! Here's everything you need to know for S3RLinux.

SDDM Replaced with Plasma Login Manager
The biggest visible change: SDDM is gone. Fedora 44 images now use the native Plasma Login Manager (PLM), introduced with Plasma 6.6. Visually, it looks nearly identical to SDDM — but under the hood it's KDE's own login manager.

For S3RLinux, this means we'll need to update our custom login theme. The SDDM theme files (Main.qml) won't work with PLM. We're working on a PLM-compatible theme with the same purple/pink S3RL aesthetic.

Konsole Becomes the Default Terminal
Ptyxis has been replaced by Konsole as the default terminal. Konsole now has distrobox/container integration, making the switch a no-brainer.

AppImages and the FUSE2 Removal
Fedora 44 removed FUSE2 from Atomic Desktops. This means many older AppImage formats won't work. DaVinci Resolve and other AppImage-based apps need the --appimage-extract workaround or FUSE2 layered back via rpm-ostree.

Starship Removed
Starship has been removed from the image. Install it easily via Homebrew: brew install starship

Distroshelf Switched to Kontainer
The new Distroshelf alternative is Kontainer, a KDE-native container management tool available on Flathub.

What About S3RLinux?
Our S3RLinux Atomic image is based on Aurora, so these changes will flow through to us. The main items we need to address:
- PLM theme to replace SDDM theme
- Update documentation for Konsole
- Ensure AppImage workarounds are documented
- Update post-install guides

Read the full Aurora announcement: https://docs.getaurora.dev/blog/aurora-spring26-update/`,
      link: { text: "Read full Aurora blog post", url: "https://docs.getaurora.dev/blog/aurora-spring26-update/" }
    },
    { 
      id: 'first-release',
      title: "S3RLinux Atomic - First Release", 
      date: "2026-04-29",
      author: "RaveCore-Labs",
      avatar: "🌈",
      readTime: "5 min read",
      excerpt: "Introducing S3RLinux Atomic - the ultimate Happy Hardcore Linux experience. Built on bootc with KDE Plasma and fully themed with S3RL purple/pink magic.",
      tags: ["Release", "bootc", "KDE"],
      content: `Today we're releasing the first version of S3RLinux Atomic - a custom bootc image built on top of Aurora (KDE Plasma). 

The idea came from a simple question: what if Fedora decided to go to a rave? Purple and pink everywhere, S3RL pumping through your speakers, and an immutable system that just works.

S3RLinux features:
- Full S3RL theming (SDDM login, Plymouth boot splash, KDE color scheme)
- bootc/OSTree atomic updates with easy rollbacks
- Pre-configured KDE Plasma with custom color scheme
- Homebrew, Flatpak, and DNF package management
- Gaming ready with Steam, Lutris, and Wine support

The build process uses GitHub Actions to create both container images and disk images (ISO/VM). Everything is open source and community maintained.

This is just the beginning. We're planning more themes, better documentation, and a full wiki like Arch Wiki but purple. RAVE ALL NIGHT 💀`
    },
    { 
      id: 'why-bootc',
      title: "Why bootc?", 
      date: "2026-04-29",
      author: "RaveCore-Labs",
      avatar: "⚡",
      readTime: "7 min read",
      excerpt: "bootc provides atomic updates, easy rollbacks, and unified container/host management. Learn why we chose bootc for S3RLinux.",
      tags: ["bootc", "Immutable", "Technical"],
      content: `bootc is a container-native approach to Linux system management. Instead of traditional package managers touching your root filesystem, your entire OS is defined as a container image.

Why we chose bootc over rpm-ostree:
1. Container-native - Define your OS as a Dockerfile
2. Easy to reproduce - Same image, same result everywhere
3. Simple updates - bootc upgrade pulls the latest container image
4. Rollback support - bootc rollback gets you back to the previous working state
5. No more "what package broke my system?" - entire system updates atomically

The beauty of bootc is that it treats your OS like any other container. You can build it locally, test it, push it to a registry, and deploy it. The same workflow you use for applications now works for your entire operating system.

For S3RLinux, this means we can:
- Update the entire OS with one command
- Roll back if something breaks (it happens)
- Build custom images with all our theming pre-applied
- Switch between different OS images easily

The future of Linux desktop is immutable, and bootc is leading the charge.`
    },
    { 
      id: 's3rl-theme',
      title: "The S3RL Theme", 
      date: "2026-04-29",
      author: "RaveCore-Labs",
      avatar: "🎵",
      readTime: "4 min read",
      excerpt: "Custom SDDM login, Plymouth boot splash, KDE color scheme - everything themed around S3RL.",
      tags: ["Theme", "KDE", "Design"],
      content: `S3RLinux isn't just another Linux distro - it's a visual experience themed around S3RL, the legendary Happy Hardcore DJ from Brisbane.

What we themed:
1. Plymouth Boot Splash - Custom boot animation with S3RL logo
2. SDDM Login Screen - Custom theme with purple/pink gradients
3. KDE Color Scheme - Full purple theme with pink accents
4. Desktop Wallpaper - Aurora-inspired but with S3RL branding

The color palette:
- Primary: #9c27b0 (Purple)
- Accent: #ff0080 (Pink)
- Background: #050308 (Almost black)
- Text: #e8e6ee (Light purple-white)

Every element was carefully chosen to create that club atmosphere. Purple represents the darkness at 3AM. Pink represents the UV lights. Together they create the perfect Happy Hardcore energy.

The SDDM theme features a custom Main.qml with gradient backgrounds, glowing text effects, and the S3RL logo. The Plymouth theme uses a custom script with animation frames that play during boot.

We also created a custom logo that combines the S3RL aesthetic with Linux vibes. Everything ties together into one cohesive theme.`
    },
  ]
  
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, borderColor: colors.pink }}
            onClick={() => setActivePost(post)}
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: 14,
              padding: '1.75rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  background: 'rgba(156, 39, 176, 0.2)',
                  color: colors.pink,
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 20,
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>{tag}</span>
              ))}
            </div>
            <p style={{ color: colors.textMuted, fontSize: '0.8rem', marginBottom: '0.5rem' }}>{post.date} · {post.readTime}</p>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.75rem', color: colors.text }}>{post.title}</h3>
            <p style={{ color: colors.textMuted, lineHeight: 1.6, fontSize: '0.95rem' }}>{post.excerpt}</p>
            <p style={{ color: colors.pink, fontSize: '0.85rem', marginTop: '1rem', fontWeight: 500 }}>Read more →</p>
          </motion.div>
        ))}
      </div>
      
      {/* Blog Modal */}
      {activePost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActivePost(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 3, 8, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.gray,
              border: `1px solid ${colors.border}`,
              borderRadius: 20,
              maxWidth: 700,
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '2.5rem',
              position: 'relative'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setActivePost(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: colors.text,
                width: 36,
                height: 36,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >✕</motion.button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{activePost.avatar}</span>
              <div>
                <p style={{ color: colors.text, fontWeight: 600 }}>{activePost.author}</p>
                <p style={{ color: colors.textMuted, fontSize: '0.85rem' }}>{activePost.date} · {activePost.readTime}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {activePost.tags.map(tag => (
                <span key={tag} style={{
                  background: 'rgba(156, 39, 176, 0.2)',
                  color: colors.pink,
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 20,
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>{tag}</span>
              ))}
            </div>
            
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: colors.text, marginBottom: '1.5rem', lineHeight: 1.3 }}>{activePost.title}</h2>
            
            <div style={{ color: colors.textMuted, lineHeight: 1.9, fontSize: '1rem' }}>
              {activePost.content.split('\n\n').map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '1.25rem' }}>{paragraph}</p>
              ))}
            </div>
            
            {activePost.link && (
              <a href={activePost.link.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                color: colors.pink,
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                {activePost.link.text} →
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

// DOC CARD - Clickable with content
function DocCard({ icon, title, description, content, href = "#" }) {
  const [open, setOpen] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onClick={() => setOpen(!open)}
      whileHover={{ y: -4, borderColor: colors.purple }}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '1.75rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s'
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: colors.text }}>{title}</h3>
        <span style={{ color: colors.pink, fontSize: '1.2rem' }}>{open ? '−' : '+'}</span>
      </div>
      <p style={{ color: colors.textMuted, lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '0.75rem' }}>{description}</p>
      
      {open && content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${colors.border}` }}
        >
          <pre style={{ 
            background: colors.darker, 
            borderRadius: 8, 
            padding: '1rem', 
            overflowX: 'auto',
            fontSize: '0.85rem',
            color: colors.pink,
            fontFamily: "'Fira Code', monospace"
          }}>
            {content}
          </pre>
        </motion.div>
      )}
      
      {!open && content && (
        <p style={{ color: colors.pink, fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Click to show commands ↓
        </p>
      )}
    </motion.div>
  )
}

// FAQ CARD - EVEN MORE FUNNY
function FAQCard({ question, answer }) {
  const [open, setOpen] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onClick={() => setOpen(!open)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '1.5rem',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: colors.text }}>{question}</h3>
        <span style={{ color: colors.pink, fontSize: '1.2rem' }}>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: colors.textMuted, marginTop: '1rem', lineHeight: 1.7 }}
        >
          {answer}
        </motion.p>
      )}
    </motion.div>
  )
}

export default App