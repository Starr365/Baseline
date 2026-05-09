import { create } from 'zustand';

interface ScanState {
  voiceDone: boolean;
  motorDone: boolean;
  cognitiveDone: boolean;
  faceDone: boolean;
  currentStep: 'voice' | 'motor' | 'cognitive' | 'face' | 'result';
  setStep: (step: any) => void;
  markDone: (step: string) => void;
  resetScan: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
  voiceDone: false,
  motorDone: false,
  cognitiveDone: false,
  faceDone: false,
  currentStep: 'voice',
  setStep: (step) => set({ currentStep: step }),
  markDone: (step) => set((state) => ({ ...state, [`${step}Done`]: true })),
  resetScan: () => set({
    voiceDone: false,
    motorDone: false,
    cognitiveDone: false,
    faceDone: false,
    currentStep: 'voice'
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
