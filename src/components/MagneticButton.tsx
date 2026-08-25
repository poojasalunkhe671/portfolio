import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - btnX;
      const distanceY = e.clientY - btnY;
      
      const distance = Math.hypot(distanceX, distanceY);
      
      // Attraction radius
      const activeRadius = 60;
      
      if (distance < activeRadius) {
        // Pull the button towards the cursor (with factor 0.35)
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
      } else {
        // Return to normal
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (btn) btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none"
      }}
      {...props}
    >
      {children}
    </button>
  );
};
export default MagneticButton;
