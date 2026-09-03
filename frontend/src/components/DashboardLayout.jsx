import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search } from 'lucide-react';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col transition-all duration-300 relative"
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        {/* Top Bar */}
        <header className="h-16 border-b border-[var(--border-subtle)] flex items-center justify-between px-6 bg-[var(--bg-primary)] sticky top-0 z-30">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search agents, tasks, files..."
              className="input-field !pl-10 !py-2 !text-sm !rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="btn-icon relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-red)] rounded-full text-[9px] text-white font-bold flex items-center justify-center">3</span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-[var(--border-subtle)] flex justify-between items-center bg-white/[0.02]">
                    <span className="font-bold text-sm">Notifications</span>
                    <button className="text-xs text-[var(--accent-lime)] hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-3 border-b border-[var(--border-subtle)] hover:bg-white/[0.02] cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-white">Task Completed</span>
                        <span className="text-[10px] text-[var(--text-muted)]">2m ago</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">Priya has finished processing the Q3 Expense Report.</p>
                    </div>
                    <div className="p-3 border-b border-[var(--border-subtle)] hover:bg-white/[0.02] cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-white">Approval Needed</span>
                        <span className="text-[10px] text-[var(--text-muted)]">1h ago</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">Rahul requests approval to send 500 outreach emails.</p>
                    </div>
                    <div className="p-3 hover:bg-white/[0.02] cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-white">System Update</span>
                        <span className="text-[10px] text-[var(--text-muted)]">1d ago</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">AutoAgento has been updated to v1.2.0.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">All systems online</span>
            </div>
          </div>
        </header>

        {/* Page Content (routed via <Outlet />) */}
        <main className="flex-1 overflow-y-auto p-6" onClick={() => setShowNotifications(false)}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
