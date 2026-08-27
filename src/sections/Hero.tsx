import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Terminal, X, Check } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useTypingSound } from '../hooks/useTypingSound';

const roles = ['Problem Solver', 'Full-Stack Developer', 'React Enthusiast'];

const QUESTIONS = [
  { q: "What color is the sky on a clear day?", options: ["Green", "Blue", "Red"], a: 1 },
  { q: "How many legs does a dog have?", options: ["2", "4", "6"], a: 1 },
  { q: "Which of these is a fruit?", options: ["Apple", "Carrot", "Potato"], a: 0 },
  { q: "What is 5 + 5?", options: ["8", "10", "12"], a: 1 },
];

const Hero: React.FC = () => {
  const { name, summary } = resumeData.personalInfo;
  const playSound = useTypingSound();

  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(QUESTIONS[0]);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOpenResumeModal = () => {
    const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrentQuestion(randomQ);
    setSuccess(false);
    setShakeIndex(null);
    setShowModal(true);
  };

  const handleOptionClick = (index: number) => {
    if (success) return;
    
    if (index === currentQuestion.a) {
      setSuccess(true);
      setTimeout(() => {
        window.open('/POOJA.pdf', '_blank');
        setShowModal(false);
      }, 800);
    } else {
      setShakeIndex(index);
      setTimeout(() => setShakeIndex(null), 400);
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      playSound();
      if (roleText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => setRoleText(currentRole.substring(0, roleText.length - 1)), 50);
      }
    } else {
      if (roleText.length === currentRole.length) {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        playSound();
        timeout = setTimeout(() => setRoleText(currentRole.substring(0, roleText.length + 1)), 100);
      }
    }

    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, roleIndex, playSound]);

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-ide-accent mb-6 font-semibold"
        >
          <Terminal size={20} />
          <span>~/portfolio/src/hero</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight"
        >
          {name}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl text-ide-accent mb-8 h-10 flex items-center"
        >
          <span className="text-ide-keyword mr-2">const</span> <span className="text-ide-function mr-2">role</span> = <span className="text-white mr-2">"</span>
          <span className="text-ide-string">{roleText}</span>
          <span className="text-white">"</span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-[12px] h-[30px] bg-ide-text ml-1 inline-block" 
          />
          <span className="text-white">;</span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-ide-muted max-w-2xl text-lg mb-12 leading-relaxed"
        >
          <span className="text-ide-comment block mb-2">/**</span>
          <span className="text-ide-comment block mb-2"> * {summary.split('. ').join('.\n * ')}</span>
          <span className="text-ide-comment block"> */</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <button 
            onClick={handleOpenResumeModal}
            className="group flex items-center gap-2 bg-ide-accent text-ide-bg px-6 py-3 font-semibold rounded hover:bg-ide-accent/90 transition-all glow-border"
          >
            <span>Resume.pdf</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-transparent border border-ide-border text-ide-text px-6 py-3 font-semibold rounded hover:border-ide-accent hover:text-ide-accent transition-colors"
          >
            <span>contact.sh</span>
          </button>
        </motion.div>
      </div>

      {/* Resume Gate Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center font-mono px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-ide-sidebar border border-ide-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-ide-border bg-ide-bg text-sm">
                <div className="flex items-center gap-2 text-ide-text font-semibold">
                  <Terminal size={16} className="text-ide-accent" />
                  <span>verify_human.sh</span>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-ide-muted hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {!success ? (
                  <>
                    <p className="text-white text-base mb-6 leading-relaxed">
                      {currentQuestion.q}
                    </p>
                    <div className="flex flex-col gap-3">
                      {currentQuestion.options.map((opt, i) => (
                        <motion.button
                          key={i}
                          animate={shakeIndex === i ? { x: [-5, 5, -5, 5, 0] } : {}}
                          transition={{ duration: 0.3 }}
                          onClick={() => handleOptionClick(i)}
                          className={`text-left px-4 py-3 rounded border text-sm transition-colors ${
                            shakeIndex === i 
                              ? 'border-red-500/50 bg-red-500/10 text-red-200' 
                              : 'border-ide-border bg-ide-bg text-ide-text hover:border-ide-accent hover:text-ide-accent'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {shakeIndex !== null && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs mt-4 text-center"
                      >
                        Try again!
                      </motion.p>
                    )}
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-ide-accent/20 flex items-center justify-center">
                      <Check size={32} className="text-ide-accent" />
                    </div>
                    <span className="text-ide-accent font-bold text-xl">Access Granted</span>
                    <span className="text-ide-muted text-sm animate-pulse">Opening Resume.pdf...</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
