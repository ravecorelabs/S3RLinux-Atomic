import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRoute, useLocation, Link } from 'wouter'

const colors = {
  purple: '#9c27b0',
  pink: '#ff0080',
  cyanGlow: 'rgba(156, 39, 176, 0.4)',
  pinkGlow: 'rgba(255, 0, 128, 0.4)',
  darker: '#050308',
  gray: '#151520',
  text: '#e8e6ee',
  textMuted: '#9e9aaa',
  border: '#2a2a3a',
  cardBg: '#0f0f18',
  green: '#238636',
  sidebarBg: '#0a0a10',
  accent: '#7b1fa2'
}

// Arch Wiki style sidebar + content layout
const wikiStyles = {
  container: {
    display: 'flex',
    gap: '2rem',
    maxWidth: 1400,
    margin: '0 auto',
    minHeight: '80vh',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  sidebar: {
    width: 280,
    flexShrink: 0,
    background: colors.sidebarBg,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '1.5rem',
    height: 'fit-content',
    position: 'sticky',
    top: '2rem'
  },
  sidebarTitle: {
    color: colors.purple,
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    paddingBottom: '0.75rem',
    borderBottom: `2px solid ${colors.purple}`
  },
  sidebarSection: {
    color: colors.textMuted,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.5rem',
    marginTop: '1.5rem'
  },
  navLink: {
    display: 'block',
    padding: '0.6rem 0.75rem',
    color: colors.textMuted,
    textDecoration: 'none',
    borderRadius: 6,
    fontSize: '0.95rem',
    transition: 'all 0.2s'
  },
  navLinkActive: {
    background: colors.purple,
    color: '#fff'
  },
  content: {
    flex: 1,
    minWidth: 0
  },
  article: {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '2rem',
    marginBottom: '1.5rem'
  },
  heading: {
    color: colors.pink,
    fontWeight: 600,
    fontSize: '1.8rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: `2px solid ${colors.purple}`
  },
  subheading: {
    color: colors.text,
    fontWeight: 600,
    fontSize: '1.3rem',
    marginTop: '1.5rem',
    marginBottom: '0.75rem'
  },
  paragraph: {
    color: colors.textMuted,
    lineHeight: 1.8,
    marginBottom: '1rem'
  },
  code: {
    background: colors.darker,
    padding: '0.25rem 0.5rem',
    borderRadius: 4,
    fontFamily: "'Fira Code', monospace",
    color: colors.pink,
    fontSize: '0.9rem'
  },
  codeBlock: {
    background: colors.darker,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: '1rem',
    overflowX: 'auto',
    fontFamily: "'Fira Code', monospace",
    color: colors.pink,
    fontSize: '0.85rem',
    marginBottom: '1rem'
  },
  note: {
    background: 'rgba(35, 134, 54, 0.15)',
    border: `1px solid ${colors.green}`,
    borderRadius: 8,
    padding: '1rem',
    marginBottom: '1rem',
    color: colors.text
  },
  warning: {
    background: 'rgba(255, 152, 0, 0.15)',
    border: '1px solid #ff9800',
    borderRadius: 8,
    padding: '1rem',
    marginBottom: '1rem',
    color: colors.text
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1rem'
  },
  th: {
    background: colors.darker,
    padding: '0.75rem',
    textAlign: 'left',
    border: `1px solid ${colors.border}`,
    color: colors.text,
    fontWeight: 600
  },
  td: {
    padding: '0.75rem',
    border: `1px solid ${colors.border}`,
    color: colors.textMuted
  },
  breadcrumb: {
    color: colors.textMuted,
    fontSize: '0.85rem',
    marginBottom: '1rem'
  }
}

function Wiki() {
  const [, setLocation] = useLocation()
  const [match, params] = useRoute('/wiki/:article')
  const [isMobile, setIsMobile] = useState(false)
  
  const selectedArticle = (match && params && params.article) || 'getting-started'
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedArticle])
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const articleCategories = [
    {
      category: 'Getting Started',
      articles: [
        { id: 'getting-started', title: 'Getting Started' },
        { id: 'installation', title: 'Installation' },
        { id: 'post-install', title: 'Post Installation' }
      ]
    },
    {
      category: 'System',
      articles: [
        { id: 'configuration', title: 'Configuration' },
        { id: 'package-management', title: 'Package Management' },
        { id: 'bootc', title: 'Bootc' }
      ]
    },
    {
      category: 'Hardware',
      articles: [
        { id: 'graphics', title: 'Graphics' },
        { id: 'audio', title: 'Audio' },
        { id: 'networking', title: 'Networking' }
      ]
    },
    {
      category: 'Applications',
      articles: [
        { id: 'gaming', title: 'Gaming' },
        { id: 'development', title: 'Development' },
        { id: 'multimedia', title: 'Multimedia' }
      ]
    },
    {
      category: 'Support',
      articles: [
        { id: 'troubleshooting', title: 'Troubleshooting' },
        { id: 'faq', title: 'FAQ' }
      ]
    }
  ]
  
  return (
    // Full page wrapper when standalone
    <div style={{ 
      minHeight: '100vh', 
      background: colors.darker,
      padding: '2rem',
      fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Wiki Header - Arch Wiki style */}
      <div style={{
        background: colors.gray,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '1.5rem 2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2rem' }}>📚</span>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: colors.text, marginBottom: '0.25rem' }}>
              S3RLinux Wiki
            </h2>
            <p style={{ color: colors.textMuted, fontSize: '0.95rem' }}>
              Like Arch Wiki, but purple. And with more raves. 🎵
            </p>
          </div>
        </div>
      </div>
      
      {/* Archive notice */}
      <div style={{
        background: 'rgba(255, 0, 128, 0.1)',
        border: '1px solid #ff0080',
        borderRadius: 8,
        padding: '1rem',
        marginBottom: '1.5rem',
        color: colors.textMuted,
        fontSize: '0.9rem'
      }}>
        ⚠️ <strong>Note:</strong> This wiki is for S3RLinux Atomic. Most guides also work for Fedora Atomic/nickelbase.
      </div>
      
      {/* Main Wiki Layout */}
      <div style={wikiStyles.container}>
        {/* Sidebar */}
        {!isMobile && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            style={wikiStyles.sidebar}
          >
            <div style={wikiStyles.sidebarTitle}>
              📖 Index
            </div>
            
            {articleCategories.map((cat, idx) => (
              <div key={idx}>
                <div style={wikiStyles.sidebarSection}>{cat.category}</div>
                {cat.articles.map(article => (
                  <Link
                    key={article.id}
                    href={`/wiki/${article.id}`}
                    style={{
                      ...wikiStyles.navLink,
                      ...(selectedArticle === article.id ? wikiStyles.navLinkActive : {})
                    }}
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            ))}
            
            <div style={{ ...wikiStyles.sidebarSection, marginTop: '2rem' }}>
              ⚡ Quick Commands
            </div>
            <code style={{ ...wikiStyles.code, display: 'block', fontSize: '0.8rem' }}>
              bootc upgrade
            </code>
            <code style={{ ...wikiStyles.code, display: 'block', fontSize: '0.8rem' }}>
              bootc rollback
            </code>
            <code style={{ ...wikiStyles.code, display: 'block', fontSize: '0.8rem' }}>
              bootc status
            </code>
          </motion.aside>
        )}
        
        {/* Mobile: dropdown instead */}
        {isMobile && (
          <select
            value={selectedArticle}
            onChange={(e) => setLocation(`/wiki/${e.target.value}`)}
            style={{
              width: '100%',
              padding: '1rem',
              background: colors.sidebarBg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              fontSize: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            {articleCategories.flatMap(cat => cat.articles).map(article => (
              <option key={article.id} value={article.id}>{article.title}</option>
            ))}
          </select>
        )}
        
        {/* Content Area */}
        <main style={wikiStyles.content}>
          {/* Breadcrumb */}
          <div style={wikiStyles.breadcrumb}>
            <Link href="/wiki" style={{ color: colors.purple, textDecoration: 'none' }}>Wiki</Link> / {selectedArticle.replace('-', ' ')}
          </div>
          
          {/* Articles */}
          {selectedArticle === 'getting-started' && <GettingStarted />}
          {selectedArticle === 'installation' && <InstallationGuide />}
          {selectedArticle === 'post-install' && <PostInstall />}
          {selectedArticle === 'configuration' && <Configuration />}
          {selectedArticle === 'package-management' && <PackageManagement />}
          {selectedArticle === 'bootc' && <Bootc />}
          {selectedArticle === 'graphics' && <Graphics />}
          {selectedArticle === 'audio' && <Audio />}
          {selectedArticle === 'networking' && <Networking />}
          {selectedArticle === 'gaming' && <Gaming />}
          {selectedArticle === 'development' && <Development />}
          {selectedArticle === 'multimedia' && <Multimedia />}
          {selectedArticle === 'troubleshooting' && <Troubleshooting />}
          {selectedArticle === 'faq' && <FAQ />}
        </main>
      </div>
      </div>
    </div>
  )
}

// Article functions below

function GettingStarted() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Getting Started with S3RLinux</h3>
      
      <p style={wikiStyles.paragraph}>
        Welcome to S3RLinux! This guide will help you get up and running in no time. 
        S3RLinux is based on Fedora/Aurora with bootc for atomic updates. Think of it as Fedora decided to go to a rave.
      </p>
      
      <div style={wikiStyles.warning}>
        <strong>🚀 Aurora F44 Update:</strong> SDDM has been replaced with Plasma Login Manager (PLM) on Fedora 44. AppImages require FUSE2 workarounds. See our <a href="#blog" style={{ color: colors.pink }}>blog post</a> for details.
      </div>
      
      <h4 style={wikiStyles.subheading}>Overview</h4>
      <p style={wikiStyles.paragraph}>
        S3RLinux Atomic is an immutable Linux distribution. This means:
      </p>
      <ul style={{ color: colors.textMuted, lineHeight: 2, marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>The root filesystem is read-only by default</li>
        <li>Updates are applied atomically (all or nothing)</li>
        <li>Easy rollbacks if something breaks</li>
        <li>/home is separate and preserved</li>
        <li>Uses bootc for management</li>
      </ul>
      
      <h4 style={wikiStyles.subheading}>First Boot</h4>
      <p style={wikiStyles.paragraph}>
        On first boot, you'll see:
      </p>
      <ul style={{ color: colors.textMuted, lineHeight: 2, marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>🌈 S3RL-themed Plymouth boot splash</li>
        <li>Plasma Login Manager (PLM) login screen with S3RL theme</li>
        <li>Auto-login as user <code style={wikiStyles.code}>s3rl</code></li>
        <li>KDE Plasma desktop ready to go</li>
      </ul>
      
      <h4 style={wikiStyles.subheading}>Default Credentials</h4>
      <p style={wikiStyles.paragraph}>
        Change the default password immediately:
      </p>
      <pre style={wikiStyles.codeBlock}>
sudo passwd s3rl
# Then enter new password
sudo passwd root  # Maybe change this too?
      </pre>
      
      <h4 style={wikiStyles.subheading}>Basic Commands</h4>
      <p style={wikiStyles.paragraph}>
        Here are the commands you'll use most:
      </p>
      <table style={wikiStyles.table}>
        <thead>
          <tr><th style={wikiStyles.th}>Command</th><th style={wikiStyles.th}>Description</th></tr>
        </thead>
        <tbody>
          <tr><td style={wikiStyles.code}>bootc upgrade</td><td style={wikiStyles.td}>Update system</td></tr>
          <tr><td style={wikiStyles.code}>bootc rollback</td><td style={wikiStyles.td}>Go back</td></tr>
          <tr><td style={wikiStyles.code}>bootc status</td><td style={wikiStyles.td}>Check state</td></tr>
          <tr><td style={wikiStyles.code}>bootc switch &lt;image&gt;</td><td style={wikiStyles.td}>Switch to different OS</td></tr>
        </tbody>
      </table>
      
      <div style={wikiStyles.note}>
        <strong>💡 Pro Tip:</strong> Updates happen automatically! You can just use your computer. 
        Run <code style={wikiStyles.code}>sudo bootc upgrade</code> force an update.
      </div>
    </div>
  )
}

function InstallationGuide() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Installation Guide</h3>
      
      <p style={wikiStyles.paragraph}>
        There are several ways to get S3RLinux. Choose one that fits your situation.
      </p>
      
      <h4 style={wikiStyles.subheading}>Method 1: Via bootc (Recommended for Fedora)</h4>
      <p style={wikiStyles.paragraph}>
        If you're already on Fedora (or Silverblue/Kinoite), you can switch:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Make sure bootc is installed
sudo dnf install bootc

# Switch to S3RLinux
sudo bootc switch ghcr.io/ravecore-labs/s3rlinux-atomic:latest

# Reboot
sudo reboot
      </pre>
      
      <h4 style={wikiStyles.subheading}>Method 2: Fresh Install (ISO)</h4>
      <p style={wikiStyles.paragraph}>
        Download the ISO from GitHub Actions and write to USB:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Find your USB device
lsblk

# Write ISO (replace sdX with your USB)
sudo dd if=s3rlinux.iso of=/dev/sdX bs=4M status=progress

# Boot from USB in BIOS/UEFI
# Run the installer
      </pre>
      
      <h4 style={wikiStyles.subheading}>Method 3: Windows WSL2</h4>
      <p style={wikiStyles.paragraph}>
        Not recommended for daily use, but works for testing:
      </p>
      <pre style={wikiStyles.codeBlock}>
wsl --install
wsl --list --online
wsl --install -n S3RLinux

# Or import the container
wsl --import S3RLinux .\ "path\to\rootfs.tar" --version 2
      </pre>
      
      <h4 style={wikiStyles.subheading}>Method 4: Container (Docker/Podman)</h4>
      <p style={wikiStyles.paragraph}>
        For testing or development:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Docker
docker run -it ghcr.io/ravecore-labs/s3rlinux-atomic:latest

# Or with persistent home
docker run -it -v ~/s3rl-home:/home ghcr.io/ravecore-labs/s3rlinux-atomic:latest
      </pre>
      
      <div style={wikiStyles.warning}>
        <strong>⚠️ Warning:</strong> The container image is for testing! 
        For daily use, install via bootc or ISO.
      </div>
    </div>
  )
}

function Configuration() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>System Configuration</h3>
      
      <h4 style={wikiStyles.subheading}>Hostname</h4>
      <pre style={wikiStyles.codeBlock}>
sudo hostnamectl set-hostname s3rl-pc
      </pre>
      
      <h4 style={wikiStyles.subheading}>Timezone</h4>
      <pre style={wikiStyles.codeBlock}>
# Set timezone
sudo timedatectl set-timezone America/New_York

# Check status
timedatectl status
      </pre>
      
      <h4 style={wikiStyles.subheading}>Services</h4>
      <p style={wikiStyles.paragraph}>
        Enable/disable services with systemctl:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Enable a service
sudo systemctl enable.service

# Start now
sudo systemctl start.service

# Check status
systemctl status.service
      </pre>
      
      <h4 style={wikiStyles.subheading}>Kernel Options</h4>
      <p style={wikiStyles.paragraph}>
        For dual boot, you might want this in /etc/default/grub:
      </p>
      <pre style={wikiStyles.codeBlock}>
GRUB_TIMEOUT=10
GRUB_DEFAULT=saved
      </pre>
      
      <h4 style={wikiStyles.subheading}>User Management</h4>
      <pre style={wikiStyles.codeBlock}>
# Add new user
sudo useradd -m -G wheel username

# Set password
sudo passwd username

# Add to groups
sudo usermod -aG docker username  # For Docker access
      </pre>
    </div>
  )
}

