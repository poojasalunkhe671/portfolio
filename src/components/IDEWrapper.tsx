import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { EditorTabs } from './EditorTabs';
import { Minimap } from './Minimap';
import { ProblemsPanel } from './ProblemsPanel';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Menu, Volume2, VolumeX, GitBranch, Radio } from 'lucide-react';

interface IDEWrapperProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const IDEWrapper: React.FC<IDEWrapperProps> = ({ children, activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    setSoundEnabled(window.localStorage.getItem('typingSound') === '1');
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    window.localStorage.setItem('typingSound', nextState ? '1' : '0');
  };

  useEffect(() => {
    const section = document.getElementById(activeSection);
    if (section && scrollRef.current) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, [activeSection]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollHeight - target.clientHeight;
    const scrollPercentage = maxScroll > 0 ? target.scrollTop / maxScroll : 0;
    setScrollProgress(scrollPercentage);
  };

  const totalLines = 150;
  const activeLineCenter = Math.floor(scrollProgress * totalLines);

  const handleGitClick = () => {
    setActiveSection('gitlog');
    const el = document.getElementById('gitlog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen w-full bg-ide-bg text-ide-text overflow-hidden font-mono selection:bg-ide-accentGlow">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-12 bg-ide-sidebar border-b border-ide-border flex items-center justify-between px-4 z-50">
        <span className="text-sm font-semibold text-ide-text">POOJA_SALUNKHE.workspace</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
          <Menu size={20} className="text-ide-muted" />
        </button>
      </div>

      <Sidebar activeTab={activeSection} setActiveTab={setActiveSection} />

      <div className="flex-1 flex flex-col min-w-0 h-full mt-12 md:mt-0">
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 w-full bg-ide-sidebar border-b border-ide-border z-40 p-4 shadow-xl">
             <Sidebar activeTab={activeSection} setActiveTab={setActiveSection} />
          </div>
        )}

        <EditorTabs activeTab={activeSection} setActiveTab={setActiveSection} />
        
        <div className="flex-1 flex overflow-hidden">
          <main 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto relative scroll-smooth" 
            id="editor-scroll-area"
          >
          <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-ide-border/50 bg-ide-bg flex flex-col items-center py-4 text-xs select-none pointer-events-none z-0 hidden sm:flex h-[2400px]">
             {Array.from({ length: totalLines }).map((_, i) => {
               const isActiveRange = Math.abs(i - activeLineCenter) < 5;
               return (
                 <div 
                   key={i} 
                   className={`leading-6 h-6 w-full text-center transition-colors duration-300 ${isActiveRange ? 'text-ide-text glow-text font-bold' : 'text-ide-border'}`}
                 >
                   {i + 1}
                 </div>
               );
             })}
          </div>
          
          <div className="relative z-10 sm:pl-16 p-4 sm:p-8 max-w-5xl mx-auto pb-32">
            {children}
          </div>
          </main>
          <Minimap scrollRef={scrollRef} scrollProgress={scrollProgress} />
        </div>
        
        <ProblemsPanel isOpen={problemsOpen} onClose={() => setProblemsOpen(false)} />
        
        {/* Status Bar */}
        <footer className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] font-sans shrink-0 hidden md:flex z-30">
          <div className="flex items-center gap-4 h-full">
            <button 
              onClick={handleGitClick}
              className="flex items-center gap-1.5 cursor-pointer hover:bg-white/20 px-2 h-full transition-colors"
              title="View Commit History"
            >
              <GitBranch size={12} /> main*
            </button>
            <button 
              onClick={() => setProblemsOpen(!problemsOpen)}
              className={`flex items-center gap-2 cursor-pointer px-2 h-full transition-colors ${problemsOpen ? 'bg-white/20' : 'hover:bg-white/20'}`}
            >
              <span className="flex items-center gap-1"><span className="text-[14px]">✖</span> 0</span>
              <span className="flex items-center gap-1"><span className="text-[14px]">⚠</span> 0</span>
            </button>
          </div>
          <div className="flex items-center gap-3 h-full">
            <span className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition-colors">{`Ln ${Math.max(1, activeLineCenter + 1)}, Col 1`}</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition-colors hidden lg:flex">Spaces: 2</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition-colors hidden lg:flex">UTF-8</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition-colors">TypeScript React</span>
            <a href="#" className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-2 h-full transition-colors">
              <Radio size={12} className="animate-pulse text-[#a6e22e]" /> Go Live
            </a>
            <button 
              onClick={toggleSound}
              className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition-colors"
              title="Toggle Typing Sounds"
            >
              {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
          </div>
        </footer>
      </div>
      <ThemeSwitcher />
    </div>
  );
};
