import React from "react";
import "./ProjectVisual.css";

interface ProjectVisualProps {
  id: string;
  isHovered: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ id, isHovered }) => {
  const hoverClass = isHovered ? "is-hovered" : "";

  switch (id) {
    case "01": // AI-Based Learning Management System
      return (
        <div className={`project-visual-wrapper id-01 ${hoverClass}`}>
          <svg viewBox="0 0 300 200" width="100%" height="100%">
            <rect x="10" y="10" width="280" height="180" rx="6" fill="none" stroke="var(--border)" strokeWidth="1" />
            <line x1="10" y1="40" x2="290" y2="40" stroke="var(--border)" strokeWidth="1" />
            <circle cx="25" cy="25" r="4" fill="#ff5555" />
            <circle cx="40" cy="25" r="4" fill="#ffaa00" />
            <circle cx="55" cy="25" r="4" fill="#55ff55" />
            
            {/* AI Assistant Chat bubble */}
            <g className="visual-chat-bubble visual-ai">
              <rect x="25" y="60" width="130" height="40" rx="4" fill="var(--accent-glow)" stroke="var(--accent-border)" strokeWidth="0.5" />
              <circle cx="45" cy="80" r="10" fill="var(--accent-border)" />
              <rect x="65" y="74" width="70" height="4" rx="2" fill="var(--accent)" />
              <rect x="65" y="82" width="50" height="4" rx="2" fill="var(--accent)" />
            </g>

            {/* User Chat bubble */}
            <g className="visual-chat-bubble visual-user">
              <rect x="145" y="120" width="130" height="40" rx="4" fill="none" stroke="var(--border)" strokeWidth="1" />
              <circle cx="165" cy="140" r="10" fill="var(--border)" />
              <rect x="185" y="134" width="70" height="4" rx="2" fill="var(--text)" />
              <rect x="185" y="142" width="50" height="4" rx="2" fill="var(--text-muted)" />
            </g>

            {/* Chat connection dots that light up on hover */}
            <g className="visual-chat-connectors">
              <circle className="connect-dot d1" cx="95" cy="110" r="2.5" fill="var(--border)" />
              <circle className="connect-dot d2" cx="120" cy="110" r="2.5" fill="var(--border)" />
              <circle className="connect-dot d3" cx="145" cy="110" r="2.5" fill="var(--border)" />
            </g>
          </svg>
        </div>
      );
      
    case "02": // Loyalty / Points Management System
      return (
        <div className={`project-visual-wrapper id-02 ${hoverClass}`}>
          <svg viewBox="0 0 300 200" width="100%" height="100%">
            <rect x="10" y="10" width="280" height="180" rx="6" fill="none" stroke="var(--border)" strokeWidth="1" />
            
            {/* Account ledger progress wheel */}
            <circle cx="80" cy="100" r="40" fill="none" stroke="var(--border)" strokeWidth="1" />
            <circle cx="80" cy="100" r="30" fill="none" stroke="var(--accent-border)" strokeWidth="2" strokeDasharray="188" strokeDashoffset="60" className="points-circle" />
            <text x="80" y="105" textAnchor="middle" fill="var(--text-h)" fontFamily="var(--mono)" fontSize="12" fontWeight="600" className="ledger-points-text">+850</text>
            
            {/* Slabs ledger rows */}
            <g className="slab-row row-1">
              <rect x="150" y="50" width="120" height="25" rx="3" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <rect x="160" y="60" width="40" height="5" rx="2" fill="var(--text-muted)" />
              <rect x="220" y="58" width="40" height="9" rx="2" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="0.5" />
            </g>
            
            <g className="slab-row row-2">
              <rect x="150" y="90" width="120" height="25" rx="3" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <rect x="160" y="100" width="50" height="5" rx="2" fill="var(--text-muted)" />
              <rect x="220" y="98" width="40" height="9" rx="2" fill="var(--border)" strokeWidth="0.5" />
            </g>
            
            <g className="slab-row row-3">
              <rect x="150" y="130" width="120" height="25" rx="3" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <rect x="160" y="140" width="45" height="5" rx="2" fill="var(--text-muted)" />
              <rect x="220" y="138" width="40" height="9" rx="2" fill="var(--border)" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      );
      
    case "03": // Admin Dashboard with CRUD Operations
      return (
        <div className={`project-visual-wrapper id-03 ${hoverClass}`}>
          <svg viewBox="0 0 300 200" width="100%" height="100%">
            <rect x="10" y="10" width="280" height="180" rx="6" fill="none" stroke="var(--border)" strokeWidth="1" />
            
            {/* Grid listings */}
            <line x1="10" y1="50" x2="290" y2="50" stroke="var(--border)" strokeWidth="1" />
            <line x1="10" y1="90" x2="290" y2="90" stroke="var(--border)" strokeWidth="1" />
            <line x1="10" y1="130" x2="290" y2="130" stroke="var(--border)" strokeWidth="1" />
            
            {/* Row items */}
            <g className="dashboard-row r1">
              <circle cx="30" cy="30" r="6" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="0.5" />
              <rect x="50" y="27" width="60" height="6" rx="2" fill="var(--text-h)" />
            </g>
            
            <g className="dashboard-row r2">
              <circle cx="30" cy="70" r="6" fill="var(--border)" />
              <rect x="50" y="67" width="80" height="6" rx="2" fill="var(--text)" />
            </g>
            
            <g className="dashboard-row r3">
              <circle cx="30" cy="110" r="6" fill="var(--border)" />
              <rect x="50" y="107" width="50" height="6" rx="2" fill="var(--text)" />
            </g>

            <g className="dashboard-row r4">
              <circle cx="30" cy="150" r="6" fill="var(--border)" />
              <rect x="50" y="147" width="70" height="6" rx="2" fill="var(--text)" />
            </g>
            
            {/* Graph detail popup */}
            <g className="dashboard-graph-box">
              <rect x="175" y="65" width="105" height="100" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" style={{ opacity: 0.95 }} />
              <path d="M 185,140 L 205,120 L 225,130 L 245,95 L 265,110" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="graph-line" />
              <circle className="graph-node-pulse" cx="245" cy="95" r="3" fill="var(--accent)" />
            </g>
          </svg>
        </div>
      );
      
    case "04": // E-commerce Management System
      return (
        <div className={`project-visual-wrapper id-04 ${hoverClass}`}>
          <svg viewBox="0 0 300 200" width="100%" height="100%">
            <rect x="10" y="10" width="280" height="180" rx="6" fill="none" stroke="var(--border)" strokeWidth="1" />
            
            {/* Tiles */}
            <g transform="translate(10, 0)">
              <g className="ecom-tile t1">
                <rect x="25" y="40" width="100" height="50" rx="4" fill="var(--bg-offset)" stroke="var(--border)" strokeWidth="1" />
                <rect x="35" y="50" width="40" height="30" rx="2" fill="var(--border)" />
                <rect x="85" y="52" width="30" height="5" rx="2" fill="var(--text-h)" />
                <rect x="85" y="62" width="20" height="4" rx="2" fill="var(--accent)" />
              </g>
              
              <g className="ecom-tile t2">
                <rect x="145" y="40" width="100" height="50" rx="4" fill="var(--bg-offset)" stroke="var(--border)" strokeWidth="1" />
                <rect x="155" y="50" width="40" height="30" rx="2" fill="var(--border)" />
                <rect x="205" y="52" width="35" height="5" rx="2" fill="var(--text-h)" />
                <rect x="205" y="62" width="15" height="4" rx="2" fill="var(--text-muted)" />
              </g>
              
              {/* Discount control slab */}
              <g className="ecom-discount-panel">
                <rect x="25" y="110" width="220" height="60" rx="4" fill="var(--accent-glow)" stroke="var(--accent-border)" strokeWidth="0.5" />
                <rect x="40" y="125" width="80" height="6" rx="2" fill="var(--accent)" />
                <rect x="40" y="137" width="110" height="4" rx="2" fill="var(--text-muted)" />
                
                <g className="discount-tag-badge">
                  <circle cx="210" cy="140" r="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
                  <text x="210" y="144" textAnchor="middle" fill="var(--accent)" fontFamily="var(--mono)" fontSize="11" fontWeight="600">%</text>
                </g>
              </g>
            </g>
          </svg>
        </div>
      );
      
    case "05": // User Location Tracking Feature
      return (
        <div className={`project-visual-wrapper id-05 ${hoverClass}`}>
          <svg viewBox="0 0 300 200" width="100%" height="100%">
            <rect x="10" y="10" width="280" height="180" rx="6" fill="none" stroke="var(--border)" strokeWidth="1" />
            
            {/* Grid coordinates map */}
            <circle cx="150" cy="100" r="80" fill="none" stroke="var(--border)" strokeWidth="0.5" />
            <circle cx="150" cy="100" r="50" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="150" y1="10" x2="150" y2="190" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="10" y1="100" x2="290" y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
            
            {/* Geo track route */}
            <path className="route-trace-line" d="M 60,140 L 110,120 L 140,130 L 170,80 L 220,90" fill="none" stroke="var(--accent-border)" strokeWidth="1.5" strokeDasharray="4 4" />
            
            {/* Pulsing Target Beacon */}
            <g transform="translate(170, 80)" className="gps-target-group">
              <circle cx="0" cy="0" r="20" fill="var(--accent-glow)" className="gps-pulse-ring" />
              <circle cx="0" cy="0" r="4.5" fill="var(--accent)" />
            </g>
          </svg>
        </div>
      );
      
    default:
      return null;
  }
};
export default ProjectVisual;
