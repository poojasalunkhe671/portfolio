import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark-plus');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'dark-plus', name: 'Dark+ (default)' },
    { id: 'monokai', name: 'Monokai' },
    { id: 'github-light', name: 'GitHub Light' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ide-theme');
    if (saved) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark-plus');
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-theme-switcher', handleOpen);
    return () => window.removeEventListener('open-theme-switcher', handleOpen);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchTheme = (themeId: string) => {
    // Add transition class for cross-fade
    document.body.classList.add('theme-transitioning');
    
    setCurrentTheme(themeId);
    localStorage.setItem('ide-theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    
    setIsOpen(false);
    
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 400); // match transition duration
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className="fixed top-4 left-1/2 w-[400px] bg-[#1e1e1e] border border-[#3c3c3c] rounded-md shadow-2xl z-[101] py-1 overflow-hidden"
          >
            <div className="px-3 py-2 text-xs text-[#cccccc] font-sans">
              Select Color Theme (Up/Down to preview, Enter to select)
            </div>
            <div className="py-1">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => switchTheme(theme.id)}
                  className="w-full flex items-center justify-between px-6 py-1.5 text-sm font-sans text-left text-[#cccccc] hover:bg-[#04395e] hover:text-white transition-colors"
                >
                  <span>{theme.name}</span>
                  {currentTheme === theme.id && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
