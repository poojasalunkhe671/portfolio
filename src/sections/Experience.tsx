import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, GitMerge } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Experience: React.FC = () => {
  const { experience } = resumeData;

  return (
    <section id="experience" className="py-12">
      <div className="flex items-center gap-2 mb-8 border-b border-ide-border pb-2">
        <GitBranch size={20} className="text-ide-accent" />
        <h2 className="text-2xl font-bold text-ide-text">Experience.ts</h2>
      </div>

      <div className="relative pl-6 md:pl-8 ml-4 pb-4">
        {/* Animated Connector Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-0 top-0 w-px bg-ide-border/80"
          style={{ transformOrigin: 'top' }}
        />

        {experience.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 + (index * 0.2), ease: "easeOut" }}
            className="mb-12 relative group"
          >
            {/* Git Node */}
            <div className="absolute -left-[27px] md:-left-[35px] top-1 w-6 h-6 rounded-full bg-ide-bg border-2 border-ide-accent flex items-center justify-center z-10 shadow-[0_0_10px_rgba(0,240,255,0.2)] group-hover:bg-ide-accent group-hover:text-ide-bg transition-colors">
              <GitCommit size={14} className="group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="bg-ide-sidebar border border-ide-border rounded-lg p-5 hover:border-ide-accent/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-ide-text group-hover:text-ide-accent transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-ide-string font-mono mt-1">
                    @{exp.company}
                  </div>
                </div>
                <div className="text-sm font-mono text-ide-muted bg-ide-bg px-3 py-1 rounded border border-ide-border w-fit">
                  {exp.period}
                </div>
              </div>

              <ul className="space-y-2 mt-4 text-ide-text">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-ide-keyword mt-0.5">{`->`}</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
              
              {exp.website && (
                <div className="mt-4 pt-4 border-t border-ide-border/50 text-xs font-mono">
                  <span className="text-ide-function">const</span> <span className="text-ide-text">link</span> = <a href={`https://${exp.website}`} target="_blank" rel="noopener noreferrer" className="text-ide-accent hover:underline">"{exp.website}"</a>;
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* End Node */}
        <div className="absolute -left-[4px] bottom-0 w-3 h-3 rounded-full bg-ide-muted border-2 border-ide-bg z-10 shadow-[0_0_0_2px_var(--color-ide-bg)]"></div>
      </div>
    </section>
  );
};

export default Experience;
