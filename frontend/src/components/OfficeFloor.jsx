import React from 'react';
import Header from './Header';
import AgentCard from './AgentCard';
import FloorAnalytics from './FloorAnalytics';
import { Plus } from 'lucide-react';

const MOCK_AGENTS = [
  {
    id: 1,
    name: 'Priya',
    role: 'Finance Executive',
    domain: 'finance',
    color: '#EC4899', // Pink
    avatar_emoji: '👩‍💼',
    certifications: ['GST Filing', 'Tally Integration', 'Bank Reconciliation'],
    status: 'needs_approval',
    performance_score: 4.9,
    outcomes_delivered: 42
  },
  {
    id: 2,
    name: 'Rahul',
    role: 'B2B Sales Researcher',
    domain: 'sales',
    color: '#3B82F6', // Blue
    avatar_emoji: '👨‍💼',
    certifications: ['LinkedIn Navigator', 'Lead Enrichment'],
    status: 'active',
    performance_score: 4.8,
    outcomes_delivered: 128
  },
  {
    id: 3,
    name: 'Anjali',
    role: 'Legal Assistant',
    domain: 'legal',
    color: '#A855F7', // Purple
    avatar_emoji: '👩‍⚖️',
    certifications: ['Contract Act Compliance', 'Company Law'],
    status: 'idle',
    performance_score: 5.0,
    outcomes_delivered: 15
  }
];

const OfficeFloor = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">FLOOR 3 • MAIN OFFICE</h1>
            <p className="text-slate-500 mt-1">Your active digital workforce</p>
          </div>
          <button className="text-slate-700 neu-flat font-medium py-2 px-5 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Another Desk
          </button>
        </div>
        
        <FloorAnalytics />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_AGENTS.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          
          {/* Empty Desk Placeholder */}
          <div className="neu-pressed flex flex-col items-center justify-center p-8 text-center cursor-pointer group min-h-[320px]">
            <div className="w-16 h-16 rounded-full neu-flat flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-1">Empty Desk</h3>
            <p className="text-sm text-slate-500">Hire a new agent to fill this spot</p>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default OfficeFloor;
