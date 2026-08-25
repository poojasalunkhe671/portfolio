import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./RadialStack.css";

interface RadialSkill {
  name: string;
  category: string;
  description: string;
}

const radialSkills: RadialSkill[] = [
  // Inner Ring
  { name: "React JS", category: "inner", description: "Used to develop the student dashboard, live classrooms, and custom interfaces for the Learning Management System." },
  { name: "JavaScript", category: "inner", description: "Core language powering all interactive pages, OpenStreetMap calculations, and dynamic client layouts." },
  { name: "PHP", category: "inner", description: "Backend development language used to build the LMS, Admin Dashboards, and E-commerce products." },
  { name: "HTML", category: "inner", description: "Structured semantic frameworks implemented across all internship pages and web system projects." },
  { name: "CSS", category: "inner", description: "Structured styling and responsive grid rules applied to optimize layout rendering and accessibility." },

  // Outer Ring
  { name: "MySQL", category: "outer", description: "Database engine used to store system states, user CRUD records, transactions, and points ledgers." },
  { name: "Firebase", category: "outer", description: "Cloud database platform utilized for real-time authentication and cloud-hosted data structures." },
  { name: "WordPress", category: "outer", description: "CMS platform for editing templates, setting up sites, and building administrative plugins." },
  { name: "CodeIgniter", category: "outer", description: "PHP MVC Framework used to structure the Loyalty System's database adapters and endpoints." },
  { name: "Shopify", category: "outer", description: "E-commerce platform utilized to customize storefront listings, templates, and basic layouts." },
  { name: "API Dev", category: "outer", description: "Created RESTful database integrations, system connectors, and AJAX endpoints." },
  { name: "Capacitor", category: "outer", description: "Cross-platform mobile wrapper used to compile web features and deploy GPS location features." },
  { name: "Git & GitHub", category: "outer", description: "Version control platform used to organize branches, track commits, and manage repositories." },
  { name: "Bootstrap", category: "outer", description: "Responsive CSS grid library applied to build fast administrative grids and layouts." }
];

interface RadialStackProps {
  onClose: () => void;
}

export const RadialStack: React.FC<RadialStackProps> = ({ onClose }) => {
  const [selectedSkill, setSelectedSkill] = useState<RadialSkill | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef<number>(0);

  // Slow automated rotation loop
  useEffect(() => {
    const animate = () => {
      setRotation((prev) => (prev + 0.12) % 360);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Track mouse coordinates for parallax tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.04;
      const y = (e.clientY - window.innerHeight / 2) * 0.04;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Escape key closes dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const innerSkills = radialSkills.filter((s) => s.category === "inner");
  const outerSkills = radialSkills.filter((s) => s.category === "outer");

  return (
    <div 
      className="radial-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="radial-title"
    >
      <button 
        className="radial-close-btn clickable" 
        onClick={onClose}
        aria-label="Close stack explorer"
      >
        <X size={20} />
      </button>

      <div className="radial-header">
        <h2 id="radial-title" className="radial-title">Stack Orbit Explorer</h2>
        <p className="radial-desc">Interactive model of Technologies & Tools based on your Projects</p>
      </div>

      <div 
        className="orbital-system-container"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) rotateX(${-mouseOffset.y * 1.5}deg) rotateY(${mouseOffset.x * 1.5}deg)`
        }}
      >
        {/* Concentric Guide Paths */}
        <div className="orbit-guide inner-guide"></div>
        <div className="orbit-guide outer-guide"></div>

        {/* Central POOJA Anchor */}
        <div className="central-badge">
          <span className="badge-glow-ring"></span>
          <span className="badge-inner-text">POOJA</span>
        </div>

        {/* Inner Ring Nodes */}
        {innerSkills.map((skill, index) => {
          const total = innerSkills.length;
          const angleRad = ((index / total) * 360 + rotation) * (Math.PI / 180);
          const r = 90; // radius px
          const tx = Math.cos(angleRad) * r;
          const ty = Math.sin(angleRad) * r;

          return (
            <button
              key={skill.name}
              className={`orbital-node inner-node clickable ${selectedSkill?.name === skill.name ? "selected" : ""}`}
              style={{
                transform: `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0)`
              }}
              onClick={() => setSelectedSkill(skill)}
              aria-label={`Inspect ${skill.name}`}
            >
              <span className="node-label-small">{skill.name}</span>
            </button>
          );
        })}

        {/* Outer Ring Nodes */}
        {outerSkills.map((skill, index) => {
          const total = outerSkills.length;
          const angleRad = ((index / total) * 360 - rotation * 0.7) * (Math.PI / 180); // rotates opposite direction
          const r = 175; // radius px
          const tx = Math.cos(angleRad) * r;
          const ty = Math.sin(angleRad) * r;

          return (
            <button
              key={skill.name}
              className={`orbital-node outer-node clickable ${selectedSkill?.name === skill.name ? "selected" : ""}`}
              style={{
                transform: `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0)`
              }}
              onClick={() => setSelectedSkill(skill)}
              aria-label={`Inspect ${skill.name}`}
            >
              <span className="node-label-small">{skill.name}</span>
            </button>
          );
        })}
      </div>

      {/* Detail description widget at bottom */}
      <div className="radial-detail-panel">
        {selectedSkill ? (
          <div className="detail-panel-content">
            <span className="detail-tag">{selectedSkill.category.toUpperCase()} ORBIT NODE</span>
            <h4 className="detail-title">{selectedSkill.name}</h4>
            <p className="detail-body-text">{selectedSkill.description}</p>
          </div>
        ) : (
          <div className="detail-panel-placeholder">
            <p>SELECT A NODE TO INSPECT INTEGRATION DETAILS</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RadialStack;
