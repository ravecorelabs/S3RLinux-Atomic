# 💀 S3RLINUX ATOMIC

**S3RL-themed bootc Distribution** — The ultimate happy hardcore Linux experience!

> "RAVE ALL NIGHT 💀"

## 💀💀💀 WE ARE ON ARTIFACTHUB NOW! YAAAAAY 💀💀💀

## 📥 Downloads

**Latest builds from GitHub Actions:**

| Type | Link | Size |
|:---|:---|:---|
| 🖥️ VM Image (qcow2) | [Actions Run](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/actions/runs/25122556798) | ~4GB |
| 💿 Live ISO | [Actions Run](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/actions/runs/25122556798) | ~4GB |
| 🐳 Container | [GH Packages](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/pkgs/container/s3rlinux-atomic) | ~2GB |

> **Note:** Download artifacts from the Actions run above. Click the run → find your artifact → download!

[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/s3rlinux-atomic)](https://artifacthub.io/packages/search?repo=s3rlinux-atomic)
[![Container Image](https://img.shields.io/github/v/tag/moonlightOS-Meow/S3RLinux-Atomic?include_prereleases&label=Latest)](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/pkgs/container/s3rlinux-atomic)
[![Disk Builds](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/actions/workflows/build-disk.yml/badge.svg)](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/actions)

---

## 📋 Quick Links

| 🌐 Website | ⭐ Stars | 💬 Discussion | 🐛 Issues |
|:---:|:---:|:---:|:---:|
| [Live Site](https://moonlightOS-Meow.github.io/S3RLinux-Atomic) | [Stargazers](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/stargazers) | [Chat](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/discussions) | [Report Bugs](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues) |

---

## ⚡ Quick Install

```bash
# Switch from existing Fedora/Bootc system
sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest
sudo reboot
```

---

## 📝 Devlogs

*Building an immutable distro from scratch, one bug at a time.*

### 2026-04-30: Grill Day & Update Notice 🔥
- Dev is currently at a school grill event (yes, really)
- Updates may be slower than usual for a bit — school stuff, life stuff, you know how it is
- S3RLINUX ATOMIC is NOT dead, just chilling 🌈
- Lucyfer (Head of QA) is still alive and judging the codebase from a safe distance

### 2026-04-28: HoloISO Tangent 💀
- Dev briefly installed HoloISO on main machine
- NVIDIA actually worked (shocking)
- Plasma 5 said no to Plasma 6 upgrade
- Returned to sensible distro shortly after. As always.

### 2026-04-25: First Working Build! 🎉
- Fixed VERSION_ID missing (bootc-image-builder requirement)
- Added --rootfs=xfs to fix disk builds
- qcow2 and ISO both building!

### 2026-04-25: The Great Branding Purge 🔥
- Removed ALL Aurora "heresy"
- Custom Plymouth theme with S3RL logo
- SDDM auto-login as `s3rl` user
- Hostname = s3rlinux

### Known Issues
- Container image has ~195 vulnerabilities from base Aurora (can't fix - comes with base)

---

## 📊 Popularity

<div align="center">

[![Star History](https://api.star-history.com/svg?repos=moonlightOS-Meow/S3RLinux-Atomic&type=Date)](https://star-history.com/#moonlightOS-Meow/S3RLinux-Atomic)

---

## 💬 Discussion

[Discussions](https://github.com/moonlightOS-Meow/S3RLinux-Atomic/discussions)

---

## ⚠️ DISCLAIMER

> **⚠️ WAIT - WE HAVEN'T TESTED IT YET !!!**
>
> **DO NOT INSTALL THIS YET.** We literally just built it. It might not boot. It might brick everything. Wait until someone (probably us, later, when we're less lazy) confirms it actually works.
>
> We warned you. lol no tech support included

---

## 🎵 WHAT IS S3RLINUX ATOMIC?

S3RLinux Atomic is a **bootc** image themed around **S3RL** — the legendary Happy Hardcore & Frenchcore DJ from Brisbane, Australia.

- 💀 Custom OS branding (we made our own, barely)
- 🎵 Per the S3RL License (SAL): you MUST listen to S3RL while using this OS
- 💀 KDE Plasma desktop environment - because GNOME is fine but KDE hits different
- ⚡ Immutable OSTree-based (don't @ us)
- 🔧 Built on Fedora (the good stuff)

---

## 🚀 STATUS

- [x] Template set up (done)
- [x] OS branding changed (done, barely)
- [x] Custom license added (done, it's funny go read it)
- [x] Custom logo added (done)
- [x] First build DONE 🎉
- [x] Disk images (qcow2 + ISO) in Actions!
- [x] ArtifactHub listed (done)
- [x] Aurora branding REMOVED 💀

---

## ⚡ QUICK START

```bash
# Switch to our image
sudo bootc switch ghcr.io/moonlightos-meow/s3rlinux-atomic:latest

# Reboot
sudo reboot
```

---

## 🔨 BUILDING

```bash
# Install deps first
just build
```

### VM Images

```bash
just build-qcow2
just build-iso
just build-raw
```

---

## 📜 LICENSE

**THE S3RLINUX ATOMIC LICENSE (SAL)**

Go read `LICENSE`. It's literally a meme. There's a joke about cookies in there.

Key terms:
- ✅ Free to use, modify, distribute
- ✅ Must keep the chaos alive
- ⚠️ **LEGALLY REQUIRED** to listen to S3RL while using this OS
- ⚠️ We take no responsibility if your computer achieves sentience and starts raving

---

## 🖼️ LOGO

We have one! Check `s3rlinux-a-logo.png`. It's... a logo.

---

## 📞 SUPPORT

- GitHub Issues: https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues
- We'll try to help but no promises

---

*Welcome to the future. The S3RL spirit flows through your OSTree. Your bootc commands are weapons.*

*RAVE ALL NIGHT. 💀🌈*
