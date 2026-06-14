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

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# standalone output + static assets
COPY --from=builder /app/public                            ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

# writable data dir for cost tracker + prediction cache
RUN mkdir -p data/predictions && chown -R nextjs:nodejs data

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# standalone output exposes a minimal node server
CMD ["node", "server.js"]
