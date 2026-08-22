import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ChatPanel from '../components/ChatPanel';
import TaskQueue from '../components/TaskQueue';
import ToolsGrid from '../components/ToolsGrid';
import { ArrowLeft, SlidersHorizontal, Award } from 'lucide-react';

const AgentWorkspacePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${API_URL}/api/agents/${id}`);
        setAgent(response.data);
      } catch (error) {
        console.error("Error fetching agent:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-lime)] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Agent not found</h2>
        <button onClick={() => navigate('/dashboard/agents')} className="btn-secondary text-sm">Return to Agents</button>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/dashboard/agents')}
        className="flex items-center text-[var(--text-muted)] hover:text-[var(--accent-lime)] transition-colors mb-6 text-sm font-medium gap-1"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Agents
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN — Profile */}
        <div className="lg:col-span-3 space-y-5">
          <div className="card-static overflow-hidden">
            <div className="h-20 opacity-80" style={{ background: `linear-gradient(135deg, ${agent.color}40, ${agent.color}10)` }} />
            <div className="px-5 pb-5 relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl -mt-8 mx-auto border-4 border-[var(--bg-primary)]"
                style={{ background: `${agent.color}15` }}
              >
                {agent.emoji}
              </div>
              <div className="text-center mt-3 mb-5">
                <h2 className="text-lg font-bold">{agent.name}</h2>
                <p className="text-xs text-[var(--text-muted)]">{agent.role}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.certifications.map((cert, i) => (
                      <span key={i} className="badge badge-blue text-[10px]">
                        <Award className="w-2.5 h-2.5" /> {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)]">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3">Performance</h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    <div>
                      <p className="text-[var(--text-muted)] text-[10px]">Score</p>
                      <p className="font-bold">—</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-muted)] text-[10px]">Outcomes</p>
                      <p className="font-bold">{agent.tasks}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-muted)] text-[10px]">Success Rate</p>
                      <p className="font-bold text-[var(--accent-emerald)]">—</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-muted)] text-[10px]">Avg Response</p>
                      <p className="font-bold">—</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-static p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">Autonomy Rules</h3>
              <SlidersHorizontal className="w-4 h-4 text-[var(--text-muted)]" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">Autonomy Level</span>
                  <span className="text-[var(--accent-lime)] font-bold">{agent.autonomy_level === 3 ? 'Full Auto' : agent.autonomy_level === 2 ? 'Semi-Auto' : 'Assist'}</span>
                </div>
                <input type="range" className="w-full accent-[var(--accent-lime)]" min="1" max="3" value={agent.autonomy_level} readOnly />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
                  <span>Assist</span><span>Semi</span><span>Full Auto</span>
                </div>
              </div>
              <div className="pt-2">
                <label className="text-xs font-medium block mb-1">Approval Threshold</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-[var(--text-muted)] text-sm">₹</span>
                  <input type="text" defaultValue="50,000" className="input-field !pl-7 !text-sm" />
                </div>
                <p className="text-[10px] text-[var(--text-muted)] mt-1">Ask before spending above this amount</p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN — Chat */}
        <div className="lg:col-span-6">
          <ChatPanel agentId={id || '1'} agentName={agent.name} agentEmoji={agent.emoji} />
        </div>

        {/* RIGHT COLUMN — Tasks & Tools */}
        <div className="lg:col-span-3 space-y-5">
          <TaskQueue />
          <ToolsGrid />
        </div>
      </div>
    </div>
  );
};

export default AgentWorkspacePage;
