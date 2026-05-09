'use client';

import { motion } from 'framer-motion';
import { Activity, Brain, Mic, Shield, Wallet, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#020617]/50 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Baseline</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it Works</a>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] -z-10 rounded-full" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Web3 Health Intelligence
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              Hear the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Baseline</span> of your health.
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-xl">
              Detect early health drift using multimodal biometric signals. Securely store your data on Solana with full ownership and privacy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all flex items-center gap-2 group"
              >
                Launch Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all">
                Read Whitepaper
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-panel p-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-50" />
              {/* Using generated image placeholder - replaced by actual path later or just descriptive */}
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-12 h-12 text-blue-500/20 animate-pulse" />
                 </div>
                 <Image 
                   src="/product_demo_preview.png" 
                   alt="Product Demo Preview" 
                   fill 
                   priority
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                   className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-4">
                   <div className="text-xs text-gray-500">Scan Frequency: <span className="text-white">Daily</span></div>
                   <div className="text-xs text-gray-500">Network: <span className="text-blue-400 font-mono">Solana Devnet</span></div>
                </div>
                <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] rounded uppercase tracking-wider">Secure</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Multi-modal Intelligence</h2>
          <p className="text-gray-400">Four layers of signal detection for absolute precision.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Mic, title: 'Voice Signal', desc: 'Vocal biomarkers detect neurological changes.' },
            { icon: Activity, title: 'Motor Sync', desc: 'Tap reaction analysis for cognitive drift.' },
            { icon: Brain, title: 'Cognition', desc: 'Mini-games scoring mental agility.' },
            { icon: Shield, title: 'On-chain Security', desc: 'Metadata anchored on Solana devnet.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 group border-white/5 hover:border-blue-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                <feature.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Web3 CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-panel p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[80px] -z-10" />
          <Wallet className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Take Ownership of Your Data</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Baseline never stores your biometric data on our servers. Your identity is your wallet, and your health signals are yours alone.
          </p>
          <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            Connect Phantom Wallet
          </button>
        </div>
      </section>
    </main>
  );
}
