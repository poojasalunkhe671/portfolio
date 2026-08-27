import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 mb-6 border-b border-ide-border pb-2">
          <FileText size={20} className="text-ide-muted" />
          <h2 className="text-2xl font-bold text-ide-text">README.md</h2>
        </div>

        <div className="bg-ide-sidebar border border-ide-border rounded-md overflow-hidden shadow-lg shadow-ide-bg/50">
          <div className="bg-ide-border/50 px-4 py-2 flex items-center gap-2 border-b border-ide-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs text-ide-muted font-sans ml-2">about.md</span>
          </div>
          
          <div className="p-6 prose prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none">
            <h1 className="text-ide-text border-b border-ide-border pb-2 text-3xl font-bold mb-6"># About Me</h1>
            
            <p className="text-ide-text mb-4 leading-relaxed">
              Hi, I'm <span className="text-ide-accent font-semibold">Pooja Salunkhe</span>. I'm a motivated and adaptable Software Developer with hands-on experience building responsive, user-focused web applications.
            </p>
            
            <p className="text-ide-text mb-6 leading-relaxed">
              I am skilled in developing efficient solutions, integrating systems, and improving application performance. My passion lies in delivering impactful results while continuously learning and contributing to innovative, growth-oriented teams.
            </p>
            
            <div className="bg-ide-bg p-4 rounded border border-ide-border font-mono text-sm min-h-[140px] relative z-10">
              <TypeAnimation
                sequence={[
                  500,
                  "export interface DeveloperProfile {\n  name: 'Pooja Salunkhe';\n  role: 'Software Developer';\n  location: 'Satara, Maharashtra';\n  focus: 'Full-Stack Web Development';\n}"
                ]}
                wrapper="div"
                cursor={true}
                speed={70}
                style={{ whiteSpace: 'pre-wrap', display: 'block', margin: 0, fontFamily: 'inherit', color: 'var(--color-ide-string)', lineHeight: '1.6' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
