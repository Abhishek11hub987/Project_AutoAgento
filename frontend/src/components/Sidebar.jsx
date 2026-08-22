import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, MessageSquare, BarChart3,
  Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight,
  Bell, Search, UserPlus, Folder, Zap, Bot
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/dashboard/agents', icon: Users, label: 'Agents' },
  { to: '/dashboard/reports', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/files', icon: Folder, label: 'Files' },
];

import { Code, Briefcase, HelpCircle } from 'lucide-react';

const BOTTOM_ITEMS = [
  { to: '#', icon: Settings, label: 'Settings' },
  { to: '#', icon: HelpCircle, label: 'Help Center' },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`sidebar transition-all duration-300 ${collapsed ? '!w-[72px]' : 'w-[260px]'}`}>
      
      {/* Logo Section */}
      <div className={`flex items-center h-16 px-4 border-b border-[var(--border-subtle)] ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-lime)] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[var(--bg-primary)]" />
            </div>
            <span className="text-sm font-bold tracking-tight">AutoAgento</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-lime)] flex items-center justify-center mx-auto">
              <Bot className="w-5 h-5 text-[var(--bg-primary)]" />
            </div>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`btn-icon !w-7 !h-7 !rounded-md ${collapsed ? 'hidden' : ''}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="btn-icon !w-full !h-8 !rounded-md mb-3"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}

        <div className={`mb-4 ${collapsed ? 'px-1' : 'px-1'}`}>
          <p className={`text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3 ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? '—' : 'Main'}
          </p>
        </div>

        {NAV_ITEMS.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`sidebar-link ${active ? 'active' : ''} ${collapsed ? '!justify-center !px-2' : ''}`}
              title={item.label}
            >
              <item.icon className={`w-[18px] h-[18px] shrink-0 sidebar-icon ${active ? 'text-[var(--accent-lime)]' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}

        <div className={`mt-6 mb-3 ${collapsed ? 'px-1' : 'px-1'}`}>
          <p className={`text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3 ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? '—' : 'Support'}
          </p>
        </div>

        {BOTTOM_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.to}
            className={`sidebar-link ${collapsed ? '!justify-center !px-2' : ''}`}
            title={item.label}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0 sidebar-icon" />
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Creator Credits */}
      {!collapsed && (
        <div className="px-5 py-3 flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Built By</span>
            <span className="text-xs font-semibold">Abhishek</span>
          </div>
          <div className="flex gap-1.5">
            <a href="https://github.com/Abhishek11hub987" target="_blank" rel="noreferrer" className="w-6 h-6 rounded flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)] transition-colors" title="GitHub">
              <Code className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com/in/abhishek" target="_blank" rel="noreferrer" className="w-6 h-6 rounded flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)] transition-colors" title="LinkedIn">
              <Briefcase className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className={`px-3 py-4 border-t border-[var(--border-subtle)] ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-lime)]/10 flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--accent-lime)]">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">User</p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">Free Trial</p>
            </div>
            <LogOut className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--accent-red)] cursor-pointer" />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-lime)]/10 flex items-center justify-center cursor-pointer">
            <span className="text-sm font-bold text-[var(--accent-lime)]">U</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