function PackageManagement() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Package Management</h3>
      
      <h4 style={wikiStyles.subheading}>DNF Basics</h4>
      <pre style={wikiStyles.codeBlock}>
# Update everything
sudo dnf update

# Install a package
sudo dnf install package-name

# Remove a package
sudo dnf remove package-name

# Search
dnf search package-name

# List installed
dnf list installed
      </pre>
      
      <h4 style={wikiStyles.subheading}>RPMFusion (For Gaming & Media)</h4>
      <p style={wikiStyles.paragraph}>
        RPMFusion provides additional packages not in Fedora repos:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Enable Free repo
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm

# Enable Non-Free repo (codecs, nvidia Drivers)
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
      </pre>
      
      <h4 style={wikiStyles.subheading}>Homebrew</h4>
      <p style={wikiStyles.paragraph}>
        S3RLinux comes with Homebrew pre-installed:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Install formula
brew install htop

# Update brew
brew update

# Upgrade packages
brew upgrade
      </pre>
      
      <h4 style={wikiStyles.subheading}>Flatpak</h4>
      <pre style={wikiStyles.codeBlock}>
# Add Flathub
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install
flatpak install flathub org.gimp.GIMP

# List
flatpak list
      </pre>
    </div>
  )
}

function Hardware() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Hardware Configuration</h3>
      
      <h4 style={wikiStyles.subheading}>NVIDIA Graphics</h4>
      <div style={wikiStyles.warning}>
        <strong>⚠️ Warning:</strong> NVIDIA drivers on Linux can be... an experience. 
        Consider AMD if you can. But here's how to try:
      </div>
      <pre style={wikiStyles.codeBlock}>
