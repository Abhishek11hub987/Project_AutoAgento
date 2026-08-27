import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../config/api';
import {
  TrendingUp, TrendingDown, Users, IndianRupee, Activity,
  Zap, ArrowUpRight, CheckCircle2, Clock, AlertCircle,
  BarChart3, Target, Bot, Plus
} from 'lucide-react';

const iconMap = {
  Users: Users,
  CheckCircle2: CheckCircle2,
  IndianRupee: IndianRupee,
  Clock: Clock
};

/* ═══════════════════════════════════════════ */
/*  STAT CARDS ROW                             */
/* ═══════════════════════════════════════════ */
const StatsRow = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {stats.map((s, i) => {
      const Icon = iconMap[s.icon_name] || Users;
      return (
        <motion.div
          key={i}
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${s.color}12` }}
            >
              <Icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            {s.trend === 'up' && (
              <span className="badge badge-emerald text-[10px]">
                <TrendingUp className="w-3 h-3" /> Up
              </span>
            )}
          </div>
          <p className="text-2xl font-extrabold mb-0.5">{s.value}</p>
          <p className="text-xs text-[var(--text-muted)]">{s.change}</p>
        </motion.div>
      );
    })}
  </div>
);

/* ═══════════════════════════════════════════ */
/*  QUICK ACTIONS                              */
/* ═══════════════════════════════════════════ */
const QuickActions = () => (
  <div className="card-static p-5 mb-8">
    <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Quick Actions</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { icon: Bot, label: 'Chat with Priya', color: 'var(--accent-pink)', to: '/dashboard/agent/1' },
        { icon: Users, label: 'Hire New Agent', color: 'var(--accent-lime)', to: '/dashboard/agents' },
        { icon: BarChart3, label: 'View Analytics', color: 'var(--accent-cyan)', to: '/dashboard/reports' },
        { icon: Target, label: 'Assign a Task', color: 'var(--accent-amber)', to: '/dashboard/agent/1' },
      ].map((a, i) => (
        <Link
          key={i}
          to={a.to}
          className="card p-4 flex flex-col items-center text-center group cursor-pointer"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 duration-300"
            style={{ background: `${a.color}12` }}
          >
            <a.icon className="w-5 h-5" style={{ color: a.color }} />
          </div>
          <span className="text-xs font-semibold">{a.label}</span>
        </Link>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════ */
/*  RECENT ACTIVITY                            */
/* ═══════════════════════════════════════════ */
const RecentActivity = ({ activity }) => (
  <div className="card-static p-5">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Recent Activity</h3>
      <Link to="/dashboard/reports" className="text-xs text-[var(--accent-lime)] font-semibold flex items-center gap-1 hover:underline">
        View all <ArrowUpRight className="w-3 h-3" />
      </Link>
    </div>

    {activity.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
          <Activity className="w-7 h-7 text-[var(--text-muted)]" />
        </div>
        <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">No activity yet</p>
        <p className="text-xs text-[var(--text-muted)] max-w-xs">
          Start chatting with an agent or assign a task. All agent activity will appear here in real-time.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {activity.map((act) => (
          <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-[var(--border-subtle)]">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-[var(--accent-lime)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">{act.description}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">{new Date(act.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ═══════════════════════════════════════════ */
/*  AGENT STATUS SIDEBAR                       */
/* ═══════════════════════════════════════════ */
const AgentStatusPanel = ({ agents }) => {
  return (
    <div className="card-static p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Your Agents</h3>
        <Link to="/dashboard/agents" className="badge badge-lime text-[10px] cursor-pointer">
          <Plus className="w-3 h-3" /> Hire
        </Link>
      </div>

      <div className="space-y-3">
        {agents.map((a, i) => (
          <Link
            key={i}
            to={`/dashboard/agent/${a.id}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-105"
              style={{ background: `${a.color}15` }}
            >
              {a.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{a.name}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{a.role}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${a.status === 'online' ? 'bg-[var(--accent-emerald)]' : a.status === 'busy' ? 'bg-[var(--accent-amber)]' : 'bg-[var(--text-muted)]'}`} />
              <span className="text-[10px] text-[var(--text-muted)] capitalize">{a.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════ */
/*  DASHBOARD PAGE (assembled)                 */
/* ═══════════════════════════════════════════ */
const DashboardHome = () => {
  const [stats, setStats] = useState([
    { label: 'Active Agents', value: '...', change: '', trend: 'neutral', icon_name: 'Users', color: 'var(--accent-lime)' },
    { label: 'Tasks Completed', value: '...', change: '', trend: 'neutral', icon_name: 'CheckCircle2', color: 'var(--accent-cyan)' },
    { label: 'Revenue Impact', value: '...', change: '', trend: 'neutral', icon_name: 'IndianRupee', color: 'var(--accent-emerald)' },
    { label: 'Avg Response', value: '...', change: '', trend: 'neutral', icon_name: 'Clock', color: 'var(--accent-purple)' },
  ]);
  const [activity, setActivity] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes, agentsRes] = await Promise.all([
          axios.get(`${API_URL}/api/dashboard/stats`),
          axios.get(`${API_URL}/api/dashboard/activity`),
          axios.get(`${API_URL}/api/agents`)
        ]);
        setStats(statsRes.data.stats);
        setActivity(activityRes.data);
        setAgents(agentsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight mb-1">
          Welcome back 👋
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Here's what's happening with your AI workforce today.
        </p>
      </div>

      <StatsRow stats={stats} />
      <QuickActions />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity activity={activity} />
        </div>
        <div>
          <AgentStatusPanel agents={agents} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
