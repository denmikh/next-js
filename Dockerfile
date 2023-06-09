FROM node:10.24.1 as base
LABEL description="Base image"
# Set timezone to NYC
ENV TZ=America/New_York
# Bypass the http://deb.debian.org/debian stretch stretch 404 error
RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list
# update apt-get index
RUN apt-get update \
    && apt-get install -y \
    # Install basic system dependencies
    bash \
    # Install system dependencies for git-sourced npm modules
    git \
    # Install system dependencies for gifsicle
    autoconf \
    automake \
    gcc \
    musl-dev \
    make \
    # Install system dependencies for optipng-bin
    zlib1g \
    zlib1g-dev \
    # Install system dependencies for image optimizers
    libpng-dev \
    libtool \
    nasm \
    # Install system dependencies for bcrypt
    build-essential \
    python
# bcrypt

WORKDIR /usr/src/shell
COPY package.json package-lock.json* ./
RUN npm install
# RUN CPPFLAGS="-DPNG_ARM_NEON_OPT=0" npm install imagemin-optipng --save-dev

# Dev stage
FROM base AS dev
LABEL description="Builds and launches a dev server"

COPY . .
CMD ["npm", "start"]

# Release stage
FROM base AS release
LABEL description="Builds and launches a release server"
# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
# Used during build to install Sentry CLI
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN $SENTRY_AUTH_TOKEN

COPY . .
RUN npm run buildprod
# Execute NodeJS (not NPM script) to handle SIGTERM and SIGINT signals.
CMD ["node", "backend/server.js"]
