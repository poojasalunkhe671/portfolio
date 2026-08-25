import React, { useEffect, useState } from "react";
import "./Intro.css";

interface IntroProps {
  onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const duration = 1200; // 1.2s total count duration
    const intervalTime = 12; // Update every 12ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, Math.floor((currentStep / totalSteps) * 100));
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 150); // slight pause at 100%
      }
    }, intervalTime);

    // Escape key skips loading
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(timer);
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div className="intro-container" role="dialog" aria-modal="true" aria-label="Loading Workspace">
      <div className="cyber-grid"></div>
      
      <div className="intro-loader-content">
        <div className="intro-branding-sub">POOJA SALUNKHE // WORKSPACE</div>
        
        <div className="intro-progress-display">
          <span className="progress-number">{formattedProgress}</span>
          <span className="progress-total">/ 100</span>
        </div>
        
        <div className="intro-bar-outer">
          <div 
            className="intro-bar-inner" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <span className="intro-skip-prompt">PRESS [ESC] TO SKIP</span>
      </div>
    </div>
  );
};
export default Intro;
