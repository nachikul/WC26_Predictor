#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# WC 2026 AI Predictor — Docker helper
#
# Usage:
#   ./docker.sh dev         Build + run in development mode  (hot reload)
#   ./docker.sh prod        Build + run in production mode   (optimised)
#   ./docker.sh build-dev   Build dev image only
#   ./docker.sh build-prod  Build prod image only
#   ./docker.sh run-dev     Run pre-built dev image
#   ./docker.sh run-prod    Run pre-built prod image
#   ./docker.sh stop        Stop the running container
#   ./docker.sh logs        Tail container logs
#   ./docker.sh clean       Remove both images
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

COMMAND="${1:-help}"
DEV_IMAGE="wc26-predictor:dev"
PROD_IMAGE="wc26-predictor:prod"
CONTAINER="wc26-predictor"
ENV_FILE=".env.local"

# ─── Guards ───────────────────────────────────────────────────────────────────

check_docker() {
  if ! command -v docker &>/dev/null; then
    echo "✗ Docker not found. Install Docker Desktop: https://docs.docker.com/get-docker/"
    exit 1
  fi
}

check_env() {
  if [[ ! -f "$ENV_FILE" ]]; then
    echo "✗ $ENV_FILE not found — API keys must be in that file."
    exit 1
  fi
}

# ─── Build ────────────────────────────────────────────────────────────────────

build_dev() {
  echo "▸ Building dev image ($DEV_IMAGE)..."
  docker build --target dev -t "$DEV_IMAGE" . || { echo "✗ Build failed"; exit 1; }
  echo "✓ $DEV_IMAGE ready"
}

build_prod() {
  echo "▸ Building production image ($PROD_IMAGE) — this runs next build..."
  docker build --target runner -t "$PROD_IMAGE" . || { echo "✗ Build failed"; exit 1; }
  echo "✓ $PROD_IMAGE ready"
  echo "  Size: $(docker image inspect "$PROD_IMAGE" --format='{{.Size}}' | numfmt --to=iec 2>/dev/null || echo 'unknown')"
}

# ─── Run ──────────────────────────────────────────────────────────────────────

run_dev() {
  check_env
  echo "▸ Starting dev server → http://localhost:3000  (Ctrl-C to stop)"
  echo "  Hot reload: src/ and specs/ are volume-mounted."
  docker run --rm -i \
    --name "$CONTAINER" \
    -p 3000:3000 \
    --env-file "$ENV_FILE" \
    -v "$(pwd)/src:/app/src" \
    -v "$(pwd)/specs:/app/specs" \
    -v "$(pwd)/data:/app/data" \
    "$DEV_IMAGE"
}

run_prod() {
  check_env
  echo "▸ Starting production server → http://localhost:3000"
  docker run --rm -it \
    --name "$CONTAINER" \
    -p 3000:3000 \
    --env-file "$ENV_FILE" \
    -v "$(pwd)/data:/app/data" \
    "$PROD_IMAGE"
}

# ─── Helpers ──────────────────────────────────────────────────────────────────

stop_container() {
  if docker ps -q --filter "name=$CONTAINER" | grep -q .; then
    docker stop "$CONTAINER"
    echo "✓ Container stopped"
  else
    echo "No running container named $CONTAINER"
  fi
}

show_logs() {
  docker logs -f "$CONTAINER"
}

clean_images() {
  docker rmi "$DEV_IMAGE" "$PROD_IMAGE" 2>/dev/null && echo "✓ Images removed" || echo "No images to remove"
}

show_help() {
  grep -E '^#.*Usage:' -A 12 "$0" | sed 's/^# //' | sed 's/^#//'
  echo ""
  echo "Local (no Docker):"
  echo "   npm install && npm run dev"
}

# ─── Main ─────────────────────────────────────────────────────────────────────

check_docker

case "$COMMAND" in
  dev)        build_dev  && run_dev  ;;
  prod)       build_prod && run_prod ;;
  build-dev)  build_dev  ;;
  build-prod) build_prod ;;
  run-dev)    run_dev    ;;
  run-prod)   run_prod   ;;
  stop)       stop_container ;;
  logs)       show_logs  ;;
  clean)      clean_images ;;
  help|*)     show_help  ;;
esac
