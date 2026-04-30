#!/bin/bash

set -ouex pipefail

### DELETE AURORA BRANDING
echo "Removing Aurora heresy..."

# Safely remove aurora dirs if they exist
rm -rf /usr/share/plymouth/themes/aurora 2>/dev/null || true
rm -rf /usr/share/plymouth/themes/breezy 2>/dev/null || true
rm -rf /usr/share/konforti 2>/dev/null || true
rm -rf /usr/share/sddm/themes/aurora 2>/dev/null || true
rm -rf /usr/share/sddm/themes/breezy 2>/dev/null || true
rm -rf /usr/share/gnome-shell/theme/aurora 2>/dev/null || true
rm -rf /usr/share/icons/Flader_Stoy 2>/dev/null || true
rm -rf /var/log/ublue 2>/dev/null || true  
rm -f /etc/aurora* 2>/dev/null || true
rm -f /usr/lib/glib-schemas/10_ublue-* 2>/dev/null || true

# Copy any PNGs as wallpapers
cp /*.png /usr/share/backgrounds/ 2>/dev/null || true

# Replace Aurora in os-release (this is the key branding fix!)
sed -i 's/Aurora/S3RLinux/g; s/AURORA/S3RLINUX/g' /usr/lib/os-release 2>/dev/null || true

# Hostname is set later in OS Branding section

# Only remove Aurora cosmetic apps - keep useful ublue utilities!

### OS Branding
cat > /usr/lib/os-release << 'EOF'
NAME="S3RLinux Atomic"
PRETTY_NAME="S3RLinux Atomic"
ID="s3rlinux-atomic"
ID_LIKE="fedora"
VERSION_ID="42"
BUILD_ID=latest
ANSI_COLOR="38;2;23;147;209"
HOME_URL="https://s3rlinux.github.io"
DOCUMENTATION_URL="https://github.com/moonlightOS-Meow/S3RLinux-Atomic"
SUPPORT_URL="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues"
BUG_REPORT_URL="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues"
LOGO="s3rlinux-a-logo"
EOF

### Branding files
cp /ctx/s3rlinux-a-logo.png /usr/share/pixmaps/
cp /ctx/S3RL-Atomic.colors /usr/share/color-schemes/

# SDDM (for older Aurora pre-F44) - kept for backwards compatibility
cp -r /ctx/sddm /usr/share/sddm/themes/ 2>/dev/null || true
mkdir -p /etc/sddm.conf.d 2>/dev/null || true
cat > /etc/sddm.conf.d/s3rl-theme.conf << 'EOF'
[Theme]
Current=S3RL-Atomic
EOF

# Plasma Login Manager (Aurora F44+) - NEW theming system
# PLM uses Plasma's native theming (color schemes + wallpaper)
# instead of custom SDDM QML themes.
# Configuration: /etc/plasmalogin.conf
mkdir -p /etc/plasmalogin.conf.d

# Autologin for PLM
cat > /etc/plasmalogin.conf.d/autologin.conf << 'EOF'
[Autologin]
User=s3rl
Session=plasma.desktop
EOF

# PLM default config - use our color scheme
cat > /etc/plasmalogin.conf << 'EOF'
[Greeter]
# Use the default Breeze greeter (PLM doesn't support custom QML themes)
# The color scheme and wallpaper will be applied via Plasma settings
EOF

# For older SDDM, also set autologin
cat > /etc/sddm.conf.d/autologin.conf << 'EOF'
[Autologin]
User=s3rl
Session=plasma.desktop
Relogin=true
EOF

# Plymouth theme files (manual set via: plymouth-set-default S3RL-Atomic)
cp /ctx/plymouth/s3rl-atomic.plymouth /usr/share/plymouth/themes/
mkdir -p /usr/share/plymouth/themes/S3RL-Atomic/
cp /ctx/plymouth/script.script /usr/share/plymouth/themes/S3RL-Atomic/
cp /ctx/s3rlinux-logo-are-you-fucking-blind.png /usr/share/plymouth/themes/S3RL-Atomic/s3rlinux-logo.png
ln -sf /usr/share/plymouth/themes/S3RL-Atomic /etc/alternatives/plymouth-theme

# Configure plymouth to use S3RL theme automatically (not need plymouth-set-default)
mkdir -p /etc/plymouth
cat > /etc/plymouth/plymouthd.conf << 'EOF'
[Daemon]
Theme=S3RL-Atomic
EOF

# Also set via systemd service (for first boot - ignore chroot error)
mkdir -p /etc/systemd/system
cat > /etc/systemd/system/s3rl-plymouth.service << 'EOF'
[Unit]
Description=S3RLinux Plymouth Theme
After=local-fs.target

[Service]
Type=oneshot
ExecStart=/usr/bin/plymouth-set-default S3RL-Atomic
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

(ln -sf /usr/share/plymouth/themes/S3RL-Atomic /etc/Alternatives/plymouth-theme) 2>/dev/null || true

### Install packages

# Security updates from broken bot
dnf5 install -y dnf5-plugins 2>/dev/null || true
dnf5 update --security -y 2>/dev/null || true

# Update all packages to latest (security fixes)
dnf5 update -y

# Packages can be installed from any enabled yum repo on the image.
# RPMfusion repos are available by default in ublue main images
# List of rpmfusion packages can be found here:
# https://mirrors.rpmfusion.org/mirrorlist?path=free/fedora/updates/43/x86_64/repoview/index.html&protocol=https&redirect=1

# this installs a package from fedora repos
dnf5 install -y tmux 

# DaVinci Resolve - Fedora 44 broke AppImages!
# Fedora 44 removed FUSE2 from Atomic Desktops
# WORKAROUND: Use --appimage-extract instead of running directly:
#   1. Download DaVinci Resolve .run file
#   2. chmod +x DaVinci_Resolve* .run
#   3. ./DaVinci_Resolve* --appimage-extract
#   4. cd squashfs-root/
#   5. ./bin/Resolve
# This extracts the AppImage contents and runs the binary directly

# ALTERNATIVE: Layer fuse2 back (for those who really need it):
# rpm-ostree install fuse fuse-libs
# Then reboot

# Use a COPR Example:
#
# dnf5 -y copr enable ublue-os/staging
# dnf5 -y install package
# Disable COPRs so they don't end up enabled on the final image:
# dnf5 -y copr disable ublue-os/staging

#### Example for enabling a System Unit File

systemctl enable podman.socket

### Create user (for login)
# Replace 'username' with your desired username
user_name="s3rl"
user_password="s3rl"  # Change this!

# Create user with password
useradd -m -G wheel -s /bin/bash "$user_name"
echo "$user_name:$user_password" | chpasswd
