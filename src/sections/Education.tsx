import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FileJson, Trophy, CheckCircle } from 'lucide-react';

const Education: React.FC = () => {
  const educationData = [
    {
      degree: "M.Voc (Software Developer)",
      institute: "Yashwantrao Chavan Institute of Science, Satara",
      score: "81.41% (CGPA 9.28)",
      year: "Recent"
    },
    {
      degree: "B.Sc. Computer Science",
      institute: "Yashwantrao Chavan Institute of Science, Satara",
      score: "83.38% (CGPA 9.51)",
      year: "Previous"
    },
    {
      degree: "HSC",
      institute: "Chhatrapati Shahu Academy, Satara",
      score: "88.17%",
      year: "Previous"
    },
    {
      degree: "SSC",
      institute: "Nirmala Convent High School, Satara",
      score: "81.40%",
      year: "Previous"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, height: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      height: 'auto', 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 12,
        delay: 0.8
      }
    }
  };

  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'drop-shadow(0px 0px 0px rgba(255,183,0,0))' },
    show: { 
      opacity: 1, 
      scale: 1,
      filter: 'drop-shadow(0px 0px 12px rgba(255,183,0,0.8))',
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 1.2
      }
    },
    hover: {
      scale: 1.05,
      filter: 'drop-shadow(0px 0px 16px rgba(255,183,0,1))',
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="education" className="py-12 font-mono text-sm md:text-base">
      <div className="flex items-center gap-2 mb-8 border-b border-ide-border pb-2">
        <FileJson size={20} className="text-[#e3b341]" />
        <h2 className="text-2xl font-bold text-ide-text font-sans">Education.json</h2>
      </div>

      <div className="bg-ide-sidebar border border-ide-border rounded-lg p-6 overflow-hidden">
        <div className="text-ide-text">
          <span className="text-ide-text">{'{'}</span>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="pl-6 border-l border-ide-border/50 ml-2 mt-2 space-y-4"
        >
          {/* Education Array */}
          <div>
            <span className="text-ide-keyword">"education"</span>
            <span className="text-ide-text">: [</span>
          </div>
          
          <div className="pl-6 space-y-4">
            {educationData.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <span className="text-ide-text">{'{'}</span>
                <div className="pl-6 border-l border-ide-border/30 ml-2 py-1 space-y-1 hover:border-ide-accent/50 transition-colors">
                  <div>
                    <span className="text-ide-function">"degree"</span>
                    <span className="text-ide-text">: </span>
                    <span className="text-ide-string">"{item.degree}"</span><span className="text-ide-text">,</span>
                  </div>
                  <div>
                    <span className="text-ide-function">"institute"</span>
                    <span className="text-ide-text">: </span>
                    <span className="text-ide-string">"{item.institute}"</span><span className="text-ide-text">,</span>
                  </div>
                  <div>
                    <span className="text-ide-function">"score"</span>
                    <span className="text-ide-text">: </span>
                    <span className="text-ide-string">"{item.score}"</span>
                  </div>
                </div>
                <span className="text-ide-text">{'}'}{index < educationData.length - 1 ? ',' : ''}</span>
              </motion.div>
            ))}
          </div>
          
          <div>
            <span className="text-ide-text">],</span>
          </div>

          {/* Certifications Array */}
          <div className="pt-2">
            <span className="text-ide-keyword">"certifications"</span>
            <span className="text-ide-text">: [</span>
            <motion.div 
              variants={badgeVariants}
              className="inline-flex items-center gap-1.5 bg-[#238636]/10 border border-[#238636]/30 text-[#3fb950] px-3 py-1 rounded-full font-sans text-xs ml-4 font-medium"
            >
              <CheckCircle size={14} className="text-[#3fb950]" />
              React JS Certified
            </motion.div>
            <span className="text-ide-text ml-2">],</span>
          </div>

          {/* Awards Array */}
          <div className="pt-2">
            <span className="text-ide-keyword">"awards"</span>
            <span className="text-ide-text">: [</span>
            <motion.div 
              variants={glowVariants}
              whileHover="hover"
              className="inline-flex items-center gap-2 bg-[#ffb700]/10 border border-[#ffb700]/30 text-[#ffb700] px-3 py-1.5 rounded font-sans text-sm ml-4 cursor-pointer"
            >
              <Trophy size={16} />
              Meritorious Research Award
            </motion.div>
            <span className="text-ide-text ml-2">]</span>
          </div>
          
        </motion.div>
        
        <div className="text-ide-text mt-2">
          {'}'}
        </div>
      </div>
    </section>
  );
};

export default Education;
