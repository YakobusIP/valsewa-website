# Use the official lightweight Node.js 23 image.
FROM node:23-slim

# Install prisma dependencies
RUN apt-get update -y && apt-get install -y openssl

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package.json package-lock.lock tsconfig.json ./

# Copy local code to the container image.
COPY src/ ./src/

# Copy prisma setup to the container image.
COPY prisma ./prisma/

# Install dependencies.
RUN npm install