# Enable RPMFusion Non-Free first
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda

# Reboot
sudo reboot
      </pre>
      
      <h4 style={wikiStyles.subheading}>AMD Graphics</h4>
      <p style={wikiStyles.paragraph}>
        AMD "just works" most of the time:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Should work automatically!
# For Mesa updates:
sudo dnf update mesa
      </pre>
      
      <h4 style={wikiStyles.subheading}>Audio</h4>
      <p style={wikiStyles.paragraph}>
        For audio production, install JACK:
      </p>
      <pre style={wikiStyles.codeBlock}>
sudo dnf install jack2 qjackctl Ardour audacity

# USB Audio Interface
# Just plug it in. Should work.™
      </pre>
      
      <h4 style={wikiStyles.subheading}>Bluetooth</h4>
      <pre style={wikiStyles.codeBlock}>
# Enable Bluetooth
sudo systemctl enable bluetooth
sudo systemctl start bluetooth

# GUI
blueman-manager
      </pre>
      
      <h4 style={wikiStyles.subheading}>Printing</h4>
      <pre style={wikiStyles.codeBlock}>
# CUPS web interface
sudo systemctl enable cups
sudo systemctl start cups

# Open http://localhost:631 in browser
      </pre>
    </div>
  )
}

function Networking() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Networking</h3>
      
      <h4 style={wikiStyles.subheading}>WiFi (CLI)</h4>
      <pre style={wikiStyles.codeBlock}>
