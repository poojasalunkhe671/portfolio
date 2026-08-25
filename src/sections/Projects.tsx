import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FolderGit2, Code2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="group relative bg-ide-sidebar border border-ide-border rounded-lg p-6 flex flex-col h-full hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-shadow duration-300 diff-glow-card"
      >
        {/* Top Bar simulating a file open in split view */}
        <div className="flex items-center justify-between mb-4 border-b border-ide-border/50 pb-2" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center gap-2 text-ide-muted group-hover:text-ide-accent transition-colors">
            <Code2 size={18} />
            <span className="font-mono text-sm">{`project_${project.id}.tsx`}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-ide-accent transition-colors" style={{ transform: "translateZ(30px)" }}>
          {project.name}
        </h3>
        
        <p className="text-ide-text text-sm mb-6 flex-1" style={{ transform: "translateZ(15px)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4" style={{ transform: "translateZ(25px)" }}>
          {project.techStack.map((tech: string, i: number) => (
            <span 
              key={i} 
              className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono bg-ide-bg text-ide-string border border-ide-border rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Simulated code brackets on hover */}
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ transform: "translateZ(40px)" }}>
          <span className="text-ide-border font-mono text-4xl font-light">{`{ }`}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { projects } = resumeData;

  return (
    <section id="projects" className="py-12">
      <div className="flex items-center gap-2 mb-8 border-b border-ide-border pb-2">
        <FolderGit2 size={20} className="text-[#d2a8ff]" />
        <h2 className="text-2xl font-bold text-white">Projects.jsx</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
