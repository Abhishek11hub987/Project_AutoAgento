import React, { useState } from 'react';
import { X, User, Shield, Bell, Monitor, Key } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SettingsModal = ({ isOpen, onClose, defaultTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!isOpen) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl w-full max-w-4xl h-[600px] flex overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className="w-64 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-6 px-2">Settings</h2>
          
          <nav className="flex-1 space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-[var(--accent-lime)]/10 text-[var(--accent-lime)]' : 'text-[var(--text-secondary)] hover:bg-white/5'}`}
            >
              <User className="w-4 h-4" /> Profile
            </button>
            <button 
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'bg-[var(--accent-lime)]/10 text-[var(--accent-lime)]' : 'text-[var(--text-secondary)] hover:bg-white/5'}`}
            >
              <Monitor className="w-4 h-4" /> Appearance
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-[var(--accent-lime)]/10 text-[var(--accent-lime)]' : 'text-[var(--text-secondary)] hover:bg-white/5'}`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-[var(--accent-lime)]/10 text-[var(--accent-lime)]' : 'text-[var(--text-secondary)] hover:bg-white/5'}`}
            >
              <Shield className="w-4 h-4" /> Security
            </button>
            <button 
              onClick={() => setActiveTab('api')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'api' ? 'bg-[var(--accent-lime)]/10 text-[var(--accent-lime)]' : 'text-[var(--text-secondary)] hover:bg-white/5'}`}
            >
              <Key className="w-4 h-4" /> API Keys
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
            <h3 className="font-semibold text-lg capitalize">{activeTab}</h3>
            <button onClick={onClose} className="btn-icon hover:text-[var(--accent-red)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 text-[var(--text-secondary)]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[var(--accent-lime)]/10 flex items-center justify-center text-2xl font-bold text-[var(--accent-lime)]">
                    U
                  </div>
                  <div>
                    <button className="btn-secondary text-sm px-4 py-2">Change Avatar</button>
                  </div>
                </div>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Display Name</label>
                    <input type="text" className="input-field w-full" defaultValue="User" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Email</label>
                    <input type="email" className="input-field w-full" defaultValue="user@example.com" disabled />
                  </div>
                </div>
                <div className="pt-6 border-t border-[var(--border-subtle)]">
                  <button onClick={handleLogout} className="btn-secondary text-sm text-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:text-white border-[var(--accent-red)]/20 px-4 py-2">
                    Log out of all devices
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <p>Customize your workspace experience.</p>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-3">Theme</label>
                  <div className="flex gap-4">
                    <button className="w-24 h-16 rounded-lg border-2 border-[var(--accent-lime)] bg-[#0d0e15]"></button>
                    <button className="w-24 h-16 rounded-lg border border-[var(--border-subtle)] bg-[#ffffff] opacity-50 cursor-not-allowed" title="Coming soon"></button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <p>Choose what you want to be notified about.</p>
                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <div>
                    <h4 className="font-bold text-white">Agent Task Completion</h4>
                    <p className="text-sm">Get notified when an agent finishes a task.</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 accent-[var(--accent-lime)]" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <div>
                    <h4 className="font-bold text-white">Approval Requests</h4>
                    <p className="text-sm">Get notified when an agent needs human approval.</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 accent-[var(--accent-lime)]" defaultChecked />
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-4">
                <p>Manage your API keys for integrating AutoAgento into your own apps.</p>
                <button className="btn-primary text-sm px-4 py-2">+ Generate New Key</button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <p>Manage your account security.</p>
                <button className="btn-secondary text-sm px-4 py-2">Change Password</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