# List networks
nmcli device wifi list

# Connect
nmcli device wifi connect SSID password PASSWORD

# Or interactively
nmcli device wifi connect
      </pre>
      
      <h4 style={wikiStyles.subheading}>Ethernet</h4>
      <p style={wikiStyles.paragraph}>
        Usually just works. If not:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Check status
nmcli device status

# Connect
nmcli device connect eth0
      </pre>
      
      <h4 style={wikiStyles.subheading}>VPN</h4>
      <pre style={wikiStyles.codeBlock}>
# Import OpenVPN config
sudo nmcli connection import type openvpn file /path/to/config.ovpn

# Or use the GUI
# Settings → Network → VPN → +
      </pre>
      
      <h4 style={wikiStyles.subheading}>Firewall</h4>
      <pre style={wikiStyles.codeBlock}>
# Enable
sudo systemctl enable firewalld
sudo systemctl start firewalld

# Add service
sudo firewall-cmd --add-service=http

# Permanent
sudo firewall-cmd --permanent --add-service=http
      </pre>
      
      <h4 style={wikiStyles.subheading}>Host File</h4>
      <pre style={wikiStyles.codeBlock}>
# Edit hosts
sudo nano /etc/hosts
      </pre>
    </div>
  )
}

function Gaming() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Gaming on S3RLinux</h3>
      
      <h4 style={wikiStyles.subheading}>Steam</h4>
      <pre style={wikiStyles.codeBlock}>
# Install Steam
sudo dnf install steam

# Or from Flathub
flatpak install flathub com.valvesoftware.Steam
      </pre>
      
      <h4 style={wikiStyles.subheading}>Lutris</h4>
      <pre style={wikiStyles.codeBlock}>
# Enable Flathub first
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install Lutris
flatpak install flathub net.lutris.Lutris
      </pre>
      
      <h4 style={wikiStyles.subheading}>Wine</h4>
      <pre style={wikiStyles.codeBlock}>
sudo dnf install wine
      </pre>
      
      <h4 style={wikiStyles.subheading}>Game Mode</h4>
      <pre style={wikiStyles.codeBlock}>
