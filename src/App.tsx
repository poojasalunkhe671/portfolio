import { useState, useEffect } from "react";
import { IDEWrapper } from "./components/IDEWrapper";
import { CommandPalette } from "./components/CommandPalette";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [booting, setBooting] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  // Boot sequence logic
  useEffect(() => {
    const sequence = [
      "Starting IDE environment...",
      "Loading dependencies...",
      "Resolving workspace: POOJA_SALUNKHE...",
      "Mounting components...",
      "Status: OK. Ready.",
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        const nextLine = sequence[currentLine];
        setBootLines(prev => [...prev, nextLine]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 400); // Small pause before revealing app
      }
    }, 200); // Fast 200ms per line

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scrollspy
  useEffect(() => {
    if (booting) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [booting]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(open => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {booting && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 bg-ide-bg z-[100] flex flex-col justify-end p-8 font-mono text-sm"
          >
            {bootLines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === bootLines.length - 1 && line?.includes("OK") ? "text-ide-accent glow-text" : "text-ide-muted"}
              >
                <span className="text-ide-keyword mr-2">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span>
                {line}
              </motion.div>
            ))}
            <div className="mt-2 text-ide-text animate-pulse">_</div>
          </motion.div>
        )}
      </AnimatePresence>

      {!booting && (
        <IDEWrapper activeSection={activeSection} setActiveSection={setActiveSection}>
          <div className="flex flex-col gap-32">
            <Hero />
            <About />
            <Experience />
            <Education />
            <Projects />
            <Skills />
            <Contact />
          </div>
          <CommandPalette isOpen={cmdPaletteOpen} onClose={() => setCmdPaletteOpen(false)} />
        </IDEWrapper>
      )}
    </>
  );
}

export default App;
