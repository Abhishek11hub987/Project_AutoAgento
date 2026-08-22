import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  MessageSquare, Settings, Award, Plus, Search,
  Filter
} from 'lucide-react';

const statusBadge = (status) => {
  const map = {
    online: { cls: 'badge-emerald', text: 'Online', dot: 'bg-[var(--accent-emerald)]' },
    busy: { cls: 'badge-amber', text: 'Working', dot: 'bg-[var(--accent-amber)]' },
    idle: { cls: 'badge-blue', text: 'Idle', dot: 'bg-[var(--text-muted)]' },
  };
  const s = map[status] || map.idle;
  return (
    <span className={`badge ${s.cls} text-[10px]`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} /> {s.text}
    </span>
  );
};

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${API_URL}/api/agents`);
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const workingAgents = agents.filter(a => a.status === 'busy').length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-1">Your AI Team</h1>
          <p className="text-sm text-[var(--text-secondary)]">{agents.length} agents hired • {workingAgents} currently working</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Hire New Agent
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search agents..." className="input-field !pl-10 !py-2.5" />
        </div>
        <button className="btn-icon"><Filter className="w-4 h-4" /></button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-lime)] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              className="card group overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Color Header */}
              <div className="h-2 w-full" style={{ background: agent.color }} />

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-105 duration-300"
                      style={{ background: `${agent.color}15` }}
                    >
                      {agent.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-base flex items-center gap-2">
                        {agent.name}
                        {statusBadge(agent.status)}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">{agent.role}</p>
                    </div>
                  </div>
                  <button className="btn-icon !w-8 !h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-1.5 mb-5 flex-1 content-start">
                  {agent.certifications.map((cert, ci) => (
                    <span key={ci} className="badge badge-blue text-[10px]">
                      <Award className="w-2.5 h-2.5" /> {cert}
                    </span>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
                  <div className="stat-card !p-3 text-center">
                    <p className="text-lg font-extrabold">{agent.tasks}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Tasks Done</p>
                  </div>
                  <div className="stat-card !p-3 text-center">
                    <p className="text-lg font-extrabold">{agent.score > 0 ? agent.score.toFixed(1) : '—'}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Score</p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={`/dashboard/agent/${agent.id}`}
                  className="btn-primary w-full text-center block py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Open Workspace
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Empty Desk / Hire More */}
          <motion.div
            className="card flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[350px] border-dashed !border-[var(--border-medium)] hover:border-[var(--accent-lime)] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
              <Plus className="w-7 h-7 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-base font-bold mb-1">More Agents Coming Soon</h3>
            <p className="text-xs text-[var(--text-muted)] mb-4">HR, Marketing, and Engineering agents are joining the team soon.</p>
            <button className="btn-secondary text-sm">Join Waitlist</button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AgentsPage;
