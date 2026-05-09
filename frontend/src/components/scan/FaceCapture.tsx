'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scan, Camera, Loader2 } from 'lucide-react';

interface Props {
  onComplete: (base64Image: string) => void;
}

export function FaceCapture({ onComplete }: Props) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error('Camera access denied:', err);
      }
    }
    setupCamera();
    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const handleCapture = () => {
    setIsScanning(true);
    
    // Simulate mesh processing
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onComplete(dataUrl);
        setIsScanning(false);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-video bg-black rounded-3xl overflow-hidden border-2 border-white/10 mb-8">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover grayscale opacity-60"
        />
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute inset-0 border-[40px] border-black/40" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-blue-500/50 rounded-[3rem] box-content">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />
              
              {isScanning && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,1)] z-10"
                />
              )}
           </div>
        </div>

        {isScanning && (
          <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm flex items-center justify-center">
             <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <span className="text-white font-bold text-xs uppercase tracking-widest">Analyzing Mesh...</span>
             </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <button 
        onClick={handleCapture}
        disabled={isScanning || !stream}
        className="px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center gap-2"
      >
        <Camera className="w-5 h-5" /> Start Facial Scan
      </button>
    </div>
  );
}
