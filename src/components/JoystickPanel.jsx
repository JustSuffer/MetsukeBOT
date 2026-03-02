import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Crosshair } from 'lucide-react';

const JoystickPanel = ({ onCommand }) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  
  const handleMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Max radius for joystick
    const maxR = rect.width / 2 - 32; 
    let dx = clientX - centerX;
    let dy = clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxR) {
      dx = (dx / distance) * maxR;
      dy = (dy / distance) * maxR;
    }
    
    setPosition({ x: dx, y: dy });
    
    // Calculate direction and speed
    const normalizedSpeed = Math.round((distance / maxR) * 255);
    const speed = Math.min(255, normalizedSpeed);
    
    // Determine dir
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    let dir = 'stop';
    if (distance > maxR * 0.2) {
      if (angle >= -45 && angle <= 45) dir = 'right';
      else if (angle > 45 && angle < 135) dir = 'backward';
      else if (angle >= 135 || angle <= -135) dir = 'left';
      else if (angle < -45 && angle > -135) dir = 'forward';
    }
    
    onCommand({ type: 'move', dir, speed });
  };
  
  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };
  
  const handlePointerMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };
  
  const handlePointerUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    onCommand({ type: 'move', dir: 'stop', speed: 0 });
  };

  return (
    <div className="border border-gothic-grey/30 bg-deep-black/60 p-6 rounded-lg backdrop-blur flex-1 min-h-[350px] flex flex-col items-center">
      <h2 className="w-full text-sm text-gothic-grey tracking-[0.2em] border-b border-gothic-grey/30 pb-2 mb-8 cyberpunk-text uppercase flex items-center gap-2">
         <Crosshair size={16} />
         {t('joystick_panel')}
      </h2>
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-56 h-56 border-2 border-metal-blue/30 rounded-full flex items-center justify-center relative touch-none shadow-[inset_0_0_50px_rgba(30,58,138,0.2)] bg-deep-black/50"
      >
         {/* Axis lines */}
         <div className="absolute w-full h-[1px] bg-metal-blue/20"></div>
         <div className="absolute h-full w-[1px] bg-metal-blue/20"></div>
         <div className="absolute w-3/4 h-3/4 border border-metal-blue/10 rounded-full"></div>
         <div className="absolute w-1/2 h-1/2 border border-metal-blue/5 rounded-full"></div>
         
         {/* Knob */}
         <div 
           className="w-16 h-16 bg-metal-blue/80 backdrop-blur rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-monster-white/20 transition-transform duration-75 cursor-grab active:cursor-grabbing hover:bg-metal-blue flex items-center justify-center"
           style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
         >
           <div className="w-6 h-6 rounded-full border border-deep-black/30"></div>
         </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-2 text-[10px] font-mono tracking-widest text-gothic-grey uppercase opacity-50">
         <div>X: {Math.round(position.x)}</div>
         <div>Y: {Math.round(position.y)}</div>
      </div>
    </div>
  );
};

export default JoystickPanel;
