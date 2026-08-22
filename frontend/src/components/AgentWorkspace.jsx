import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ChatPanel from './ChatPanel';
import TaskQueue from './TaskQueue';
import ToolsGrid from './ToolsGrid';
import { ArrowLeft, SlidersHorizontal, Award } from 'lucide-react';

const AgentWorkspace = () => {
  const navigate = useNavigate();
  // Mock agent data
  const agent = {
    name: 'Priya',
    role: 'Finance Executive',
    color: '#EC4899',
    avatar_emoji: '👩‍💼',
    certifications: ['GST Filing', 'Tally Integration', 'Bank Reconciliation'],
    performance_score: 4.9,
    outcomes_delivered: 42,
    avg_response_time: '2m',
    success_rate: '98%'
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb Navigation */}
        <button onClick={() => navigate('/')} className="flex items-center text-stone-500 hover:text-indigo-600 transition-colors mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Office Floor
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (25% -> 3 cols) - Profile */}
          <div className="lg:col-span-3 space-y-6">
            <div className="neu-flat overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-pink-400 to-rose-400 opacity-80"></div>
              <div className="px-6 pb-6 relative">
                <div className="w-20 h-20 neu-flat flex items-center justify-center text-4xl -mt-10 mx-auto bg-[var(--bg-color)]">
                  {agent.avatar_emoji}
                </div>
                
                <div className="text-center mt-3 mb-6">
                  <h2 className="text-xl font-bold text-stone-900">{agent.name}</h2>
                  <p className="text-stone-500 text-sm">{agent.role}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.certifications.map((cert, idx) => (
                        <span key={idx} className="neu-pressed text-pink-600 text-xs px-3 py-1.5 rounded-full font-medium flex items-center">
                          <Award className="w-3 h-3 mr-1" /> {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-stone-100">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-3">Performance</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                      <div>
                        <p className="text-stone-500 text-xs">Score</p>
                        <p className="font-bold text-stone-900 flex items-center">{agent.performance_score} <span className="text-amber-400 ml-1">★</span></p>
                      </div>
                      <div>
                        <p className="text-stone-500 text-xs">Outcomes</p>
                        <p className="font-bold text-stone-900">{agent.outcomes_delivered}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 text-xs">Success Rate</p>
                        <p className="font-bold text-emerald-600">{agent.success_rate}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 text-xs">Avg Response</p>
                        <p className="font-bold text-stone-900">{agent.avg_response_time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="neu-flat p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Autonomy Rules</h3>
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Autonomy Level</span>
                    <span className="text-indigo-600 font-bold">Semi-Auto</span>
                  </div>
                  <input type="range" className="w-full accent-indigo-600" min="1" max="3" defaultValue="2" />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Assist</span>
                    <span>Semi</span>
                    <span>Full Auto</span>
                  </div>
                </div>
                <div className="pt-2">
                  <label className="text-xs font-medium text-slate-700 block mb-1">Approval Threshold</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-500 text-sm">₹</span>
                    <input type="text" defaultValue="50,000" className="w-full neu-pressed bg-transparent pl-7 pr-3 py-1.5 text-sm text-slate-800 focus:outline-none" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Ask before spending above this amount</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CENTER COLUMN (50% -> 6 cols) - Chat */}
          <div className="lg:col-span-6">
            <ChatPanel />
          </div>
          
          {/* RIGHT COLUMN (25% -> 3 cols) - Tasks & Tools */}
          <div className="lg:col-span-3">
            <TaskQueue />
            <ToolsGrid />
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AgentWorkspace;
