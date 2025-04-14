
import React, { useEffect } from 'react';

const BackgroundEffect: React.FC = () => {
  useEffect(() => {
    const createBubble = () => {
      const section = document.querySelector('.bubble-container') as HTMLElement;
      if (!section) return;
      
      const bubble = document.createElement('span');
      const size = Math.random() * 60 + 20;
      const left = Math.random() * window.innerWidth;
      
      bubble.className = 'bubble';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}px`;
      bubble.style.animationDuration = `${Math.random() * 4 + 8}s`;
      
      section.appendChild(bubble);
      
      setTimeout(() => {
        bubble.remove();
      }, 12000);
    };
    
    const interval = setInterval(createBubble, 800);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bubble-container fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Bubbles will be added here dynamically */}
    </div>
  );
};

export default BackgroundEffect;
