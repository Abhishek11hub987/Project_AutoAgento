import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, TrendingDown, IndianRupee, Target,
  Activity, Clock, Users, ArrowUpRight
} from 'lucide-react';

const ReportsPage = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-1 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[var(--accent-cyan)]" />
            Analytics
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">Track your AI workforce performance and ROI</p>
        </div>
        <select className="input-field !w-auto !py-2 !text-sm">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* Big Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          { icon: IndianRupee, label: 'Revenue Impact', value: '₹0', trend: null, color: 'var(--accent-emerald)' },
          { icon: Target, label: 'Outcomes Delivered', value: '0', trend: null, color: 'var(--accent-cyan)' },
          { icon: Activity, label: 'Avg Cost Per Outcome', value: '—', trend: null, color: 'var(--accent-amber)' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="card-static p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}12` }}
              >
                <s.icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              {s.trend && (
                <span className={`badge ${s.trend > 0 ? 'badge-emerald' : 'badge-red'} text-[10px]`}>
                  {s.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {s.trend > 0 ? '+' : ''}{s.trend}%
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium mb-1">{s.label}</p>
            <p className="text-3xl font-extrabold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 card-static p-6">
          <h3 className="font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider mb-6">Performance Trend</h3>
          <div className="flex items-center justify-center py-16 text-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-7 h-7 text-[var(--text-muted)]" />
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">No data to display</p>
              <p className="text-xs text-[var(--text-muted)] max-w-xs">
                Charts will populate once agents start completing tasks. Assign your first task to get started.
              </p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card-static p-6">
          <h3 className="font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider mb-6">Recent Activity</h3>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-[var(--text-muted)]" />
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">No activity yet</p>
            <p className="text-[10px] text-[var(--text-muted)]">Agent actions will be logged here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
