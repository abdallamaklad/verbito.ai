# GitHub to VPS Deployment

Verbito deploys from GitHub Actions to the VPS whenever `main` is pushed.

## Required GitHub Secrets

Set these in GitHub:

`Settings -> Secrets and variables -> Actions -> New repository secret`

- `VPS_HOST`: `76.13.190.19`
- `VPS_USER`: `root`
- `VPS_SSH_KEY`: private deploy key for GitHub Actions
- `VITE_SITE_URL`: `https://verbito.ai`
- `VITE_SUPABASE_URL`: production Supabase URL
- `VITE_SUPABASE_ANON_KEY`: production Supabase anon key
- `VITE_STRIPE_PUBLISHABLE_KEY`: live Stripe publishable key

Do not put Stripe secret keys, OpenAI keys, Supabase service role keys, or webhook secrets in GitHub Actions frontend build secrets.

## VPS SSH Key Setup

GitHub Actions uses an SSH key, not the VPS password.

1. Add the deploy public key to `/root/.ssh/authorized_keys` on the VPS.
2. Put the matching private key in the GitHub secret `VPS_SSH_KEY`.

The deploy key generated on this machine is intentionally ignored by Git:

- `.github/deploy_key_ed25519`
- `.github/deploy_key_ed25519.pub`

## Deployment Flow

On every push to `main`, `.github/workflows/deploy.yml`:

1. Checks out the repo.
2. Installs Node from `.nvmrc`.
3. Runs `npm ci`.
4. Runs `npm run lint`.
5. Builds `dist/` with public production env values.
6. Uploads the build archive and deploy script to the VPS.
7. Runs `scripts/deploy/deploy-vps.sh` remotely.
8. Smoke-tests `https://verbito.ai` and `https://verbito.ai/pricing`.

The VPS deploy script:

- extracts each release into `/var/www/verbito/releases/<timestamp>`
- updates `/var/www/verbito/current`
- ensures Caddy serves `verbito.ai` and `www.verbito.ai`
- keeps HTML `no-cache`
- keeps `/assets/*` immutable
- retains the latest five releases
