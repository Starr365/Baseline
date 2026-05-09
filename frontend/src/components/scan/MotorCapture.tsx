'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

interface Props {
  onComplete: (timings: number[]) => void;
}

export function MotorCapture({ onComplete }: Props) {
  const [targetVisible, setTargetVisible] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timings, setTimings] = useState<number[]>([]);
  const [tapsRemaining, setTapsRemaining] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && tapsRemaining > 0) {
      const delay = Math.random() * 2000 + 1000;
      const timeout = setTimeout(() => {
        setTargetVisible(true);
        setStartTime(performance.now());
      }, delay);
      return () => clearTimeout(timeout);
    } else if (gameStarted && tapsRemaining === 0) {
      onComplete(timings);
    }
  }, [gameStarted, tapsRemaining]);

  const handleTap = () => {
    if (targetVisible) {
      const endTime = performance.now();
      const reactionTime = endTime - startTime;
      setTimings([...timings, reactionTime]);
      setTargetVisible(false);
      setTapsRemaining(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[300px]">
      {!gameStarted ? (
        <div className="text-center">
          <div className="w-20 h-20 bg-violet-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-500/20">
             <Activity className="w-10 h-10 text-violet-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Motor Response Test</h2>
          <p className="text-slate-400 mb-8 max-w-xs">Tap the button as fast as you can when it turns <span className="text-green-400">green</span>.</p>
          <button 
            onClick={() => setGameStarted(true)}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-bold transition-all"
          >
            Start Test
          </button>
        </div>
      ) : (
        <div className="relative w-full h-64 flex items-center justify-center">
           <div className="absolute top-0 left-0 text-xs font-mono text-slate-500">
             Taps Remaining: {tapsRemaining}
           </div>
           
           <AnimatePresence>
             {targetVisible && (
               <motion.button
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0, opacity: 0 }}
                 onClick={handleTap}
                 className="w-32 h-32 bg-green-500 rounded-full shadow-[0_0_40px_rgba(34,197,94,0.6)] cursor-pointer active:scale-95 transition-transform"
               />
             )}
           </AnimatePresence>

           {!targetVisible && tapsRemaining > 0 && (
             <div className="text-slate-500 text-sm animate-pulse">Wait for it...</div>
           )}
        </div>
      )}
    </div>
  );
}
