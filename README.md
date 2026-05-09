# Baseline

Baseline is a full-stack Web3 health intelligence platform that detects early health drift using multimodal human signals (voice, touch, facial movement, and cognition) and stores consented biometric metadata on-chain using Solana.

## Project Structure

- `frontend/landing`: Next.js landing page (SEO & Marketing)
- `frontend/dashboard`: React (Vite) dashboard for health scans
- `backend`: Node.js/Express REST API
- `ai-service`: Python (FastAPI) for signal processing
- `blockchain`: Solana Anchor programs
- `shared`: Common types and constants

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion, Zustand, TanStack Query
- **Backend**: Node.js, Express.js
- **AI**: Python, FastAPI
- **Blockchain**: Solana, Anchor Framework, Phantom Wallet

## Quick Start

1. Install dependencies:
   ```bash
   npm run install:all
   ```

2. Start the development environment:
   ```bash
   npm run dev
   ```

This will concurrently start:
- Landing page on `http://localhost:3000`
- Dashboard on `http://localhost:5173`
- Backend on `http://localhost:5000`
- AI Service on `http://localhost:8000`

## Features

- **60-Second Health Scan**: Multimodal assessment (Voice, Motor, Cognitive, Face).
- **Health Drift Engine**: Weighted scoring system to detect subtle health changes.
- **Web3 Privacy**: Data ownership anchored on Solana.
- **Cinematic UI**: Premium dark-mode dashboard with glassmorphism.
# Baseline
