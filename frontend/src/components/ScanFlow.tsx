'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Activity, Brain, Scan, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { useScanStore } from '../store/useStore';

const steps = [
  { id: 'voice', title: 'Voice Analysis', icon: Mic, description: 'Speak the phrase: "The quick brown fox jumps over the lazy dog."' },
  { id: 'motor', title: 'Tap Reaction', icon: Activity, description: 'Tap the button as quickly as possible when it turns green.' },
  { id: 'cognitive', title: 'Cognitive Score', icon: Brain, description: 'Quickly identify the mismatched pattern in the sequence.' },
  { id: 'face', title: 'Facial Mesh', icon: Scan, description: 'Align your face within the frame and follow the light.' }
];

export function ScanFlow() {
  const { currentStep, setStep, markDone } = useScanStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  useEffect(() => {
    if (progress === 100) {
      setIsProcessing(false);
      setProgress(0);
      const currentIndex = steps.findIndex(s => s.id === currentStep);
      if (currentIndex < steps.length - 1) {
        setStep(steps[currentIndex + 1].id);
      } else {
        setStep('result');
      }
    }
  }, [progress, currentStep, setStep]);

  const handleStartStep = () => {
    setIsProcessing(true);
    markDone(currentStep);
  };

  if (currentStep === 'result') {
    return <ScanResult />;
  }

  const stepData = steps.find(s => s.id === currentStep) || steps[0];
  const StepIcon = stepData.icon;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="flex justify-between mb-12">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              currentStep === s.id ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 
              steps.findIndex(step => step.id === currentStep) > i ? 'border-green-500 bg-green-500 text-white' : 'border-white/10 text-white/20'
            }`}>
              {steps.findIndex(step => step.id === currentStep) > i ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStep === s.id ? 'text-blue-400' : 'text-slate-600'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
            <StepIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{stepData.title}</h2>
          <p className="text-slate-400 mb-10 max-w-sm mx-auto">{stepData.description}</p>

          {isProcessing ? (
            <div className="space-y-6">
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  />
               </div>
               <div className="flex items-center justify-center gap-2 text-blue-400 font-mono text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  ANALYZING SIGNALS... {progress}%
               </div>
            </div>
          ) : (
            <button 
              onClick={handleStartStep}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center gap-2 mx-auto"
            >
              Start Analysis <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ScanResult() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto py-12"
    >
      <div className="glass-card p-12 text-center mb-8 bg-linear-to-br from-blue-600/10 to-transparent">
         <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
            <CheckCircle2 className="w-12 h-12 text-white" />
         </div>
         <h1 className="text-4xl font-bold mb-2">Scan Complete</h1>
         <p className="text-slate-400 mb-8">Your health drift metadata has been processed and anchored on Solana.</p>
         
         <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="glass-card p-6 bg-white/5 text-left">
               <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Health Drift Score</div>
               <div className="text-5xl font-bold text-white">87</div>
               <div className="text-green-400 text-xs mt-2 font-bold uppercase tracking-tighter">Category: Normal</div>
            </div>
            <div className="glass-card p-6 bg-white/5 text-left">
               <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Solana Transaction</div>
               <div className="text-xs font-mono text-blue-400 break-all mb-2">5x9J...p8kL</div>
               <div className="text-slate-500 text-[10px] uppercase">Transaction Confirmed</div>
            </div>
         </div>
         
         <button 
           onClick={() => window.location.href = '/dashboard'}
           className="mt-12 px-8 py-3 border border-white/10 hover:bg-white/5 rounded-xl text-sm font-bold transition-all"
         >
            Return to Dashboard
         </button>
      </div>
    </motion.div>
  );
}
