import { useState } from 'react'
import { motion } from 'framer-motion'

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
  green: '#238636'
}

// Wiki styles like Arch Wiki
const wikiStyles = {
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
    marginBottom: '1rem'
  },
  warning: {
    background: 'rgba(255, 0, 128, 0.15)',
    border: `1px solid #ff0080`,
    borderRadius: 8,
    padding: '1rem',
    marginBottom: '1rem'
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
  }
}

function Wiki() {
  const [selectedArticle, setSelectedArticle] = useState('getting-started')
  
  const articles = [
    { id: 'getting-started', title: 'Getting Started', desc: 'Everything you need to know to get started' },
    { id: 'installation', title: 'Installation Guide', desc: 'How to install S3RLinux' },
    { id: 'configuration', title: 'Configuration', desc: 'Configure your system' },
    { id: 'package-management', title: 'Package Management', desc: 'Installing and managing packages' },
    { id: 'hardware', title: '硬件 Hardware', desc: 'Graphics, audio, and peripherals' },
    { id: 'networking', title: 'Networking', desc: 'WiFi, Ethernet, VPN' },
    { id: 'gaming', title: 'Gaming', desc: 'Steam, Lutris, wine' },
    { id: 'troubleshooting', title: 'Troubleshooting', desc: 'When things break' },
  ]
  
  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      {/* Wiki Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        style={{
          background: colors.gray,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: colors.text, marginBottom: '0.25rem' }}>
            📚 S3RLinux Wiki
          </h2>
          <p style={{ color: colors.textMuted, fontSize: '0.95rem' }}>
            Like Arch Wiki, but purple. And with more raves. 🎵
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {articles.map(art => (
            <motion.button
              key={art.id}
              onClick={() => setSelectedArticle(art.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 6,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: selectedArticle === art.id ? colors.purple : 'transparent',
                color: selectedArticle === art.id ? '#fff' : colors.textMuted,
                border: `1px solid ${selectedArticle === art.id ? colors.purple : colors.border}`,
                fontWeight: 500
              }}
            >
              {art.title}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Article Content */}
      {selectedArticle === 'getting-started' && <GettingStarted />}
      {selectedArticle === 'installation' && <InstallationGuide />}
      {selectedArticle === 'configuration' && <Configuration />}
      {selectedArticle === 'package-management' && <PackageManagement />}
      {selectedArticle === 'hardware' && <Hardware />}
      {selectedArticle === 'networking' && <Networking />}
      {selectedArticle === 'gaming' && <Gaming />}
      {selectedArticle === 'troubleshooting' && <Troubleshooting />}
    </div>
  )
}

// FULL ARTICLES

function GettingStarted() {
  return (
    <div style={wikiStyles.article}>
      <h3 style={wikiStyles.heading}>Getting Started with S3RLinux</h3>
      
      <p style={wikiStyles.paragraph}>
        Welcome to S3RLinux! This guide will help you get up and running in no time. 
        S3RLinux is based on Fedora/Aurora with bootc for atomic updates. Think of it as Fedora decided to go to a rave.
      </p>
      
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
        <li>SDDM login screen with S3RL theme</li>
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
sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest

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
docker run -it ghcr.io/moonlightos-meow/s3rlinux-atomic:latest

# Or with persistent home
docker run -it -v ~/s3rl-home:/home ghcr.io/moonlightos-meow/s3rlinux-atomic:latest
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
{`# Create a desktop file
cat > ~/Desktop/Resolve.desktop << 'EOF'
[Desktop Entry]
Name=DaVinci Resolve
Exec=sudo /path/to/squashfs-root/bin/Resolve
Type=Application
EOF`}
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
kquit --all plasmashell 2>/dev/null
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

export default Wiki