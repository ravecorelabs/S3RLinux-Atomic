# Session 2026-05-02 - Real Org Update & Solus Plans

## Date
2026-05-02

## Context
WE'RE A REAL ORG NOW (Not Clickbait) 💀

## What We Did

### 1. Real GitHub Org Created
- Old: `RaveCore-Labs` (pseudo org - just renamed personal account)
- New: `ravecorelabs` (actual GitHub Organization - lowercase, real deal)
- URL changed: https://github.com/ravecorelabs/S3RLinux-Atomic

### 2. All Links Updated
- README.md
- build_files/build.sh
- docs-src/src/App.jsx
- docs-src/src/Characters.jsx
- .github/workflows/build.yml
- .github/workflows/build-disk.yml
- artifacthub-repo.yml
- .all-contributorsrc
- CODEOWNERS
- AGENTS.md
- star-history.json

### 3. Git Remote Updated
```
git remote set-url origin git@github.com:ravecorelabs/S3RLinux-Atomic.git
```

### 4. GHCR Registry Path Fixed
- Old: `ghcr.io/ravecore-labs/s3rlinux-atomic`
- New: `ghcr.io/ravecorelabs/s3rlinux-atomic`
Updated in:
- build.yml
- build-disk.yml
- App.jsx
- Wiki.jsx
- README.md
- AGENTS.md
- iso-kde.toml

### 5. Blog Post Added
Added "WE'RE A REAL ORG NOW (Not Clickbait) 💀" to BlogSection in App.jsx.

### 6. CI Test Run
- First CI run after org rename FAILED
- Error: `permission_denied: The requested installation does not exist.`
- Cause: Push was going to old registry path `ghcr.io/ravecore-labs` (underscore)
- Fixed by updating IMAGE_REGISTRY to `ghcr.io/ravecorelabs` (no underscore)
- Second CI run triggered - SUCCESS! 🎉

## User Plans

### Daily Drive Switch
- User switching from S3RLinux-Atomic to Solus as daily drive
- BUT keeping S3RLinux-Atomic CI-based (container/ISO builds in GitHub Actions)
- Just pushes code, CI does the rest

### Secret Distro Plans
- User planning to make a SECRET distro on Solus
- Different from S3RLinux-Atomic
- Future project

## Key Files Changed
- All links + registry paths updated from RaveCore-Labs/ravecore-labs → ravecorelabs
- Remote URL updated
- Blog post added

## Commits Made
1. `8e131b3` - chore: rename RaveCore-Labs to ravecorelabs in all links and references
2. `1f6d58b` - feat: add real org announcement blog post
3. `cb50b93` - fix: update ghcr.io registry path from ravecore-labs to ravecorelabs

## Important Notes
- GitHub orgs are case-insensitive but URLs are not
- `ravecorelabs` ≠ `ravecore-labs` - one has underscore
- User's daily machine doesn't matter - CI builds S3RLinux
- SECRET DISTRO INCOMING ON SOLUS 💀

---

*RAVE ALL NIGHT 💀*