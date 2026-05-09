'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

export function CognitiveCapture({ onComplete }: Props) {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [oddOneOut, setOddOneOut] = useState<number>(0);
  const totalRounds = 5;

  const generateRound = () => {
    const symbols = ['◈', '◇', '⬘', '⬙', '⬚', '⬔', '⬕'];
    const base = symbols[Math.floor(Math.random() * symbols.length)];
    let odd = base;
    while (odd === base) {
      odd = symbols[Math.floor(Math.random() * symbols.length)];
    }
    
    const newPatterns = Array(9).fill(base);
    const oddIndex = Math.floor(Math.random() * 9);
    newPatterns[oddIndex] = odd;
    
    setPatterns(newPatterns);
    setOddOneOut(oddIndex);
    setStartTime(performance.now());
  };

  useEffect(() => {
    if (currentRound < totalRounds) {
      generateRound();
    } else {
      onComplete(score);
    }
  }, [currentRound]);

  const handleChoice = (index: number) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (index === oddOneOut) {
      // Correct: higher score for faster response
      const points = Math.max(10, Math.floor(10000 / duration));
      setScore(prev => prev + points);
    }
    
    setCurrentRound(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-8 px-4">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Round {currentRound + 1}/{totalRounds}</span>
        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Score: {score}</span>
      </div>

      <h2 className="text-2xl font-bold mb-8">Identify the Odd One Out</h2>

      <div className="grid grid-cols-3 gap-4">
        {patterns.map((symbol, i) => (
          <motion.button
            key={`${currentRound}-${i}`}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChoice(i)}
            className="w-20 h-20 glass-panel flex items-center justify-center text-3xl border border-white/10 rounded-2xl"
          >
            {symbol}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
