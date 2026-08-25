import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useTypingSound } from '../hooks/useTypingSound';

const roles = ['Problem Solver', 'Full-Stack Developer', 'React Enthusiast'];

const Hero: React.FC = () => {
  const { name, summary } = resumeData.personalInfo;
  const playSound = useTypingSound();

  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
          <a 
            href="/POOJA.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-ide-accent text-ide-bg px-6 py-3 font-semibold rounded hover:bg-ide-accent/90 transition-all glow-border"
          >
            <span>Resume.pdf</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-transparent border border-ide-border text-ide-text px-6 py-3 font-semibold rounded hover:border-ide-accent hover:text-ide-accent transition-colors"
          >
            <span>contact.sh</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
