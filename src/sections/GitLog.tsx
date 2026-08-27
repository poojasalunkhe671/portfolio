import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GitCommit, GitBranch } from 'lucide-react';

const commits = [
  { hash: 'a1b2c3d', msg: 'feat: initialized portfolio architecture', time: 'Initial commit' },
  { hash: 'e4f5g6h', msg: 'style: implemented dark mode vs-code theme', time: '3 weeks ago' },
  { hash: 'i7j8k9l', msg: 'fix: responsive layout for mobile viewport', time: '2 weeks ago' },
  { hash: 'm0n1o2p', msg: 'feat: integrated interactive terminal commands', time: '1 week ago' },
  { hash: 'q3r4s5t', msg: 'docs: updated resume data and projects', time: '3 days ago' },
  { hash: 'u6v7w8x', msg: 'feat: added git log timeline visualization', time: '1 day ago' },
  { hash: 'y9z0a1b', msg: 'deploy: pushing to production', time: 'Just now' },
];

const GitLog: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="gitlog" className="py-12 relative z-20 mb-12" ref={containerRef}>
      <div className="flex items-center gap-2 mb-8 border-b border-ide-border pb-2">
        <GitBranch size={20} className="text-[#f14e32]" />
        <h2 className="text-2xl font-bold text-ide-text">GitLog.tsx</h2>
      </div>

      <div className="bg-ide-bg border border-ide-border rounded-lg p-6 relative overflow-hidden">
        <div className="absolute left-[39px] top-6 bottom-6 w-px bg-ide-border">
          <motion.div className="w-full bg-[#f14e32] origin-top" style={{ height }} />
        </div>

        <div className="space-y-6 font-mono text-sm relative z-10">
          {commits.map((commit, index) => (
            <motion.div 
              key={commit.hash}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="mt-1 bg-ide-bg rounded-full border-2 border-ide-border group-hover:border-[#f14e32] transition-colors relative z-10 p-0.5">
                <GitCommit size={14} className="text-ide-muted group-hover:text-[#f14e32] transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="text-[#d2a8ff] hover:underline cursor-pointer">{commit.hash}</span>
                  <span className="text-ide-text">{commit.msg}</span>
                </div>
                <div className="text-xs text-ide-muted">{commit.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitLog;
