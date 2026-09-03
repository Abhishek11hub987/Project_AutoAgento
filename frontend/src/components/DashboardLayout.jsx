import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search } from 'lucide-react';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Task Completed', time: '2m ago', content: 'Priya has finished processing the Q3 Expense Report.', read: false },
    { id: 2, title: 'Approval Needed', time: '1h ago', content: 'Rahul requests approval to send 500 outreach emails.', read: false },
    { id: 3, title: 'System Update', time: '1d ago', content: 'AutoAgento has been updated to v1.2.0.', read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

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
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-red)] rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-[var(--border-subtle)] flex justify-between items-center bg-white/[0.02]">
                    <span className="font-bold text-sm">Notifications</span>
                    <div className="flex gap-3">
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-[var(--accent-lime)] hover:underline">Mark all as read</button>
                      )}
                      {notifications.length > 0 && (
                        <button onClick={clearAll} className="text-xs text-[var(--text-muted)] hover:text-white hover:underline">Clear all</button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-[var(--text-muted)]">
                        You have no notifications.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-3 border-b border-[var(--border-subtle)] hover:bg-white/[0.02] cursor-pointer ${!n.read ? 'bg-[var(--accent-lime)]/5' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-xs font-bold ${!n.read ? 'text-[var(--accent-lime)]' : 'text-white'}`}>{n.title}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">{n.time}</span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)]">{n.content}</p>
                        </div>
                      ))
                    )}
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
