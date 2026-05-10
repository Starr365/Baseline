'use client';

import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Activity, Brain, Mic, Scan, Shield, TrendingUp, History, LayoutDashboard, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScanFlow } from './ScanFlow';
import { ScanHistory } from './ScanHistory';
import { useScanStore, useAuthStore } from '../store/useStore';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

export function DashboardContent() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <DashboardMain />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function DashboardMain() {
  const { connected, publicKey } = useWallet();
  const { currentStep } = useScanStore();
  const [view, setView] = useState('dashboard');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!connected) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-12 text-center max-w-md w-full"
        >
          <div className="relative w-24 h-10 mx-auto mb-8">
            <Image 
              src="/logo.png" 
              alt="Baseline Logo" 
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-slate-400 mb-10">Access your health intelligence dashboard by connecting your Solana wallet.</p>
          <WalletMultiButton className="bg-blue-600! rounded-xl! h-14! w-full! text-sm! font-bold! hover:bg-blue-500! transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#020617] text-slate-50 pb-20 lg:pb-0">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex w-64 border-r border-white/5 bg-slate-900/50 p-6 flex-col gap-8">
        <div className="px-2 h-14 flex items-center">
          <div className="relative w-32 h-8">
            <Image 
              src="/logo.png" 
              alt="Baseline Logo" 
              fill
              className="object-contain object-left filter drop-shadow-[0_0_10px_rgba(37,99,235,0.3)]"
            />
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
          <NavItem icon={Scan} label="Health Scan" active={view === 'scan'} onClick={() => setView('scan')} />
          <NavItem icon={History} label="Scan History" active={view === 'history'} onClick={() => setView('history')} />
          <NavItem icon={Shield} label="Privacy & Consent" />
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <WalletMultiButton className="bg-blue-600! rounded-xl! h-12! w-full! text-sm! font-semibold! hover:bg-blue-500! transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]" />
          
          <button 
            onClick={() => {
              useAuthStore.getState().logout();
              window.location.href = '/';
            }}
            className="w-full py-3 rounded-xl border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center gap-2 group"
          >
            <History className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 ${view === 'dashboard' ? 'text-blue-500' : 'text-slate-500'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        <button onClick={() => setView('scan')} className={`flex flex-col items-center gap-1 ${view === 'scan' ? 'text-blue-500' : 'text-slate-500'}`}>
          <Scan className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Scan</span>
        </button>
        <button onClick={() => setView('history')} className={`flex flex-col items-center gap-1 ${view === 'history' ? 'text-blue-500' : 'text-slate-500'}`}>
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">History</span>
        </button>
        <button 
           onClick={() => {
             useAuthStore.getState().logout();
             window.location.href = '/';
           }}
           className="flex flex-col items-center gap-1 text-slate-500"
        >
          <Activity className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Logout</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {view === 'scan' ? 'Active Health Scan' : view === 'history' ? 'Scan History' : 'Health Intelligence'}
            </h1>
            <p className="text-slate-400 text-sm">
              {view === 'scan' ? 'Multimodal signal extraction in progress.' : view === 'history' ? 'Reviewing your historical biometric drift data.' : 'Monitoring your biometric drift in real-time.'}
            </p>
          </div>
          <div className="flex gap-4">
             <div className="glass-panel px-4 py-2 flex items-center gap-3 w-fit">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">System Live</span>
             </div>
          </div>
        </header>

        {view === 'scan' ? (
          <ScanFlow />
        ) : view === 'history' ? (
          <ScanHistory />
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Health Drift Score */}
              <section className="lg:col-span-2 glass-card p-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8">
                    <TrendingUp className="w-6 h-6 text-blue-500 opacity-50" />
                 </div>
                 <h2 className="text-xl font-bold mb-6">Health Drift Score</h2>
                 <div className="flex items-end gap-6 mb-8">
                    <div className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white to-slate-500">84</div>
                    <div className="mb-2">
                       <div className="text-green-400 text-sm font-bold flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" /> +2.4%
                       </div>
                       <div className="text-slate-500 text-xs uppercase tracking-widest font-medium">Optimal Range</div>
                    </div>
                 </div>
                 <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '84%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-linear-to-r from-blue-600 to-violet-500 rounded-full"
                    />
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-tighter font-bold text-slate-600">
                    <span>Critical</span>
                    <span>Elevated</span>
                    <span>Mild Drift</span>
                    <span className="text-blue-400">Optimal</span>
                 </div>
              </section>

              {/* Wallet Identity */}
              <section className="glass-card p-8 flex flex-col justify-center items-center text-center">
                 <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
                    <Shield className="w-8 h-8 text-blue-500" />
                 </div>
                 <h3 className="font-bold mb-2">Biometric Identity</h3>
                 <p className="text-xs text-slate-400 mb-6">Your health metadata is encrypted and anchored to your Solana wallet.</p>
                 <button className="text-blue-400 text-xs font-bold uppercase tracking-widest hover:text-blue-300 transition-colors">Manage Consent</button>
              </section>
            </div>

            {/* Signal Breakdown */}
            <section className="mt-8 grid md:grid-cols-4 gap-6">
               <SignalCard icon={Mic} label="Voice Biomarkers" value="Stable" score={92} color="text-blue-500" bgColor="bg-blue-500" />
               <SignalCard icon={Activity} label="Motor Response" value="Normal" score={78} color="text-violet-500" bgColor="bg-violet-500" />
               <SignalCard icon={Brain} label="Cognitive Load" value="Optimal" score={88} color="text-indigo-500" bgColor="bg-indigo-500" />
               <SignalCard icon={Scan} label="Facial Symmetry" value="Tracking" score={82} color="text-emerald-500" bgColor="bg-emerald-500" />
            </section>

            {/* Active Scan CTA */}
            <section className="mt-8 glass-card p-12 flex flex-col items-center justify-center border-dashed border-white/20 bg-blue-600/5 group hover:bg-blue-600/10 transition-all cursor-pointer" onClick={() => setView('scan')}>
               <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                  <Scan className="w-10 h-10 text-white" />
               </div>
               <h2 className="text-2xl font-bold mb-2">Start New Health Scan</h2>
               <p className="text-slate-400 max-w-md text-center">Execute a 60-second multimodal assessment to update your Health Drift Score.</p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function SignalCard({ icon: Icon, label, value, score, color, bgColor }: any) {
  return (
    <div className="glass-card p-6 border-white/5">
       <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${bgColor}/10`}>
             <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
       </div>
       <div className="flex justify-between items-end">
          <div className="text-xl font-bold">{value}</div>
          <div className="text-xs font-mono text-slate-500">{score}%</div>
       </div>
    </div>
  );
}
