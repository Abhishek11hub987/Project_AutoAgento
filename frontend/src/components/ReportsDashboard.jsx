import React from 'react';
import Header from './Header';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Target, Activity } from 'lucide-react';

const MOCK_ACTIVITY = [
  { id: 1, agent: 'Priya', task: 'GST Q1 Filing Draft', status: 'completed', time: '10 mins ago', amount: '₹12,000' },
  { id: 2, agent: 'Rahul', task: 'Lead Gen: Tech startups in Pune', status: 'completed', time: '1 hour ago', amount: '₹0' },
  { id: 3, agent: 'Anjali', task: 'NDA Review for Vendor X', status: 'escalated', time: '2 hours ago', amount: 'N/A' },
  { id: 4, agent: 'Priya', task: 'Bank Reconciliation (Mar)', status: 'completed', time: 'Yesterday', amount: '₹4,500' },
];

const ReportsDashboard = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-[#9EBCEC]" />
              Company Analytics
            </h1>
            <p className="text-slate-500 mt-1">Track your AI workforce performance and ROI</p>
          </div>
          <select className="neu-pressed bg-transparent text-slate-700 py-2 px-4 text-sm font-medium focus:outline-none">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>
        </div>

        {/* Big Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="neu-flat p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="neu-pressed p-3 rounded-xl text-emerald-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="flex items-center text-emerald-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" /> +24%
              </span>
            </div>
            <h3 className="text-slate-500 font-medium mb-1">Revenue Impact</h3>
            <p className="text-3xl font-bold text-slate-800">₹8.4L</p>
          </div>
          
          <div className="neu-flat p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="neu-pressed p-3 rounded-xl text-[#9EBCEC]">
                <Target className="w-6 h-6" />
              </div>
              <span className="flex items-center text-emerald-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" /> +12%
              </span>
            </div>
            <h3 className="text-slate-500 font-medium mb-1">Outcomes Delivered</h3>
            <p className="text-3xl font-bold text-slate-800">185</p>
          </div>

          <div className="neu-flat p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="neu-pressed p-3 rounded-xl text-amber-500">
                <Activity className="w-6 h-6" />
              </div>
              <span className="flex items-center text-red-500 text-sm font-medium">
                <TrendingDown className="w-4 h-4 mr-1" /> -4%
              </span>
            </div>
            <h3 className="text-slate-500 font-medium mb-1">Avg Cost Per Outcome</h3>
            <p className="text-3xl font-bold text-slate-800">₹142</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 neu-flat p-6">
            <h3 className="font-bold text-slate-800 mb-6">Performance Trend</h3>
            <div className="h-[300px] w-full flex items-end justify-between space-x-2 pb-4 border-b border-white/20">
              {/* Mock Bar Chart */}
              {[40, 55, 35, 70, 85, 60, 95].map((val, i) => (
                <div key={i} className="w-full neu-surface rounded-t-lg relative group transition-all" style={{ height: `${val}%` }}>
                  <div className="absolute inset-x-0 bottom-0 bg-[#9EBCEC] rounded-t-lg transition-all" style={{ height: `${val * 0.7}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="neu-flat p-6">
            <h3 className="font-bold text-slate-800 mb-6">Recent Activity Log</h3>
            <div className="space-y-6">
              {MOCK_ACTIVITY.map((act) => (
                <div key={act.id} className="relative pl-6 border-l-2 border-slate-200/50">
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full neu-surface flex items-center justify-center`}>
                     <div className={`w-2 h-2 rounded-full ${act.status === 'completed' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                  </div>
                  <div className="mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{act.agent}</span>
                    <span className="text-slate-500 text-sm ml-1">completed a task</span>
                  </div>
                  <p className="text-sm font-medium text-[#9EBCEC] drop-shadow-sm mb-1">{act.task}</p>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{act.time}</span>
                    <span className="font-medium text-slate-600">Value: {act.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ReportsDashboard;
