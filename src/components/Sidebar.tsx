import React, { useState, useEffect } from 'react';
import { FileCode, FileJson, FileText, User, Terminal, FolderOpen, Copy, Blocks, Settings, Download, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const navItems = [
  { id: 'hero', label: 'Hero.tsx', icon: FileCode },
  { id: 'about', label: 'About.md', icon: FileText },
  { id: 'experience', label: 'Experience.ts', icon: FileCode },
  { id: 'gitlog', label: 'GitLog.tsx', icon: FileCode },
  { id: 'projects', label: 'Projects.jsx', icon: FileCode },
  { id: 'skills', label: 'Skills.json', icon: FileJson },
  { id: 'contact', label: 'Contact.sh', icon: Terminal },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePane, setActivePane] = useState<'explorer' | 'extensions'>('explorer');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePane = (pane: 'explorer' | 'extensions') => {
    if (activePane === pane && !isCollapsed) {
      setIsCollapsed(true);
    } else {
      setActivePane(pane);
      setIsCollapsed(false);
    }
  };

  return (
    <div className="flex h-full shrink-0 hidden md:flex z-20">
      {/* Activity Bar */}
      <div className="w-12 bg-ide-bg border-r border-ide-border flex flex-col items-center py-2 shrink-0">
        <button 
          onClick={() => togglePane('explorer')} 
          title="Explorer (Ctrl+Shift+E)"
          className={`relative p-2 mb-2 transition-colors ${activePane === 'explorer' && !isCollapsed ? 'text-ide-text' : 'text-ide-muted hover:text-ide-text'}`}
        >
          {activePane === 'explorer' && !isCollapsed && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-ide-accent" />}
          <Copy size={24} />
        </button>
        
        <div className="flex-1" />
        
        <div className="relative">
          <button 
            className={`p-2 mb-2 transition-colors ${profileOpen ? 'text-ide-text' : 'text-ide-muted hover:text-ide-text'}`}
            onClick={() => setProfileOpen(!profileOpen)}
            title="GitHub Profile"
          >
            <User size={24} />
          </button>
          
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute bottom-12 left-10 w-64 bg-[#1e1e1e] border border-[#3c3c3c] rounded shadow-xl z-50 py-2 px-3 overflow-hidden font-sans shadow-black/50">
                <div className="text-xs text-ide-muted mb-1">GitHub Profile</div>
                <span 
                  className="text-ide-accent text-xs break-all"
                >
                  https://github.com/poojasalunkhe671
                </span>
              </div>
            </>
          )}
        </div>
        <div className="relative">
          <button 
            className={`p-2 transition-colors ${settingsOpen ? 'text-ide-text' : 'text-ide-muted hover:text-ide-text'}`}
            onClick={() => setSettingsOpen(!settingsOpen)}
            title="Manage"
          >
            <Settings size={24} />
          </button>
          
          {settingsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
              <div className="absolute bottom-2 left-10 w-48 bg-[#1e1e1e] border border-[#3c3c3c] rounded shadow-xl z-50 py-1 overflow-hidden font-sans text-xs shadow-black/50">
                <button 
                  onClick={() => {
                    setSettingsOpen(false);
                    window.dispatchEvent(new Event('open-theme-switcher'));
                  }}
                  className="w-full text-left px-4 py-2 text-[#cccccc] hover:bg-[#04395e] hover:text-white transition-colors"
                >
                  Color Theme
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Collapsible Pane */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 0 : 256, opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-ide-sidebar border-r border-ide-border overflow-hidden flex flex-col shrink-0 origin-left whitespace-nowrap"
      >
        <div className="w-64 flex flex-col h-full">
          {activePane === 'explorer' && (
            <>
              <div className="px-4 py-3 border-b border-ide-border flex items-center gap-2 text-ide-muted text-xs uppercase font-semibold">
                <FolderOpen size={14} />
                <span>Portfolio</span>
              </div>
              
              <div className="flex-1 py-2 overflow-y-auto">
                <div className="px-4 py-1 text-xs text-ide-muted uppercase tracking-wider mb-1 flex items-center cursor-pointer hover:text-ide-text transition-colors">
                  <span className="mr-1">▼</span> src
                </div>
                
                <ul className="pl-6 space-y-[2px]">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={`group w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm transition-all duration-200 text-left ${
                            isActive 
                              ? 'bg-ide-border/50 text-ide-accent font-medium' 
                              : 'text-ide-text hover:bg-ide-border/30 hover:text-white'
                          }`}
                        >
                          <motion.span 
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className={`${isActive ? 'text-ide-accent drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'text-ide-muted group-hover:text-ide-text'}`}
                          >
                            <Icon size={16} />
                          </motion.span>
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="p-4 border-t border-ide-border text-xs text-ide-muted flex items-center gap-2">
                <User size={14} />
                <span>Pooja Salunkhe</span>
              </div>
            </>
          )}
        </div>
      </motion.aside>
    </div>
  );
};
