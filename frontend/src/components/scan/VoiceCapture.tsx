'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Loader2 } from 'lucide-react';

interface Props {
  onComplete: (blob: Blob) => void;
}

export function VoiceCapture({ onComplete }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      let seconds = 10;
      timerRef.current = setInterval(() => {
        seconds -= 1;
        setTimeLeft(seconds);
        if (seconds <= 0) {
          stopRecording();
        }
      }, 1000);

    } catch (err) {
      console.error('Mic access denied:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-8">
        <motion.div 
          animate={isRecording ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${isRecording ? 'border-red-500 bg-red-500/10' : 'border-blue-500/30 bg-blue-500/5'}`}
        >
          <Mic className={`w-12 h-12 ${isRecording ? 'text-red-500' : 'text-blue-500'}`} />
        </motion.div>
        
        {isRecording && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
            REC {timeLeft}s
          </div>
        )}
      </div>

      <p className="text-slate-400 mb-8 italic text-sm">"The quick brown fox jumps over the lazy dog."</p>

      {!isRecording ? (
        <button 
          onClick={startRecording}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          Start Recording
        </button>
      ) : (
        <button 
          onClick={stopRecording}
          className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <Square className="w-4 h-4 fill-current" /> Stop Now
        </button>
      )}
    </div>
  );
}