sudo dnf install gamemode
      </pre>
      
      <h4 style={wikiStyles.subheading}>FSR (AMD FidelityFX Super Resolution)</h4>
      <p style={wikiStyles.paragraph}>
        Enable in AMD drivers: RDNA2+ GPUs → AMD Radeon Settings → Gaming → Global Graphics → "Enable AMD Radeon™ FidelityFX™ Super Resolution"
      </p>
      
      <h4 style={wikiStyles.subheading}>VRR (Variable Refresh Rate)</h4>
      <p style={wikiStyles.paragraph}>
        Enable in: System Settings → Display and Monitor → Refresh Rate → "Allow VRR"
      </p>
      
      <h4 style={wikiStyles.subheading}>🎬 DaVinci Resolve (IMPORTANT!)</h4>
      <div style={wikiStyles.warning}>
        <strong>⚠️ Fedora 44 Alert:</strong> DaVinci Resolve is an AppImage, but Fedora 44 removed FUSE2 from Atomic Desktops! You MUST use one of the methods below.
      </div>
      
      <h5 style={{ color: colors.pink, marginTop: '1rem' }}>Method 1: --appimage-extract (Recommended)</h5>
      <p style={wikiStyles.paragraph}>
        <strong>The AppImage method doesn't work! </strong> Follow these steps exactly:
      </p>
      <pre style={wikiStyles.codeBlock}>
# 1. Download DaVinci Resolve .run from Blackmagic Design
# 2. Make it executable
chmod +x DaVinci_Resolve*

# 3. EXTRACT the AppImage (don't run directly!)
./DaVinci_Resolve* --appimage-extract

# 4. Go into the extracted folder
cd squashfs-root/

# 5. Run Resolve directly
sudo ./bin/Resolve
      </pre>
      
      <h5 style={{ color: colors.pink, marginTop: '1rem' }}>Method 2: Layer FUSE2 back (rpm-ostree)</h5>
      <p style={wikiStyles.paragraph}>
        If extraction doesn't work, layer FUSE2 back:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Layer fuse packages back
sudo rpm-ostree install fuse fuse-libs

# Reboot to apply
sudo reboot
      </pre>
      
      <p style={wikiStyles.paragraph}>
        <strong>Note:</strong> You need to run with sudo for full features! Create a launcher:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Create a desktop file manually:
cat ~/Desktop/Resolve.desktop
# Paste this content:
[Desktop Entry]
Name=DaVinci Resolve
Exec=sudo /path/to/squashfs-root/bin/Resolve
Type=Application
# Save with Ctrl+D
      </pre>
    </div>
  )
}

function Troubleshooting() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Troubleshooting</h3>
      
      <h4 style={wikiStyles.subheading}>Boot Problems</h4>
      <p style={wikiStyles.paragraph}>
        <strong>Can't boot?</strong> Select previous deployment at boot menu.
      </p>
      <pre style={wikiStyles.codeBlock}>
# From within system, check bootc status
sudo bootc status

# List deployments
bootc upgrade --check
      </pre>
      
      <h4 style={wikiStyles.subheading}>Update Failed</h4>
      <pre style={wikiStyles.codeBlock}>
# Rollback
sudo bootc rollback
sudo reboot

# Then try again later or check logs
journalctl -u bootc
      </pre>
      
      <h4 style={wikiStyles.subheading}>No Sound</h4>
      <pre style={wikiStyles.codeBlock}>
# Check with Pulse Audio
pavucontrol

# Or PipeWire
pw-cli list objects | grep -i port
      </pre>
      
      <h4 style={wikiStyles.subheading}>WiFi Not Working</h4>
      <pre style={wikiStyles.codeBlock}>
# Restart NetworkManager
sudo systemctl restart NetworkManager

# Or check driver
nmcli device wifi list
      </pre>
      
      <h4 style={wikiStyles.subheading}>Black Screen After Login</h4>
      <p style={wikiStyles.paragraph}>
        Try: Ctrl+Alt+F2 to get tty, then:
      </p>
        <pre style={wikiStyles.codeBlock}>
# Reset Plasma
kquit --all plasmashell 2{'>'}/dev/null
killall plasmashell
# Or create new user and copy files
        </pre>
      
      <h4 style={wikiStyles.subheading}>Getting Help</h4>
      <p style={wikiStyles.paragraph}>
        - GitHub Issues: Report bugs<br/>
        - Check logs: <code style={wikiStyles.code}>journalctl -xe</code><br/>
        - Read errors: They're usually helpful! 😄
      </p>
    </div>
  )
}

function PostInstall() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Post Installation</h3>
      
      <h4 style={wikiStyles.subheading}>First Things First</h4>
      <p style={wikiStyles.paragraph}>Change default password immediately!</p>
      <pre style={wikiStyles.codeBlock}>
sudo passwd s3rl
# Enter new password
sudo passwd root  # Optional but recommended
      </pre>
      
      <h4 style={wikiStyles.subheading}>Enable RPMFusion</h4>
      <p style={wikiStyles.paragraph}>Needed for multimedia codecs, NVIDIA drivers, and gaming stuff:</p>
      <pre style={wikiStyles.codeBlock}>
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
sudo dnf groupupdate core
      </pre>
      
      <h4 style={wikiStyles.subheading}>Install Essential Packages</h4>
      <pre style={wikiStyles.codeBlock}>
