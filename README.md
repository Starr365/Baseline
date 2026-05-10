# 🧠 Baseline | Web3 Health Intelligence

**Baseline** is an AI-powered predictive health intelligence platform that detects early health drift using multimodal biometric signals. By capturing subtle changes in voice, motor response, and cognition, Baseline builds a personal health baseline for each user and provides proactive insights—all while ensuring total data sovereignty through Solana and IPFS.

---

## 🚀 Vision
In the current reactive healthcare landscape, symptoms are often addressed only after they become disruptive. **Baseline** shifts the paradigm to **Proactive Healthcare**, detecting functional drift before it manifests as disease.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Styling**: TailwindCSS 4.0
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Web3**: Solana Wallet Adapter

### Backend
- **Runtime**: Node.js / Express
- **Auth**: JWT + Solana Signature Verification
- **Blockchain**: Solana Devnet (Anchor Program)
- **Storage**: IPFS (Pinata)
- **AI Service**: Python (FastAPI) + Scikit-learn/TensorFlow

---

## 🧬 Core Methodology

Baseline uses a **60-second multimodal check-in** to aggregate health signals across four key layers:

1.  **Vocal Biomarkers (30%)**: Deep-learning analysis of neurological vocal patterns.
2.  **Motor Synchronization (25%)**: Sub-millisecond tap reaction timing analysis.
3.  **Cognitive Agility (25%)**: Pattern-mismatch scoring to detect early mental drift.
4.  **Facial Mesh (20%)**: Symmetry and micro-movement analysis via camera stream.

---

## 📂 Project Structure

```text
baseline/
├── frontend/             # Next.js Unified Application
│   ├── src/app/          # Routes (Landing, Dashboard)
│   ├── src/components/   # Modular UI & Scan Flow
│   └── src/store/        # Zustand State (Auth, Scan)
├── backend/              # Express.js API Layer
│   ├── src/controllers/  # Business Logic
│   ├── src/services/     # IPFS, Solana, ElevenLabs Integrations
│   └── src/routes/       # API Endpoints
├── ai-service/           # Python FastAPI Scoring Engine
└── blockchain/           # Anchor-based Solana Program
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v20+)
- Python (3.10+)
- Solana CLI & Anchor (for blockchain module)

### 1. Backend Configuration
Create a `.env` in the `/backend` directory:
```env
PORT=5000
JWT_SECRET=your_secret
AI_SERVICE_URL=http://localhost:8000
PINATA_JWT=your_pinata_jwt
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_PROGRAM_ID=4tSkA5NcQAerpErKUukc3N9m5Mzyih9xLtyoskrsEsVu
SOLANA_WALLET_ADDRESS=3dJZtqPfF9KKLaC1VpWVj8ZBttJUBFQYEc3DnbzZQhux
ELEVENLABS_API_KEY=your_key
```

### 2. Frontend Configuration
Create a `.env.local` in the `/frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Running the System
```bash
# Start AI Service
cd ai-service && pip install -r requirements.txt && python main.py

# Start Backend
cd backend && npm install && npm run dev

# Start Frontend
cd frontend && npm install && npm run dev
```

---

## 🛡 Security & Privacy
- **Zero Raw Storage**: Raw biometric data (voice/video) is processed in-memory and never stored on central servers.
- **On-chain Anchoring**: Only encrypted metadata hashes are stored on IPFS and anchored to the Solana blockchain.
- **Sovereignty**: Users sign every scan with their wallet, maintaining absolute control over their health history.

## 📜 License
MIT License. Built for the future of decentralized healthcare.
