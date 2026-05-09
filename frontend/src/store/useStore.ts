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
    }
  }),
}));

interface AuthState {
  connected: boolean;
  walletAddress: string | null;
  setConnected: (connected: boolean, address: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  connected: false,
  walletAddress: null,
  setConnected: (connected, address) => set({ connected, walletAddress: address }),
}));