# Gaming
sudo dnf install steam lutris wine

# Productivity
sudo dnf install libreoffice

# System tools
sudo dnf install htop neovim git

# Codecs (after enabling RPMFusion)
sudo dnf groupupdate multimedia
      </pre>
      
      <h4 style={wikiStyles.subheading}>Hardware Acceleration</h4>
      <pre style={wikiStyles.codeBlock}>
# For AMD GPUs (most users)
sudo dnf install mesa-vulkan-drivers

# For NVIDIA (proprietary)
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda
sudo reboot
      </pre>
      
      <h4 style={wikiStyles.subheading}>Flatpak Setup</h4>
      <pre style={wikiStyles.codeBlock}>
# Add Flathub (if not already)
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install popular apps
flatpak install flathub com.spotify.Client
flatpak install flathub com.discordapp.Discord
flatpak install flathub com.visualstudio.code
      </pre>
      
      <h4 style={wikiStyles.subheading}>Configure S3RL Theme</h4>
      <p style={wikiStyles.paragraph}>The S3RL theme should be pre-applied. If something looks off:</p>
      <pre style={wikiStyles.codeBlock}>
# Reset KDE theme
# System Settings → Appearance → Colors → Apply "S3RL-Atomic"
# System Settings → Appearance → Window Decorations → Choose S3RL theme
      </pre>
      
      <div style={wikiStyles.note}>
        <strong>💡 Pro Tip:</strong> Check the <Link href="/wiki/configuration" style={{ color: colors.pink }}>Configuration</Link> guide for more customization options!
      </div>
    </div>
  )
}

function Bootc() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Bootc Guide</h3>
      
      <p style={wikiStyles.paragraph}>bootc is Fedora's container-native approach to system management. Your entire OS is defined as a container image, making updates atomic and rollbacks trivial.</p>
      
      <h4 style={wikiStyles.subheading}>How bootc Works</h4>
      <p style={wikiStyles.paragraph}>
        Unlike traditional package managers, bootc doesn't modify files on your root filesystem. Instead:
      </p>
      <ul style={{ color: colors.textMuted, lineHeight: 2, marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Your OS is built as a container image (Containerfile)</li>
        <li>Images are stored in a registry (GHCR for S3RLinux)</li>
        <li><code style={wikiStyles.code}>bootc upgrade</code> downloads the new image</li>
        <li>On reboot, the new deployment is activated</li>
        <li>Previous deployments are kept for rollback</li>
      </ul>
      
      <h4 style={wikiStyles.subheading}>Check Status</h4>
      <p style={wikiStyles.paragraph}>View your current deployment and available rollbacks:</p>
      <pre style={wikiStyles.codeBlock}>
bootc status
# Shows current booted image, pending updates, and rollback options
      </pre>
      
      <h4 style={wikiStyles.subheading}>Update System</h4>
      <p style={wikiStyles.paragraph}>
        Updates are automatic, but you can force one:
      </p>
      <pre style={wikiStyles.codeBlock}>
sudo bootc upgrade
# Downloads latest image and stages it for next boot
sudo reboot
# Reboot to apply
      </pre>
      
      <h4 style={wikiStyles.subheading}>Rollback (if things break)</h4>
      <p style={wikiStyles.paragraph}>
        Something broke? Roll back instantly:
      </p>
      <pre style={wikiStyles.codeBlock}>
sudo bootc rollback
# Stages the previous deployment
sudo reboot
# Reboot into the working version
      </pre>
      
      <h4 style={wikiStyles.subheading}>Switch to Different Image</h4>
      <p style={wikiStyles.paragraph}>
        Switch to a completely different OS:
      </p>
      <pre style={wikiStyles.codeBlock}>
# Switch back to Aurora
sudo bootc switch ghcr.io/ublue-os/aurora:stable

# Switch to Silverblue
sudo bootc switch ghcr.io/ublue-os/silverblue-main:stable

# Reboot to apply
sudo reboot
      </pre>
      
      <h4 style={wikiStyles.subheading}>View Deployments</h4>
      <pre style={wikiStyles.codeBlock}>
bootc upgrade --check
# Check for available updates without applying
      </pre>
      
      <div style={wikiStyles.note}>
        <strong>💡 Pro Tip:</strong> Your /home directory is separate and preserved across updates and rollbacks. Only / changes.
      </div>
    </div>
  )
}

function Graphics() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Graphics</h3>
      
      <h4 style={wikiStyles.subheading}>AMD (Recommended)</h4>
      <p style={wikiStyles.paragraph}>AMD GPUs work out of the box with Mesa. For best performance:</p>
      <pre style={wikiStyles.codeBlock}>
# Wayland session (default) handles this automatically
# Verify driver is active:
glxinfo | grep "OpenGL renderer"
      </pre>
      <div style={wikiStyles.note}>
        <strong>💡 Pro Tip:</strong> AMD's open-source drivers are included in the kernel. No proprietary drivers needed!
      </div>
      
      <h4 style={wikiStyles.subheading}>NVIDIA (Proprietary)</h4>
      <p style={wikiStyles.paragraph}>NVIDIA requires proprietary drivers from RPMFusion:</p>
      <pre style={wikiStyles.codeBlock}>
