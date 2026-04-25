# 🤖 S3RLinux Atomic - Agent Guide

> "RAVE ALL NIGHT 💀"

## Project Overview

S3RLinux Atomic is a custom bootc image built on top of Aurora (KDE Fedora-based immutable distro). It's themed around S3RL - the legendary Happy Hardcore DJ from Brisbane, Australia.

### Core Facts
- **Type**: bootc/OSTree immutable system
- **Base**: Aurora (KDE Plasma)
- **Image Registry**: ghcr.io/moonlightos-meow/s3rlinux-atomic
- **License**: SAL (S3RLinux Atomic License) - See LICENSE file
- **Language**: Mostly Bash, YAML, some React for website

---

## 📁 Repository Structure

```
S3RLinux-Atomic/
├── .github/
│   ├── workflows/
│   │   ├── build.yml          # Main container build
│   │   ├── build-disk.yml     # ISO/VM image building
│   │   ├── pages.yml         # Website deployment (React+Vite)
│   │   ├── welcome.yml      # Welcome first-time contributors
│   │   ├── stale.yml         # Close inactive issues
│   │   ├── emoji.yml         # Auto-react to new issues/PRs
│   │   └── release-drafter.yml # Auto-generate releases
│   ├── dependabot.yml        # Dependency updates
│   ├── renovate.json5        # Advanced dependency updates
│   └── star-history.json     # Star tracking
├── backup/
│   ├── packages-arch.txt      # 1125 Arch packages (backup)
│   └── fedora-equivalents.txt # Fedora package guide
├── build_files/
│   ├── build.sh              # Main build script (RUN THIS)
│   ├── S3RL-Atomic.colors    # KDE color scheme
│   ├── s3rlinux-a-logo.png   # Main logo
│   ├── s3rlinux-logo-are-you-fucking-blind.png # Plymouth logo
│   ├── sddm/                 # SDDM login theme
│   │   ├── theme.conf
│   │   └── Main.qml
│   └── plymouth/              # Boot splash theme
│       ├── s3rl-atomic.plymouth
│       └── script.script
├── disk_config/
│   ├── disk.toml             # Disk image config
│   ├── iso-kde.toml           # ISO config
│   └── iso-gnome.toml
├── docs-src/                  # Website source (React+Vite)
│   ├── src/
│   │   ├── App.jsx           # Main website component
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Containerfile              # Main container build
├── Justfile                   # Build commands
├── README.md                  # Main documentation
├── tutorial.md               # Original template tutorial
├── LICENSE                   # SAL (very funny, read it)
└── artifacthub-repo.yml       # ArtifactHub config
```

---

## 🔨 Building

### Local Build (Recommended)

```bash
# Install dependencies first
just build

# Build VM image (qcow2)
just build-qcow2

# Build ISO
just build-iso

# Run in VM
just run-vm-qcow2
```

### GitHub Actions

1. Go to **Actions** tab
2. Run **Build container image** for container
3. Run **Build disk images** for ISO

---

## 🎨 Customizations

### OS Branding
Edit `build_files/build.sh` - lines 5-18 contain os-release configuration.

### KDE Theme
Edit `build_files/S3RL-Atomic.colors` - Contains all KDE color scheme.

### SDDM Login
Edit `build_files/sddm/` - Main.qml and theme.conf.

### Plymouth Boot Splash
Edit `build_files/plymouth/` - script.script controls boot animation.

### Website
Edit `docs-src/src/App.jsx` - React website code.

---

## 🔧 Common Tasks

### Update Package Version
1. Edit `build_files/build.sh` - find the dnf install line
2. Update version number
3. Commit and push

### Add New Package
Add to `build_files/build.sh`:
```bash
dnf5 install -y package-name
```

### Change Base Image
Edit `Containerfile` line 6:
```dockerfile
FROM ghcr.io/ublue-os/aurora:stable
```

### Add GitHub Bot
Add workflow to `.github/workflows/`

---

## 🐛 Troubleshooting

### Build Fails
- Check `build_files/build.sh` syntax
- Ensure all files in build_files/ are properly copied
- Verify Containerfile paths

### Website Fails
- Check `docs-src/` has npm install in CI
- Verify vite.config.js output directory
- Check node version in workflow

### Image Won't Boot
- Check Plymouth theme syntax
- Verify disk_config/ has xfs filesystem type
- Check ISO kickstart for correct image URL

---

## 🎵 Important Notes

### S3RL License Requirements
Per the SAL license: Users MUST listen to S3RL while using this OS. This is a joke but please don't remove references to S3RL.

### Fun References to Keep
- "RAVE ALL NIGHT 💀" - Main slogan
- "OOH-OOH OOH-OOH" - Easter egg
- "lol no tech support included" - From LICENSE

---

## 🤖 Bot Configuration

### Dependabot
Automatically updates GitHub Actions weekly.
- Config: `.github/dependabot.yml`

### Renovate
Advanced dependency updates.
- Config: `.github/renovate.json5`

### Stale Bot
Closes inactive issues after 60 days.
- Config: `.github/workflows/stale.yml`

### Emoji Bot
Reacts 🎉 to new issues, 🚀 to new PRs.
- Config: `.github/workflows/emoji.yml`

### Release Drafter
Auto-generates release notes.
- Config: `release-drafter-config.yml`

### All Contributors
Credits contributors in README.
- Config: `.all-contributorsrc`

---

## 📞 Getting Help

- GitHub Issues: https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues
- Auroras Docs: https://docs.getaurora.dev
- Universal Blue: https://universal-blue.org
- bootc Docs: https://github.com/bootc-dev/bootc

---

*Built with 💜 and UNTZ UNTZ by moonlightOS-Meow*

*RAVE ALL NIGHT 💀*