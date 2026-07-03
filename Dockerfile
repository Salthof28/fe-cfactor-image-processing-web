# Stage 1: Base image
FROM node:22-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Stage 3: Build Next.js project
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 4: Runner produksi
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["npm", "start"]
