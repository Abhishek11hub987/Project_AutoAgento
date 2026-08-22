import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Settings, Award, ShieldAlert, Clock, CheckCircle2 } from 'lucide-react';

const statusConfig = {
  active: {
    color: 'bg-emerald-500',
    banner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    text: 'Currently Working',
    icon: <Clock className="w-4 h-4 mr-1 animate-pulse" />
  },
  needs_approval: {
    color: 'bg-amber-400',
    banner: 'bg-amber-50 text-amber-700 border-amber-200',
    text: 'Needs Your Approval',
    icon: <ShieldAlert className="w-4 h-4 mr-1" />
  },
  escalated: {
    color: 'bg-red-500',
    banner: 'bg-red-50 text-red-700 border-red-200',
    text: 'Human Expert Assigned',
    icon: <ShieldAlert className="w-4 h-4 mr-1" />
  },
  idle: {
    color: 'bg-stone-400',
    banner: 'bg-stone-50 text-stone-600 border-stone-200',
    text: 'Waiting for next task',
    icon: <CheckCircle2 className="w-4 h-4 mr-1" />
  }
};

const AgentCard = ({ agent }) => {
  const navigate = useNavigate();
  const status = statusConfig[agent.status] || statusConfig.idle;
  
  return (
    <div className="neu-flat overflow-hidden group">
      <div className={`px-4 py-2 flex items-center justify-center text-sm font-medium ${status.banner}`}>
        {status.icon}
        {status.text}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner`} style={{ backgroundColor: `${agent.color}20` }}>
              {agent.avatar_emoji}
            </div>
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${status.color}`}>
              {agent.status === 'active' && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>}
            </span>
          </div>
          <button className="text-stone-400 hover:text-stone-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-bold text-stone-900 flex items-center">
            {agent.name}
            {agent.certifications?.length > 0 && (
              <Award className="w-4 h-4 text-indigo-500 ml-2" title={`${agent.certifications.length} Certifications`} />
            )}
          </h3>
          <p className="text-sm text-stone-500">{agent.role}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-6">
          <div className="neu-pressed px-3 py-1.5 rounded-lg flex items-center">
            <span className="text-slate-500 mr-1">Score:</span>
            <span className="font-semibold text-slate-900">{agent.performance_score.toFixed(1)}</span>
            <span className="text-amber-400 ml-1">★</span>
          </div>
          <div className="text-slate-500">
            <span className="font-semibold text-slate-900">{agent.outcomes_delivered}</span> outcomes
          </div>
        </div>
        
        <button 
          onClick={() => navigate(`/agent/${agent.id}`)}
          className="w-full neu-primary py-2.5 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Open Workspace
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
