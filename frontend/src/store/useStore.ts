import { create } from 'zustand';

interface ScanState {
  voiceDone: boolean;
  motorDone: boolean;
  cognitiveDone: boolean;
  faceDone: boolean;
  currentStep: 'voice' | 'motor' | 'cognitive' | 'face' | 'result';
  scanData: {
    voiceBlob: Blob | null;
    motorTimings: number[];
    cognitiveScore: number;
    faceCapture: string | null; // base64 image or similar
  };
  lastResult: any | null;
  setStep: (step: any) => void;
  markDone: (step: string, data?: any) => void;
  resetScan: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
  voiceDone: false,
  motorDone: false,
  cognitiveDone: false,
  faceDone: false,
  currentStep: 'voice',
  scanData: {
    voiceBlob: null,
    motorTimings: [],
    cognitiveScore: 0,
    faceCapture: null,
  },
  lastResult: null,
  setStep: (step) => set({ currentStep: step }),
  markDone: (step, data) => set((state) => ({ 
    ...state, 
    [`${step}Done`]: true,
    scanData: { ...state.scanData, ...data }
  })),
  resetScan: () => set({
    voiceDone: false,
    motorDone: false,
    cognitiveDone: false,
    faceDone: false,
    currentStep: 'voice',
    scanData: {
      voiceBlob: null,
      motorTimings: [],
      cognitiveScore: 0,
      faceCapture: null,
    },
    lastResult: null
  }),
}));

interface AuthState {
  connected: boolean;
  walletAddress: string | null;
  token: string | null;
  setConnected: (connected: boolean, address: string | null, token?: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  connected: false,
  walletAddress: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('baseline_token') : null,
  setConnected: (connected, address, token = null) => {
    if (token) localStorage.setItem('baseline_token', token);
    set({ connected, walletAddress: address, token });
  },
  logout: () => {
    localStorage.removeItem('baseline_token');
    set({ connected: false, walletAddress: null, token: null });
  },
}));
