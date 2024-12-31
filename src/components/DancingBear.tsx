import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import bearAnimation from '../assets/bear-dance.json';

interface Props {
  onClose: () => void;
}

export default function DancingBear({ onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any = null;
    
    if (typeof window !== 'undefined' && containerRef.current) {
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: bearAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-black/80 p-8 rounded-xl">
      <div 
        ref={containerRef} 
        className="w-64 h-64"
      />
      <h2 className="text-3xl font-bold text-white mt-4 animate-bounce">
        ¡Congratulations! 🎉
      </h2>
      <p className="text-xl text-white/80 mt-4 text-center max-w-md">
        Keep registering your tasks and continue with your journey
      </p>
      <button
        onClick={() => onClose()}
        className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}