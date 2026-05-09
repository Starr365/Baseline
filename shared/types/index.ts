export type RiskCategory = 'Normal' | 'Mild drift' | 'Elevated risk' | 'Critical monitoring';

export interface HealthScanResult {
  id: string;
  timestamp: number;
  walletAddress: string;
  voiceScore: number;
  motorScore: number;
  cognitiveScore: number;
  faceScore: number;
  totalScore: number;
  riskCategory: RiskCategory;
  onChainTx?: string;
}

export interface ScanProgress {
  voice: boolean;
  motor: boolean;
  cognitive: boolean;
  face: boolean;
}
