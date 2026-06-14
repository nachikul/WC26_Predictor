# ─────────────────────────────────────────────────────────────────────────────
# WC 2026 AI Predictor — Dockerfile
#
# Stages:
#   base      shared Alpine + libc compat
#   deps      npm ci (cached layer)
#   dev       hot-reload dev server  →  ./docker.sh dev
#   builder   next build             (intermediate, not pushed)
#   runner    optimised production   →  ./docker.sh prod
# ─────────────────────────────────────────────────────────────────────────────

# ─── Base ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app
# needed for some native Node deps on Alpine
RUN apk add --no-cache libc6-compat

# ─── Deps (cached unless package.json changes) ────────────────────────────────
FROM base AS deps
COPY package.json ./
RUN npm install

# ─── Dev (hot reload, src mounted as volume) ──────────────────────────────────
FROM base AS dev
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p data/predictions
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["npm", "run", "dev"]

# ─── Builder ──────────────────────────────────────────────────────────────────
FROM base AS builder
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─── Runner (production, standalone output) ───────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# standalone output + static assets
COPY --from=builder /app/public          ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static    ./.next/static

# entrypoint re-creates data dirs at runtime (Fly.io volume mount replaces /app/data)
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Fly.io expects apps to listen on 0.0.0.0:8080
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
CMD ["./docker-entrypoint.sh"]
