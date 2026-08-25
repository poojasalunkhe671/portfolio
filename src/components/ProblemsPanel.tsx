import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface ProblemsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProblemsPanel: React.FC<ProblemsPanelProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 160, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-ide-sidebar border-t border-ide-border shrink-0 flex flex-col z-20 overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-1.5 text-[11px] border-b border-ide-border text-ide-muted uppercase tracking-wider mt-1">
            <div className="flex gap-4">
              <span className="text-ide-text border-b border-ide-accent pb-1.5 cursor-pointer font-semibold">Problems</span>
              <span className="cursor-pointer hover:text-ide-text pb-1.5">Output</span>
              <span className="cursor-pointer hover:text-ide-text pb-1.5">Debug Console</span>
              <span className="cursor-pointer hover:text-ide-text pb-1.5">Terminal</span>
            </div>
            <button onClick={onClose} className="hover:text-ide-text pb-1.5"><X size={14} /></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-ide-muted gap-1">
             <CheckCircle2 size={32} className="text-[#3fb950] mb-2" />
             <p className="text-sm font-semibold text-ide-text">No problems have been detected in the workspace.</p>
             <p className="text-xs opacity-70">This developer writes clean code.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
