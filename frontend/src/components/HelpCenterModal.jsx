import React from 'react';
import { X, ExternalLink, Mail, MessageSquare, Book, Github, Linkedin, Briefcase, Code } from 'lucide-react';

const HelpCenterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-lime)]/10 text-[var(--accent-lime)] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Help Center</h2>
              <p className="text-xs text-[var(--text-muted)]">Get support or contact the creator</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 flex-1 overflow-y-auto">
          
          {/* Creator Section */}
          <div className="card p-5 border border-[var(--border-medium)] bg-[var(--bg-elevated)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-lime)]/5 rounded-full blur-3xl group-hover:bg-[var(--accent-lime)]/10 transition-colors" />
            
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">Meet The Creator</h3>
            
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-stone-700 to-stone-900 border-2 border-[var(--accent-lime)] flex items-center justify-center text-xl font-bold text-white shadow-lg relative z-10">
                AY
              </div>
              <div className="relative z-10">
                <h4 className="font-bold text-base text-[var(--text-primary)]">Abhishek Yadav</h4>
                <p className="text-xs text-[var(--text-muted)]">AI Engineer & Full-Stack Developer</p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 relative z-10">
              Have a question about AutoAgento, want to report a bug, or interested in a collaboration? Feel free to reach out directly through my professional networks!
            </p>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <a href="https://www.linkedin.com/in/abhishekyadavai" target="_blank" rel="noreferrer" className="btn-secondary w-full py-2.5 flex items-center justify-center gap-2 group/btn">
                <Briefcase className="w-4 h-4 text-[var(--accent-lime)] group-hover/btn:text-white transition-colors" />
                <span className="text-sm">LinkedIn</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </a>
              <a href="https://github.com/Abhishek11hub987" target="_blank" rel="noreferrer" className="btn-secondary w-full py-2.5 flex items-center justify-center gap-2 group/btn">
                <Code className="w-4 h-4 text-[var(--accent-lime)] group-hover/btn:text-white transition-colors" />
                <span className="text-sm">GitHub</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">Resources</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors border border-transparent hover:border-[var(--border-subtle)] text-left">
                <div className="flex items-center gap-3">
                  <Book className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-sm font-medium">Documentation</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors border border-transparent hover:border-[var(--border-subtle)] text-left">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-sm font-medium">Support Email</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">support@autoagento.com</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpCenterModal;
