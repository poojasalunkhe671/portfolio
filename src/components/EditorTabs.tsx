import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface EditorTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const INITIAL_TABS = [
  { id: 'hero', label: 'Hero.tsx' },
  { id: 'about', label: 'About.md' },
  { id: 'experience', label: 'Experience.ts' },
  { id: 'education', label: 'Education.json' },
  { id: 'projects', label: 'Projects.jsx' },
  { id: 'skills', label: 'Skills.json' },
  { id: 'contact', label: 'Contact.sh' },
];

export const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, setActiveTab }) => {
  const [tabs, setTabs] = useState(INITIAL_TABS);

  useEffect(() => {
    if (!tabs.find(t => t.id === activeTab)) {
      const tabToAdd = INITIAL_TABS.find(t => t.id === activeTab);
      if (tabToAdd) {
        setTabs(prev => [...prev, tabToAdd]);
      }
    }
  }, [activeTab, tabs]);

  const handleClose = (e: React.MouseEvent, idToRemove: string) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== idToRemove);
    setTabs(newTabs);
    
    // If we closed the active tab, switch to the previous one
    if (activeTab === idToRemove && newTabs.length > 0) {
      const closingIndex = tabs.findIndex(t => t.id === idToRemove);
      const nextIndex = Math.max(0, closingIndex - 1);
      setActiveTab(newTabs[nextIndex].id);
    }
  };

  return (
    <div className="flex items-center justify-between bg-ide-sidebar border-b border-ide-border pr-4">
      <div className="flex overflow-x-auto hide-scrollbar relative flex-1">
        {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex items-center gap-2 px-4 py-2.5 text-sm border-r border-ide-border min-w-[120px] transition-colors ${
              isActive
                ? 'bg-ide-bg text-ide-text'
                : 'bg-ide-tabInactive text-ide-muted hover:bg-ide-border/30'
            }`}
          >
            {/* Sliding underline */}
            {isActive && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute top-0 left-0 right-0 h-[2px] bg-ide-accent glow-border"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <span className="truncate">{tab.label}</span>
            <X 
              size={14} 
              className={`ml-auto rounded-sm p-[1px] hover:bg-ide-border/80 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
              onClick={(e) => handleClose(e, tab.id)}
            />
          </button>
        );
      })}
      </div>
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#238636]/10 border border-[#238636]/30 rounded-full text-xs font-sans whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#2ea043] animate-pulse shadow-[0_0_8px_#2ea043]"></span>
          <span className="text-[#3fb950] font-medium tracking-wide">build: passing</span>
        </div>
      </div>
    </div>
  );
};