# Enable RPMFusion first (if not already)
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Install drivers
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda

# Wait for kernel module to build (5-10 min)
sudo reboot
      </pre>
      <div style={wikiStyles.warning}>
        <strong>⚠️ Warning:</strong> NVIDIA on Wayland can be problematic. If you experience issues, try X11 session from SDDM.
      </div>
      
      <h4 style={wikiStyles.subheading}>Check GPU Info</h4>
      <pre style={wikiStyles.codeBlock}>
# List GPUs
lspci | grep -i vga

# Check driver in use
lspci -k | grep -A 2 -i vga

# Vulkan support
vulkaninfo --summary
      </pre>
      
      <h4 style={wikiStyles.subheading}>Hardware Acceleration in Browser</h4>
      <p style={wikiStyles.paragraph}>Both Firefox and Chrome support hardware acceleration:</p>
      <pre style={wikiStyles.codeBlock}>
# Firefox: about:support → Check WebRender status
# Chrome: chrome://gpu → Check GPU acceleration status
      </pre>
    </div>
  )
}

function Audio() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Audio</h3>
      
      <h4 style={wikiStyles.subheading}>Basic Audio Works</h4>
      <p style={wikiStyles.paragraph}>PipeWire and PulseAudio are pre-installed and work out of the box. S3RLinux uses PipeWire as the default audio server.</p>
      
      <h4 style={wikiStyles.subheading}>No Sound?</h4>
      <pre style={wikiStyles.codeBlock}>
# Check with Pulse Audio controls
pavucontrol

# Restart PipeWire
systemctl --user restart pipewire pipewire-pulse

# Check PipeWire status
pw-cli list objects
      </pre>
      
      <h4 style={wikiStyles.subheading}>Bluetooth Audio</h4>
      <pre style={wikiStyles.codeBlock}>
# Ensure Bluetooth is enabled
sudo systemctl enable --now bluetooth

# Install Bluetooth audio codecs (if missing)
sudo dnf install pipewire-pulseaudio-plugin-bluetooth
      </pre>
      
      <h4 style={wikiStyles.subheading}>Jack Audio (Pro Audio)</h4>
      <p style={wikiStyles.paragraph}>For music production and audio work:</p>
      <pre style={wikiStyles.codeBlock}>
# Install QJackCtl (GUI for JACK)
sudo dnf install qjackctl

# Install Pipewire-JACK compatibility
sudo dnf install pipewire-jack-audio-connection-kit

# Or for full JACK
sudo dnf install jack2
      </pre>
      
      <h4 style={wikiStyles.subheading}>USB Audio Interface</h4>
      <p style={wikiStyles.paragraph}>Most USB audio interfaces work plug-and-play. Check with:</p>
      <pre style={wikiStyles.codeBlock}>
# List audio devices
cat /proc/asound/cards

# Or with PipeWire
pw-cli list-objects | grep -i Audio
      </pre>
      
      <h4 style={wikiStyles.subheading}>Equalizer (EasyEffects)</h4>
      <p style={wikiStyles.paragraph}>For audio enhancement:</p>
      <pre style={wikiStyles.codeBlock}>
# Install EasyEffects (PipeWire compatible)
flatpak install flathub com.github.wwmm.easyeffects
      </pre>
    </div>
  )
}

function Development() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Development</h3>
      
      <h4 style={wikiStyles.subheading}>IDEs and Editors</h4>
      <p style={wikiStyles.paragraph}>S3RLinux comes with several development tools:</p>
      <pre style={wikiStyles.codeBlock}>
# VS Code (if not installed)
sudo dnf install code

# Or use Flatpak
flatpak install flathub com.visualstudio.code

# Neovim
sudo dnf install neovim

# JetBrains (via Toolbox)
flatpak install flathub com.jetbrains.Toolbox
      </pre>
      
      <h4 style={wikiStyles.subheading}>Python</h4>
      <pre style={wikiStyles.codeBlock}>
# Install Python
sudo dnf install python3 python3-pip

# Create virtual environment (recommended)
python3 -m venv ~/myproject
source ~/myproject/bin/activate

# Or use Homebrew
brew install python
      </pre>
      
      <h4 style={wikiStyles.subheading}>Node.js</h4>
      <pre style={wikiStyles.codeBlock}>
# Install Node.js and npm
sudo dnf install nodejs npm

# Or use nvm (recommended for version management)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
      </pre>
      
      <h4 style={wikiStyles.subheading}>Rust</h4>
      <pre style={wikiStyles.codeBlock}>
# Install Rust via rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
cargo --version
      </pre>
      
      <h4 style={wikiStyles.subheading}>Git</h4>
      <pre style={wikiStyles.codeBlock}>
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# SSH Key (for GitHub/GitLab)
ssh-keygen -t ed25519 -C "your@email.com"
cat ~/.ssh/id_ed25519.pub
# Add to GitHub Settings → SSH Keys
      </pre>
      
      <h4 style={wikiStyles.subheading}>Docker/Podman</h4>
      <pre style={wikiStyles.codeBlock}>
# Podman (pre-installed)
podman run hello-world

