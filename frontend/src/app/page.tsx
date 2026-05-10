'use client';

import { motion } from 'framer-motion';
import { Activity, Brain, Mic, Shield, Wallet, ChevronRight, ArrowRight, Zap, Target, Lock, Globe } from 'lucide-react';
import Image from 'next/image';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#020617]/40 backdrop-blur-xl border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="relative w-32 h-10 md:w-48 md:h-16">
            <Image 
              src="/logo.png" 
              alt="Baseline Logo" 
              fill
              sizes="(max-width: 768px) 128px, 192px"
              priority
              className="object-contain filter drop-shadow-[0_0_20px_rgba(37,99,235,0.6)]"
            />
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'How it Works', 'Technology', 'Network'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              whileHover={{ y: -2 }}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
        >
          Launch App
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Live on Solana Devnet
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black leading-[0.9] mb-8 tracking-tighter">
              Hear the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-violet-400 to-indigo-500">
                Baseline
              </span> <br />
              of your health.
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              The world's first AI-powered health intelligence platform detecting early functional drift through multimodal biometric signals. Secure. On-chain. Predictive.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center gap-3 group shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              >
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-sm">
                View Protocol
              </button>
            </div>

            <div className="mt-16 flex items-center gap-8 grayscale opacity-40">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Trusted Infrastructure</span>
              <div className="h-px w-12 bg-white/10" />
              <Globe className="w-5 h-5" />
              <Lock className="w-5 h-5" />
              <Zap className="w-5 h-5" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative glass-panel p-2 rounded-4xl overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 via-transparent to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="aspect-square md:aspect-4/5 bg-slate-900/50 rounded-[1.8rem] overflow-hidden border border-white/5 relative">
                <Image
                  src="/product_demo_preview.png"
                  alt="Baseline Interface"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-cover opacity-90 scale-125 group-hover:scale-135 transition-transform duration-[2s] ease-out"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Latency', value: '< 100ms' },
              { label: 'Precision', value: '99.9%' },
              { label: 'Blockchain', value: 'Solana' },
              { label: 'Storage', value: 'IPFS' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-black mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            {...fadeIn}
            className="relative"
          >
            <h2 className="text-5xl font-bold mb-8">The Healthcare Gap.</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Traditional healthcare is reactive. We wait for symptoms to appear before seeking help. By then, functional drift has already occurred.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Reactive Monitoring', desc: 'Symptoms are addressed after they become disruptive.' },
                { title: 'Data Silos', desc: 'Your health data is owned by corporations, not you.' },
                { title: 'Fragmented Insights', desc: 'No unified view of multimodal health signals.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-12 glass-panel border-blue-500/20 relative"
          >
            <div className="absolute inset-0 bg-blue-600/5 -z-10" />
            <div className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-10">The Baseline Solution</div>
            <h3 className="text-4xl font-bold mb-12 italic">Proactive. Predictive. Private.</h3>
            <div className="space-y-12">
              <div className="flex gap-6">
                <Target className="w-10 h-10 text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Early Detection</h4>
                  <p className="text-gray-400 text-sm">Identifying subtle shifts in voice, motor, and cognitive signals before they become symptoms.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Shield className="w-10 h-10 text-violet-500 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Full Sovereignty</h4>
                  <p className="text-gray-400 text-sm">Your biometric metadata is encrypted and anchored to your Solana wallet. You own the keys.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          {...fadeIn}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-black mb-6">Multimodal Intelligence</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our platform aggregates four unique signal layers to build your comprehensive health baseline.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: Mic, title: 'Voice Analysis', desc: 'Vocal biomarkers detect neurological changes through deep-learning signal processing.', color: 'blue' },
            { icon: Activity, title: 'Motor Sync', desc: 'Sub-millisecond tap reaction analysis to measure cognitive-to-motor synchronization.', color: 'violet' },
            { icon: Brain, title: 'Cognition', desc: 'Proprietary pattern-mismatch scoring to detect early changes in mental agility.', color: 'indigo' },
            { icon: Shield, title: 'On-chain Metadata', desc: 'Secure health logs anchored to Solana, ensuring immutability and verifiable ownership.', color: 'emerald' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="glass-panel p-10 group border-white/5 hover:border-blue-500/30 transition-all bg-linear-to-b from-white/3 to-transparent"
            >
              <div className={`w-14 h-14 bg-${feature.color}-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-${feature.color}-600/20 transition-colors`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}-500`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 bg-white/1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">60 Seconds to Clarity</h2>
            <p className="text-gray-400">The Baseline check-in is designed to be seamless, fast, and secure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {[
              { step: '01', title: 'Signal Extraction', desc: 'Complete our multimodal scan covering vocal, motor, and cognitive responses.' },
              { step: '02', title: 'AI Drift Engine', desc: 'Our neural networks compare your current signals against your established baseline.' },
              { step: '03', title: 'Secure Anchoring', desc: 'Results are encrypted, stored on IPFS, and the hash is anchored to Solana.' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:border-blue-500/50 transition-colors shadow-2xl relative z-10">
                  <span className="text-2xl font-black text-blue-500">{step.step}</span>
                </div>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-gray-400 text-sm px-6">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Web3 CTA */}
      <section className="py-24 md:py-44 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto glass-panel p-10 md:p-20 text-center relative"
        >
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] -z-10 rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-600/10 blur-[120px] -z-10 rounded-full" />

          <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-600 to-violet-600 rounded-4xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(37,99,235,0.4)]">
            <Wallet className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-tight">Your Health. Your Data. <br /> Your Keys.</h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Baseline leverages the speed of Solana and the permanence of IPFS to ensure you never have to trade privacy for health insights.
          </p>

          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-10 py-5 md:px-14 md:py-6 bg-blue-600 hover:bg-blue-500 rounded-3xl font-black text-base md:text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.5)] active:scale-95"
          >
            Connect Wallet & Enter
          </button>

          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
            <span>End-to-End Encrypted</span>
            <span className="hidden md:inline text-gray-800">•</span>
            <span>Decentralized Storage</span>
            <span className="hidden md:inline text-gray-800">•</span>
            <span>Predictive AI</span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold tracking-tight">Baseline</span>
          </div>
          <div className="flex gap-10 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
          <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            © 2024 Baseline Protocol. Built on Solana.
          </div>
        </div>
      </footer>
    </main>
  );
}
