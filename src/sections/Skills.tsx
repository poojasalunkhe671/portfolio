import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Layout, Settings } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const skillDiffs: Record<string, string> = {
  "HTML": "+ Structured semantic layouts for E-commerce admin panels",
  "CSS": "+ Styled responsive views with modern CSS flexbox & grid",
  "JavaScript": "+ Implemented real-time location tracking logic",
  "React JS": "+ Built interactive UI components for AI LMS platform",
  "PHP": "+ Developed robust backend APIs and business logic",
  "MySQL": "+ Designed relational database schemas for Loyalty CRM",
  "Firebase": "+ Integrated real-time data syncing and auth",
  "WordPress": "+ Customized themes and managed CMS content",
  "CodeIgniter": "+ Architected MVC patterns for point management systems",
  "Shopify (Basic)": "+ Configured storefronts and basic liquid templates",
  "API Development": "+ Engineered RESTful endpoints for seamless integration",
  "Capacitor": "+ Packaged web app into native mobile format",
  "Git and GitHub": "+ Managed version control and feature branching",
  "Bootstrap": "+ Rapidly prototyped responsive layouts"
};

const SkillBar = ({ skill, delay }: { skill: string, delay: number }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const end = 100;
      const duration = 1000;
      const startTime = performance.now();
      
      // Delay before counting
      const timeout = setTimeout(() => {
        const updateCounter = (currentTime: number) => {
          const elapsed = currentTime - startTime - (delay * 1000);
          if (elapsed > 0) {
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeProgress * end));
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          } else {
            requestAnimationFrame(updateCounter);
          }
        };
        requestAnimationFrame(updateCounter);
      }, 0);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, delay]);

  const diffText = skillDiffs[skill] || `+ Applied ${skill} in various projects`;

  return (
    <div 
      ref={ref} 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between mb-1 text-sm font-mono">
        <span className="text-ide-text">{skill}</span>
        <span className="text-ide-keyword">{count}%</span>
      </div>
      <div className="h-1.5 w-full bg-ide-bg rounded-full overflow-hidden border border-ide-border relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
          className="h-full bg-ide-accent"
          style={{ boxShadow: '0 0 10px var(--color-ide-accentGlow)' }}
        />
      </div>

      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute left-0 bottom-full mb-2 z-50 bg-[#1e1e1e] border border-[#3c3c3c] shadow-xl rounded px-3 py-2 pointer-events-none whitespace-nowrap"
        >
          <div className="font-mono text-xs flex gap-3 items-center">
            <span className="text-[#3fb950] shrink-0 font-bold w-3 text-center">+</span>
            <span className="text-[#a6d1ff] font-medium">{diffText}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SkillCategory = ({ title, skills, icon, delay }: { title: string, skills: string[], icon: React.ReactNode, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-ide-sidebar border border-ide-border rounded-lg p-6 hover:border-ide-border/80 transition-colors"
  >
    <div className="flex items-center gap-2 mb-6 border-b border-ide-border pb-2">
      <span className="text-ide-accent">{icon}</span>
      <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
    
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <SkillBar key={index} skill={skill} delay={delay + (index * 0.1)} />
      ))}
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  const { skills } = resumeData;

  return (
    <section id="skills" className="py-12">
      <div className="flex items-center gap-2 mb-8 border-b border-ide-border pb-2">
        <Database size={20} className="text-[#a5d6ff]" />
        <h2 className="text-2xl font-bold text-white">Skills.json</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkillCategory 
          title="Languages & Frameworks" 
          skills={skills.languagesAndFrameworks} 
          icon={<Layout size={18} />} 
          delay={0.1} 
        />
        <SkillCategory 
          title="Databases & Platforms" 
          skills={skills.databasesAndPlatforms} 
          icon={<Database size={18} />} 
          delay={0.3} 
        />
        <SkillCategory 
          title="Tools & Other" 
          skills={skills.toolsAndOther} 
          icon={<Settings size={18} />} 
          delay={0.5} 
        />
      </div>
    </section>
  );
};

export default Skills;
