#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Fly.io deploy script for WC 2026 AI Predictor
#
# First time:
#   brew install flyctl
#   fly auth login
#   fly launch          ← reads fly.toml, registers app on Fly.io (run once)
#   ./deploy-fly.sh     ← sets secrets + creates volume + deploys
#
# Subsequent deploys:
#   ./deploy-fly.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

ENV_FILE=".env.local"

# ─── Guards ───────────────────────────────────────────────────────────────────

if ! command -v flyctl &>/dev/null; then
  echo "✗ flyctl not installed."
  echo "  Install:  brew install flyctl"
  echo "  Then:     fly auth login"
  exit 1
fi

if ! flyctl auth whoami &>/dev/null 2>&1; then
  echo "✗ Not logged in to Fly.io. Run:  fly auth login"
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "✗ $ENV_FILE not found — API keys must exist locally."
  exit 1
fi

# ─── Read app name from fly.toml ─────────────────────────────────────────────

APP=$(grep '^app' fly.toml | sed "s/app = ['\"]//;s/['\"].*//")
echo "▸ App: $APP"

# ─── Create persistent volume if it doesn't exist ────────────────────────────

REGION=$(grep 'primary_region' fly.toml | sed "s/primary_region = ['\"]//;s/['\"].*//")

if ! flyctl volumes list --app "$APP" 2>/dev/null | grep -q "wc26_data"; then
  echo "▸ Creating persistent volume (1GB) in $REGION..."
  flyctl volumes create wc26_data \
    --app "$APP" \
    --region "$REGION" \
    --size 1 \
    --yes
  echo "✓ Volume created"
else
  echo "✓ Volume already exists"
fi

# ─── Push secrets from .env.local ────────────────────────────────────────────
# Only push keys — FOOTBALL_DATA_SOURCE is already in fly.toml [env]

echo "▸ Setting secrets from $ENV_FILE..."

SECRETS=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^#.*$  ]] && continue
  [[ -z "$line"        ]] && continue
  key="${line%%=*}"
  case "$key" in
    ANTHROPIC_API_KEY|\
    GROQ_API_KEY|\
    FOOTBALL_API_KEY|\
    CLAUDE_BUDGET_USD|\
    CLAUDE_FALLBACK_THRESHOLD_USD)
      SECRETS+=("$line")
      echo "  + $key"
      ;;
  esac
done < "$ENV_FILE"

if [[ ${#SECRETS[@]} -gt 0 ]]; then
  flyctl secrets set "${SECRETS[@]}" --app "$APP"
  echo "✓ Secrets set (machine will restart to apply them)"
else
  echo "  (no secrets found in $ENV_FILE)"
fi

# ─── Deploy ───────────────────────────────────────────────────────────────────

echo ""
echo "▸ Deploying to Fly.io (this builds the Docker image on Fly's servers)..."
flyctl deploy --app "$APP" --remote-only

echo ""
echo "✓ Deployed!"
echo "  App:  https://$APP.fly.dev"
echo "  Logs: fly logs --app $APP"
echo "  SSH:  fly ssh console --app $APP"
