import React, { useEffect, useState, useRef } from "react";
import "./CustomCursor.css";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "project" | "email" | "skills">("default");
  const [hidden, setHidden] = useState(true);
  
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setHidden(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    const updatePosition = () => {
      const easeRing = 0.15;
      const easeDot = 0.8;
      
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * easeRing;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * easeRing;
      
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * easeDot;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * easeDot;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    // Event listeners to handle custom states
    const addHoverEvents = () => {
      // General interactable hover
      const interactables = document.querySelectorAll(
        "a, button, [role='button'], .clickable, .magnetic-btn"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });

      // Project visual hover
      const projects = document.querySelectorAll(".project-visual-container");
      projects.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursorType("project");
          setIsHovered(true);
        });
        el.addEventListener("mouseleave", () => {
          setCursorType("default");
          setIsHovered(false);
        });
      });

      // Email links hover
      const emails = document.querySelectorAll("a[href^='mailto:'], .contact-card[onClick], .email-trigger");
      emails.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursorType("email");
          setIsHovered(true);
        });
        el.addEventListener("mouseleave", () => {
          setCursorType("default");
          setIsHovered(false);
        });
      });

      // Skills constellation hover
      const skillsConst = document.querySelectorAll(".constellation-container");
      skillsConst.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursorType("skills");
          setIsHovered(true);
        });
        el.addEventListener("mouseleave", () => {
          setCursorType("default");
          setIsHovered(false);
        });
      });
    };

    const observer = new MutationObserver(() => {
      addHoverEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverEvents();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isHovered ? "hovered" : ""} cursor-type-${cursorType}`}
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""} cursor-type-${cursorType}`}
      >
        {cursorType === "project" && <span className="cursor-text">VIEW →</span>}
        {cursorType === "email" && <span className="cursor-text">EMAIL →</span>}
        {cursorType === "skills" && <span className="cursor-text">EXPLORE</span>}
      </div>
    </>
  );
};
export default CustomCursor;
