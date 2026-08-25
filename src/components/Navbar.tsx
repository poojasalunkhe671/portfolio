import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";

const sections = ["HOME", "ABOUT", "EXPERIENCE", "PROJECTS", "SKILLS", "CONTACT"];

interface NavbarProps {
  onBrandClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBrandClick }) => {
  const [activeSection, setActiveSection] = useState("HOME");
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
    opacity: 0
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.toUpperCase();
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (el) observer.observe(el);
    });

    const handleMouseLeave = () => setIsExpanded(false);
    const navEl = navRef.current;
    if (navEl) {
      navEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      observer.disconnect();
      if (navEl) {
        navEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Update sliding indicator metrics
  useEffect(() => {
    const activeEl = itemRefs.current[activeSection];
    if (activeEl && isExpanded) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1
      });
    } else {
      setIndicatorStyle({
        left: 0,
        width: 0,
        opacity: 0
      });
    }
  }, [activeSection, isExpanded]);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsExpanded(false);
    const el = document.getElementById(section.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`floating-nav ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      aria-label="Main Navigation"
    >
      {/* Collapsed Beacon Trigger */}
      {!isExpanded && (
        <button 
          className="nav-collapsed-trigger clickable" 
          onClick={onBrandClick}
          aria-label="Expand menu"
        >
          <span className="nav-beacon"></span>
          <span className="nav-active-text">{activeSection}</span>
        </button>
      )}

      {/* Expanded Link List */}
      <div className="nav-expanded-content">
        <ul className="nav-list">
          {sections.map((section) => (
            <li key={section} className="nav-item">
              <button
                ref={(el) => {
                  itemRefs.current[section] = el;
                }}
                onClick={() => handleNavClick(section)}
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                aria-label={`Scroll to ${section}`}
              >
                <span className="nav-link-number">0{sections.indexOf(section) + 1}</span>
                <span className="nav-link-text">{section}</span>
              </button>
            </li>
          ))}
          {/* Animated sliding bar underline */}
          <span className="nav-sliding-indicator" style={indicatorStyle} />
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
