import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeUrl, afterUrl }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let x = 0;
    
    if ('touches' in e) {
      x = e.touches[0].pageX - rect.left;
    } else {
      x = e.pageX - rect.left;
    }
    
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-2xl cursor-col-resize select-none group bg-gray-200"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Always in background) */}
      <img 
        src={afterUrl} 
        alt="After Transformation" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* Before Image (Clipped overlay) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)` 
        }}
      >
        <img 
          src={beforeUrl} 
          alt="Before Transformation" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] pointer-events-none z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
          <div className="flex gap-1.5">
             <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
             <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Persistent Labels */}
      <div className="absolute bottom-6 left-6 z-20">
        <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-[0.2em] font-bold border border-white/10 shadow-lg">
          Original
        </div>
      </div>
      <div className="absolute bottom-6 right-6 z-20">
        <div className="bg-white/90 backdrop-blur-md text-black px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg">
          EPSAK
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
