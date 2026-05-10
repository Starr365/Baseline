'use client';

import React, { useEffect, useState } from 'react';
import api from '../api';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { History, ExternalLink, Shield, Database, Calendar, Activity } from 'lucide-react';

interface ScanRecord {
  id: string;
  totalScore: number;
  riskCategory: string;
  txSignature: string;
  ipfsHash: string;
  timestamp: number;
}

export function ScanHistory() {
  const { publicKey } = useWallet();
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!publicKey) return;
      try {
        const response = await api.get(`/api/scan/history?walletAddress=${publicKey.toBase58()}`);
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [publicKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-20 glass-panel">
        <History className="w-12 h-12 text-slate-700 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">No Scan History</h3>
        <p className="text-slate-500">You haven't performed any health scans yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {history.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                <div className="text-2xl font-black text-blue-400">{record.totalScore}</div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-lg">Health Scan #{record.id}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                    record.riskCategory === 'Optimal' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {record.riskCategory}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(record.timestamp).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> {new Date(record.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href={`https://explorer.solana.com/tx/${record.txSignature}?cluster=devnet`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-slate-300"
              >
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                Solana Proof
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <a 
                href={`https://gateway.pinata.cloud/ipfs/${record.ipfsHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-slate-300"
              >
                <Database className="w-3.5 h-3.5 text-violet-500" />
                IPFS Data
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
