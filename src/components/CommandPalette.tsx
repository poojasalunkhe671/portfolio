import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileCode, FileText, FileJson, Terminal, User } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { id: 'hero', title: 'Hero.tsx', type: 'component', icon: FileCode },
  { id: 'about', title: 'About.md', type: 'markdown', icon: FileText },
  { id: 'experience', title: 'Experience.ts', type: 'typescript', icon: FileCode },
  { id: 'projects', title: 'Projects.jsx', type: 'javascript', icon: FileCode },
  { id: 'skills', title: 'Skills.json', type: 'json', icon: FileJson },
  { id: 'contact', title: 'Contact.sh', type: 'script', icon: Terminal },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(query.toLowerCase()) || 
    section.id.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredSections.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredSections.length) % filteredSections.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSections.length > 0) {
        const selected = filteredSections[selectedIndex];
        document.getElementById(selected.id)?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <div className="fixed inset-0 top-[10%] flex justify-center z-[201] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full max-w-xl bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
              style={{ maxHeight: '80vh' }}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#3c3c3c]">
                <Search size={18} className="text-[#858585]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search files by name (e.g. Hero, About)..."
                  className="w-full bg-transparent border-none outline-none text-[#cccccc] font-mono text-sm placeholder:text-[#858585]"
                />
                <div className="flex items-center gap-1 text-[10px] text-[#858585] font-sans font-medium bg-[#2d2d2d] px-1.5 py-0.5 rounded border border-[#3c3c3c]">
                  ESC
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1 p-2 max-h-[300px]">
                {filteredSections.length > 0 ? (
                  filteredSections.map((section, index) => {
                    const Icon = section.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={section.id}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors font-mono text-sm ${isSelected ? 'bg-[#04395e] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'}`}
                        onClick={() => {
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} className={isSelected ? 'text-white' : 'text-[#519aba]'} />
                          <span>{section.title}</span>
                        </div>
                        <span className={`text-xs ${isSelected ? 'text-[#a6d1ff]' : 'text-[#858585]'}`}>
                          src/sections
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-[#858585] font-mono text-sm">
                    No matching files found.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
