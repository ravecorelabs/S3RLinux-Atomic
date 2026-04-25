#!/bin/bash

set -ouex pipefail

### OS Branding
cat > /usr/lib/os-release << 'EOF'
NAME="S3RLinux Atomic"
PRETTY_NAME="S3RLinux Atomic"
ID="s3rlinux-atomic"
ID_LIKE="fedora"
BUILD_ID=latest
ANSI_COLOR="38;2;23;147;209"
HOME_URL="https://s3rlinux.github.io"
DOCUMENTATION_URL="https://github.com/moonlightOS-Meow/S3RLinux-Atomic"
SUPPORT_URL="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues"
BUG_REPORT_URL="https://github.com/moonlightOS-Meow/S3RLinux-Atomic/issues"
LOGO="s3rlinux-a-logo"
EOF

cp /usr/lib/os-release /etc/os-release
cp /ctx/s3rlinux-a-logo.png /usr/share/pixmaps/
cp /ctx/S3RL-Atomic.colors /usr/share/color-schemes/
cp -r /ctx/sddm /usr/share/sddm/themes/
mkdir -p /etc/sddm.conf.d
cat > /etc/sddm.conf.d/s3rl-theme.conf << 'EOF'
[Theme]
Current=S3RL-Atomic
EOF

cp /ctx/plymouth/s3rl-atomic.plymouth /usr/share/plymouth/themes/
cp /ctx/plymouth/script.script /usr/share/plymouth/themes/S3RL-Atomic/
cp /ctx/s3rlinux-logo-are-you-fucking-blind.png /usr/share/plymouth/themes/S3RL-Atomic/s3rlinux-logo.png
plymouth-set-default S3RL-Atomic
ln -sf /usr/share/plymouth/themes/S3RL-Atomic /etc/alternatives/plymouth-theme

### Install packages

# Packages can be installed from any enabled yum repo on the image.
# RPMfusion repos are available by default in ublue main images
# List of rpmfusion packages can be found here:
# https://mirrors.rpmfusion.org/mirrorlist?path=free/fedora/updates/43/x86_64/repoview/index.html&protocol=https&redirect=1

# this installs a package from fedora repos
dnf5 install -y tmux 

# Use a COPR Example:
#
# dnf5 -y copr enable ublue-os/staging
# dnf5 -y install package
# Disable COPRs so they don't end up enabled on the final image:
# dnf5 -y copr disable ublue-os/staging

#### Example for enabling a System Unit File

systemctl enable podman.socket
