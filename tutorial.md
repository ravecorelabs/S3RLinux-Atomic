# S3RLinux Atomic - THE TEMPLATE

This repository is a template for building your own custom [bootc](https://github.com/bootc-dev/bootc) image. Basically, it's how you make your own distro without the pain of actually making a distro from scratch.

We took the Universal Blue template and put our own spin on it. Now you can too! (you're welcome, or sorry)

# Community

Got questions? Try these places before screaming into the void:
- [Universal Blue Forums](https://universal-blue.discourse.group/)
- [Universal Blue Discord](https://discord.gg/WEu6BdFEtp)
- [bootc discussion forums](https://github.com/bootc-dev/bootc/discussions) - for when the other options fail and you need to yell at strangers

# How to Use

## Step 0: Do You Even Need This?

Prerequisites:
- A Github Account (yes, you need this)
- A machine running a bootc image (Bazzite, Bluefin, Aurora, or Fedora Atomic)
- Experience with CLI programs (or a willingness to break things)
- Coffee (mandatory)

## Step 1: Copy the Template

1. Click `Use this Template` at the top (the green button)
2. Name it something cool (your-distro-name)
3. Enable GitHub Actions: go to Actions → Enable workflows

## Step 2: Setup

### Generate Cosign Key

Run this in your repo folder:
```bash
COSIGN_PASSWORD="" cosign generate-key-pair
```

**DON'T COMMIT cosign.key** (seriously, don't. We can't help you if you do.)

Add to GitHub: Settings → Secrets and Variables → Actions → New secret `SIGNING_SECRET`

### Pick a Base Image

Edit `Containerfile`, change `FROM` line:
- Aurora: `ghcr.io/ublue-os/aurora:stable` (that's us! KDE baby)
- Bazzite: `ghcr.io/ublue-os/bazzite:stable`
- Bluefin: `ghcr.io/ublue-os/bluefin:stable`

Find your current image:
```bash
sudo bootc status
```

### Change the Name

Edit `Justfile` line 1: `export image_name := env("IMAGE_NAME", "your-name")`

Then push:
```bash
git add Containerfile Justfile cosign.pub
git commit -m "Initial Setup"
git push
```

Check Actions tab. When green checkmark appears, you're done!

## Step 3: Switch

```bash
sudo bootc switch ghcr.io/<username>/<image_name>
```

Reboot. Boom. New OS. You're now that nerd who "made their own distro."

# What's This All For?

- **Containerfile**: Where you install stuff (the important part)
- **build.sh**: The actual commands that run during build
- **Justfile**: Image name and build commands
- **workflows**: GitHub Actions magic that builds and pushes your image

# Building Disk Images

Want an ISO? qcow2? raw disk? Enable the disk workflow in Actions and configure S3 if you want cloud uploads. Or just grab the artifact. We don't care.

# Justfile Commands

- `just build` - Build container image
- `just build-qcow2` - Build VM image
- `just build-iso` - Build ISO
- `just build-raw` - Build raw disk
- `just run-vm-qcow2` - Run VM locally
- `just spawn-vm` - Spawn VM with systemd-vmspawn

# The End

That's it. You now have a custom distro. Congratulations.

If this broke your system, remember: we warned you.

---

Made with 💩 and no sleep by the S3RLinux team.

Also check out other cool templates:
- [bOS](https://github.com/bsherman/bos)
- [Amy OS](https://github.com/astrovm/amyos)