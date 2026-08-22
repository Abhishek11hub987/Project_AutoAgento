import React from 'react';
import { Mail, Calendar, Briefcase, Phone, FileText, Database } from 'lucide-react';

const TOOLS = [
  { id: 'email', name: 'Email', icon: <Mail className="w-5 h-5" />, connected: false, color: 'var(--accent-blue)' },
  { id: 'calendar', name: 'Calendar', icon: <Calendar className="w-5 h-5" />, connected: false, color: 'var(--accent-red)' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Briefcase className="w-5 h-5" />, connected: false, color: 'var(--accent-cyan)' },
  { id: 'apollo', name: 'Apollo.io', icon: <Database className="w-5 h-5" />, connected: false, color: 'var(--accent-amber)' },
  { id: 'whatsapp', name: 'WhatsApp', icon: <Phone className="w-5 h-5" />, connected: false, color: 'var(--accent-emerald)' },
  { id: 'tally', name: 'Tally ERP', icon: <FileText className="w-5 h-5" />, connected: false, color: 'var(--accent-purple)' },
];

const ToolsGrid = () => {
  return (
    <div className="card-static p-5">
      <h3 className="font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider mb-4">Integrations</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {TOOLS.map(tool => (
          <div
            key={tool.id}
            className="card p-3 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="mb-2" style={{ color: tool.connected ? tool.color : 'var(--text-muted)' }}>
              {tool.icon}
            </div>
            <span className="text-[11px] font-medium">{tool.name}</span>
            <span className={`text-[9px] mt-0.5 font-semibold ${tool.connected ? 'text-[var(--accent-emerald)]' : 'text-[var(--text-muted)]'}`}>
              {tool.connected ? 'Connected' : 'Connect'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