# Docker (if needed)
sudo dnf install docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
# Reboot or run: newgrp docker
      </pre>
      
      <div style={wikiStyles.note}>
        <strong>💡 Pro Tip:</strong> Since S3RLinux is immutable, install dev tools in your home directory or use containers/Flatpak for isolated environments.
      </div>
    </div>
  )
}

function Multimedia() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Multimedia</h3>
      
      <h4 style={wikiStyles.subheading}>Video Playback</h4>
      <p style={wikiStyles.paragraph}>
        <strong>Important:</strong> Enable RPMFusion first for multimedia codecs!
      </p>
      <pre style={wikiStyles.codeBlock}>
# Enable RPMFusion
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Install VLC
sudo dnf install vlc

# Or FFmpeg for command-line
sudo dnf install ffmpeg

# Install all multimedia codecs
sudo dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin
sudo dnf groupupdate sound-and-video
      </pre>
      
      <h4 style={wikiStyles.subheading}>Audio Editors</h4>
      <pre style={wikiStyles.codeBlock}>
# Audacity (simple editing)
sudo dnf install audacity

# Ardour (professional DAW)
sudo dnf install ardour

# Or via Flatpak
flatpak install flathub org.audacityteam.Audacity
      </pre>
      
      <h4 style={wikiStyles.subheading}>Video Editing</h4>
      <pre style={wikiStyles.codeBlock}>
# Kdenlive (KDE native, recommended)
sudo dnf install kdenlive

# Or DaVinci Resolve (see Gaming wiki for FUSE2 workaround!)
# Flatpak version
flatpak install flathub com.davinciproducts.Resolve
      </pre>
      
      <h4 style={wikiStyles.subheading}>Image Editing</h4>
      <pre style={wikiStyles.codeBlock}>
# GIMP
flatpak install flathub org.gimp.GIMP

# Krita (digital painting)
flatpak install flathub org.kde.krita

# Inkscape (vector graphics)
flatpak install flathub org.inkscape.Inkscape
      </pre>
      
      <h4 style={wikiStyles.subheading}>Music Players</h4>
      <pre style={wikiStyles.codeBlock}>
# Spotify (Flatpak)
flatpak install flathub com.spotify.Client

# Spotify CLI (for the terminal ravers)
brew install spotify-tui

# Or use web Spotify in your browser
      </pre>
      
      <div style={wikiStyles.note}>
        <strong>💡 Pro Tip:</strong> S3RLinux comes with Spicetify (Spotify theming) support. Check the main README for setup instructions!
      </div>
    </div>
  )
}

function FAQ() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Frequently Asked Questions</h3>
      
      <h4 style={wikiStyles.subheading}>Is this Fedora?</h4>
      <p style={wikiStyles.paragraph}>Yes! S3RLinux is based on Aurora (Fedora-based KDE distro). It uses bootc/OSTree for immutable atomic updates. Think of it as Fedora that went to a rave.</p>
      
      <h4 style={wikiStyles.subheading}>Is this Arch?</h4>
      <p style={wikiStyles.paragraph}><strong>NO!</strong> It's Fedora with bootc. We made a promise. We kept the promise. No AUR here. Use Flatpak or DNF instead.</p>
      
      <h4 style={wikiStyles.subheading}>What does "Immutable" mean?</h4>
      <p style={wikiStyles.paragraph}>Your root filesystem (/) is read-only. You can't accidentally break your system by deleting system files. Updates are applied atomically - all or nothing. If something breaks, rollback is instant.</p>
      
      <h4 style={wikiStyles.subheading}>Can I use sudo?</h4>
      <p style={wikiStyles.paragraph}>Yes! Default user <code style={wikiStyles.code}>s3rl</code> is in the wheel group and can use sudo.</p>
      
      <h4 style={wikiStyles.subheading}>Where is the AUR?</h4>
      <p style={wikiStyles.paragraph}>There is no AUR! This is Fedora, not Arch. Use these alternatives:</p>
      <ul style={{ color: colors.textMuted, lineHeight: 2, marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li><strong>Flatpak:</strong> Desktop apps (Spotify, Discord, etc.)</li>
        <li><strong>Homebrew:</strong> CLI tools (htop, neovim, etc.)</li>
        <li><strong>DNF:</strong> System packages</li>
        <li><strong>Containers:</strong> Development environments</li>
      </ul>
      
      <h4 style={wikiStyles.subheading}>How do I install new software?</h4>
      <pre style={wikiStyles.codeBlock}>
# Desktop apps - use Flatpak
flatpak install flathub com.spotify.Client

# CLI tools - use Homebrew (pre-installed)
brew install htop neovim

# System packages - use DNF (read-only filesystem!)
sudo dnf install package-name
# May not work on immutable systems! Use layered packages:
sudo rpm-ostree install package-name
      </pre>
      
      <h4 style={wikiStyles.subheading}>Can I customize everything?</h4>
      <p style={wikiStyles.paragraph}>Absolutely! KDE Plasma is the most customizable desktop environment. Plus your /home directory is fully writable. Customize your dotfiles, install themes, do whatever you want.</p>
      
      <h4 style={wikiStyles.subheading}>Why listen to S3RL?</h4>
      <p style={wikiStyles.paragraph}>Because it's required by the SAL license. But seriously - S3RL is amazing Happy Hardcore. Just give it a try. Your soul will ascend. 💀</p>
    </div>
  )
}

export default Wiki