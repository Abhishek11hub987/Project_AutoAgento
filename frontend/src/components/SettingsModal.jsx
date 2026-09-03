import React, { useState, useEffect } from 'react';
import { X, User, Shield, Bell, Monitor, Key, Check, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SettingsModal = ({ isOpen, onClose, defaultTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Profile State
  const [userEmail, setUserEmail] = useState('Loading...');
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // API Keys State
  const [apiKeys, setApiKeys] = useState({ gemini: '', openai: '', groq: '' });
  const [keysSaved, setKeysSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load User Data
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setUserEmail(user.email);
          setDisplayName(user.user_metadata?.name || user.user_metadata?.full_name || 'User');
        }
      });

      // Load API Keys from local storage
      const savedKeys = localStorage.getItem('autoagento_api_keys');
      if (savedKeys) {
        setApiKeys(JSON.parse(savedKeys));
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const saveProfile = async () => {
    setIsSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { name: displayName }
    });
    setIsSaving(false);
    if (!error) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const saveApiKeys = () => {
    localStorage.setItem('autoagento_api_keys', JSON.stringify(apiKeys));
    setKeysSaved(true);
    setTimeout(() => setKeysSaved(false), 3000);
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
                    {displayName ? displayName[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <button className="btn-secondary text-sm px-4 py-2">Change Avatar</button>
                  </div>
                </div>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Display Name</label>
                    <input 
                      type="text" 
                      className="input-field w-full" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Email</label>
                    <input type="email" className="input-field w-full opacity-60" value={userEmail} disabled />
                  </div>
                  <button 
                    onClick={saveProfile}
                    disabled={isSaving}
                    className="btn-primary w-full py-2.5 flex justify-center items-center gap-2 mt-2"
                  >
                    {isSaving ? 'Saving...' : saveSuccess ? <><Check className="w-4 h-4"/> Saved</> : <><Save className="w-4 h-4" /> Save Changes</>}
                  </button>
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
                    <button className="w-24 h-16 rounded-lg border border-[var(--border-subtle)] bg-[#ffffff] opacity-50 cursor-not-allowed flex items-center justify-center text-xs font-bold text-black" title="Coming soon">
                      WIP
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-3">Note: The white theme is currently a work in progress and disabled to prevent eye strain.</p>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <p>Choose what you want to be notified about. (Note: These are currently UI placeholders. Backend notifications will be wired up in a future update).</p>
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
              <div className="space-y-6">
                <p>Provide your own API keys for the agents to use. Keys are securely stored in your browser's local storage.</p>
                
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Gemini API Key</label>
                    <input 
                      type="password" 
                      placeholder="AIzaSy..." 
                      className="input-field w-full"
                      value={apiKeys.gemini}
                      onChange={(e) => setApiKeys({...apiKeys, gemini: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">OpenAI API Key</label>
                    <input 
                      type="password" 
                      placeholder="sk-..." 
                      className="input-field w-full"
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys({...apiKeys, openai: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Groq API Key</label>
                    <input 
                      type="password" 
                      placeholder="gsk_..." 
                      className="input-field w-full"
                      value={apiKeys.groq}
                      onChange={(e) => setApiKeys({...apiKeys, groq: e.target.value})}
                    />
                  </div>
                  
                  <button 
                    onClick={saveApiKeys}
                    className="btn-primary w-full py-2.5 flex justify-center items-center gap-2 mt-4"
                  >
                    {keysSaved ? <><Check className="w-4 h-4"/> Saved to Browser</> : <><Save className="w-4 h-4" /> Save API Keys</>}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <p>Manage your account security.</p>
                <p className="text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] p-3 rounded-lg bg-[var(--bg-card)]">
                  Because you signed in with Google OAuth, password management is disabled. You do not need a password to access AutoAgento.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
