import React, { useState, useEffect, useRef } from 'react';

import { Terminal, Mail, Globe } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface CommandOutput {
  id: string;
  type: 'input' | 'output' | 'error';
  content: React.ReactNode;
}

const Contact: React.FC = () => {
  const { email, phone, linkedIn } = resumeData.personalInfo;
  const ref = React.useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  const [history, setHistory] = useState<CommandOutput[]>([
    { id: 'init', type: 'output', content: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;
    
    setCmdHistory(prev => [cmd, ...prev]);
    setHistoryIdx(-1);

    const newHistory: CommandOutput[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', content: cmd }
    ];

    switch (trimmedCmd) {
      case 'help':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: (
            <div className="grid grid-cols-2 max-w-sm">
              <span className="text-ide-function">whoami</span><span>Display bio</span>
              <span className="text-ide-function">skills</span><span>List top skills</span>
              <span className="text-ide-function">projects</span><span>Show featured projects</span>
              <span className="text-ide-function">contact</span><span>Show contact info</span>
              <span className="text-ide-function">clear</span><span>Clear terminal</span>
              <span className="text-ide-keyword">sudo hire-me</span><span>???</span>
            </div>
          )
        });
        break;
      case 'whoami':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: `${resumeData.personalInfo.name} - ${resumeData.personalInfo.role}\n${resumeData.personalInfo.summary}`
        });
        break;
      case 'skills':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: resumeData.skills.languagesAndFrameworks.join(', ') + ', ' + resumeData.skills.databasesAndPlatforms.join(', ')
        });
        break;
      case 'projects':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: resumeData.projects.map(p => p.name).join('\n')
        });
        break;
      case 'contact':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: (
            <div className="flex flex-col gap-2 mt-2">
              <a href={`mailto:${email}`} className="text-ide-string hover:underline flex items-center gap-2"><Mail size={14}/> {email}</a>
              <span className="text-ide-string flex items-center gap-2"><Terminal size={14}/> {phone}</span>
              <a href={`https://${linkedIn}`} target="_blank" rel="noopener noreferrer" className="text-ide-string hover:underline flex items-center gap-2"><Globe size={14}/> {linkedIn}</a>
            </div>
          )
        });
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo hire-me':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: <span className="text-green-400 font-bold animate-pulse">Access Granted! Initiating hiring protocol... [Sending an email is highly recommended]</span>
        });
        break;
      default:
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'error',
          content: `command not found: ${trimmedCmd}`
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="contact" className="py-12" ref={ref}>
      <div className="flex items-center gap-2 mb-8 border-b border-ide-border pb-2">
        <Terminal size={20} className="text-ide-text" />
        <h2 className="text-2xl font-bold text-ide-text">Contact.sh</h2>
      </div>

      <div className="bg-ide-bg border border-ide-border rounded-lg overflow-hidden font-mono shadow-lg shadow-ide-bg/80 relative" onClick={() => inputRef.current?.focus()}>
        <div className="bg-ide-sidebar px-4 py-2 flex items-center gap-2 border-b border-ide-border">
          <Terminal size={14} className="text-ide-muted" />
          <span className="text-xs text-ide-muted font-sans">bash -- 80x24</span>
        </div>
        
        <div className="p-6 text-sm min-h-[300px] max-h-[400px] overflow-y-auto">
          {history.map((entry) => (
            <div key={entry.id} className="mb-2 whitespace-pre-wrap">
              {entry.type === 'input' && (
                <div>
                  <span className="text-ide-keyword">POOJA_SALUNKHE@workspace</span> <span className="text-ide-text">~/portfolio</span>
                  <br />
                  <span className="text-ide-accent">$</span> <span className="text-ide-text ml-1">{entry.content}</span>
                </div>
              )}
              {entry.type === 'output' && (
                <div className="text-ide-text mt-1">{entry.content}</div>
              )}
              {entry.type === 'error' && (
                <div className="text-[#ff7b72] mt-1">{entry.content}</div>
              )}
            </div>
          ))}

          <div className="flex items-start mt-4">
            <div className="shrink-0">
              <span className="text-ide-keyword">POOJA_SALUNKHE@workspace</span> <span className="text-ide-text">~/portfolio</span>
              <br />
              <span className="text-ide-accent">$</span> 
            </div>
            <input 
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none border-none text-ide-text ml-2 flex-1 caret-ide-text"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
