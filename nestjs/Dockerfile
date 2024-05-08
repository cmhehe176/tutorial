# syntax=docker/dockerfile:1

# ========================
# Base
# ========================
FROM node:20-alpine AS base

WORKDIR /app

# ========================
# Development
# ========================
FROM base AS development

RUN set -eux; \
	\
	apk add --update --no-cache \
	git \
	build-base \
	; \
	corepack enable; \
	corepack prepare pnpm@latest-8 --activate; \
	pnpm config set store-dir /tmp/pnpm-store

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-cache,target=/tmp/pnpm-store \
	pnpm install --frozen-lockfile

# ========================
# Build
# ========================
FROM development AS build

ENV NODE_ENV=production

COPY --chown=node:node . ./
RUN set -eux; \
	\
	pnpm run build

RUN --mount=type=cache,id=pnpm-cache,target=/tmp/pnpm-store \
	pnpm install --frozen-lockfile --production

# ========================
# Production
# ========================
FROM base AS production

ENV NODE_ENV=production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD ["node", "dist/src/main"]

# ========================
# Production build with CI
# ========================
FROM base AS prod-ci

ENV NODE_ENV=production

COPY --chown=node:node ./node_modules ./node_modules
COPY --chown=node:node ./dist ./dist

CMD ["node", "dist/src/main"]
