import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Check, X, User, FileText, Users, Globe } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const INITIAL_MESSAGES = [
  { id: 1, role: 'system', content: 'Agent is ready. Start a conversation to begin.' }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ChatPanel = ({ agentId = 'priya', agentName = 'Priya', agentEmoji = '👩‍💼', onTaskStart, onTaskComplete }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilePath, setActiveFilePath] = useState(null);
  const [isMultiAgent, setIsMultiAgent] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (messageText = input) => {
    if (!messageText.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const taskId = Date.now();
    if (onTaskStart) {
      onTaskStart({ id: taskId, title: `Processing request`, status: 'running', date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) });
    }

    try {
      const strAgentId = String(agentId);
      const agentIdNormalized = strAgentId === '1' ? 'priya' : strAgentId === '2' ? 'rohit' : strAgentId === '3' ? 'anjali' : 'priya';
      
      const requestContext = activeFilePath ? { file_path: activeFilePath, multi_agent: isMultiAgent } : { multi_agent: isMultiAgent };
      requestContext.preferred_language = preferredLanguage;
      
      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: agentIdNormalized,
          user_id: 1,
          message: messageText,
          context: requestContext
        })
      });
      
      setIsLoading(false);
      if (onTaskComplete) onTaskComplete(taskId);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const agentMsgId = Date.now() + 1;
      
      setMessages(prev => [...prev, {
        id: agentMsgId,
        role: 'agent',
        content: '',
        toolCalls: [],
        hasApproval: false
      }]);

      let fullContent = "";
      let toolCalls = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.type === 'tool_call') {
                toolCalls.push(data.text);
                setMessages(prev => prev.map(msg => 
                  msg.id === agentMsgId ? { ...msg, toolCalls: [...toolCalls] } : msg
                ));
              } else if (data.text) {
                fullContent += data.text;
                setMessages(prev => prev.map(msg => 
                  msg.id === agentMsgId ? { ...msg, content: fullContent } : msg
                ));
              }
            } catch (e) {
              console.error("Error parsing stream JSON", e);
            }
          }
        }
      }
      
      // Removed mock approval logic


    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
      if (onTaskComplete) onTaskComplete(taskId);
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'agent',
        content: 'I\'m sorry, I am currently unable to connect to my reasoning engine. Please try again later.',
        hasApproval: false
      }]);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const userMsg = { id: Date.now(), role: 'user', content: `📎 Attached file: ${file.name}` };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${API_URL}/api/files/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setActiveFilePath(response.data.file_path);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', content: `I have received ${file.name}. I will analyze it right away.`, hasApproval: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', content: 'There was an error uploading your file.', hasApproval: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-static flex flex-col h-[700px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center text-xl">
            {agentEmoji}
          </div>
          <div>
            <h2 className="font-bold text-sm">{agentName}</h2>
            <div className="flex items-center text-[10px] text-[var(--text-muted)] gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)]" /> Online
            </div>
          </div>
        </div>
        
        {/* Language & Multi-Agent Toggles */}
        <div className="flex items-center gap-4 mr-2">
          <div className="flex items-center gap-2 border-r border-[var(--border-subtle)] pr-4">
            <Globe className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <select 
              value={preferredLanguage} 
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="bg-transparent text-xs font-medium text-[var(--text-muted)] focus:outline-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 font-medium">
              <Users className="w-3.5 h-3.5" /> 
              Multi-Agent
            </span>
            <button 
              onClick={() => setIsMultiAgent(!isMultiAgent)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isMultiAgent ? 'bg-[var(--accent-lime)]' : 'bg-[var(--bg-elevated)]'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-[var(--bg-primary)] transition-transform ${isMultiAgent ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 hide-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'system' && (
              <div className="w-full flex justify-center">
                <span className="text-[var(--text-muted)] text-[11px] px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] font-medium">
                  {msg.content}
                </span>
              </div>
            )}
            {msg.role === 'user' && (
              <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] bg-[var(--accent-lime)]/10 border border-[var(--accent-lime)]/20">
                <ReactMarkdown className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</ReactMarkdown>
              </div>
            )}
            {msg.role === 'agent' && (
              <div className="flex flex-col w-full max-w-[85%]">
                {msg.toolCalls && msg.toolCalls.map((tc, idx) => (
                  <div key={idx} className="mb-2 px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] font-medium flex items-center gap-2 max-w-fit">
                    <div className="w-1.5 h-1.5 bg-[var(--accent-lime)] rounded-full animate-pulse" />
                    {tc.replace('\\n', '')}
                  </div>
                ))}
                
                {msg.content && (
                  <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-[var(--bg-elevated)] border-l-2 border-[var(--accent-cyan)] prose prose-sm prose-invert max-w-none text-[var(--text-primary)]">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}

                {msg.hasApproval && (
                  <div className="mt-2 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <h4 className="font-bold text-sm mb-1">Approval Required</h4>
                    <p className="text-[10px] text-[var(--text-muted)] mb-3">Please review the proposed action.</p>
                    <div className="card-static p-3 mb-3 flex items-center justify-between cursor-pointer hover:border-[var(--border-medium)] transition-all">
                      <div className="flex items-center text-sm font-medium gap-2">
                        <FileText className="w-4 h-4 text-[var(--text-muted)]" />
                        Preview_Draft.pdf
                      </div>
                      <span className="text-[10px] text-[var(--accent-lime)] font-bold cursor-pointer">Preview</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button className="btn-icon"><X className="w-4 h-4" /></button>
                      <button className="btn-icon" title="Escalate to Human">
                        <User className="w-4 h-4 text-[var(--accent-red)]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--bg-elevated)] border-l-2 border-[var(--accent-cyan)] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border-subtle)]">
        <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
          {['Explain this to me', 'Verify amounts', 'Draft looks good'].map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap text-[11px] px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-lime)]/30 hover:text-[var(--accent-lime)] transition-all font-medium"
            >
              {chip}
            </button>
          ))}
        </div>
        <div className="relative flex items-center">
          <button onClick={() => fileInputRef.current?.click()} className="absolute left-3 p-1.5 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${agentName}...`}
            className="input-field !pl-10 !pr-14 !py-3 !rounded-full"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading && messages.length > 0 && messages[messages.length - 1].role === 'agent'}
            className="absolute right-2 w-9 h-9 rounded-full bg-[var(--accent-lime)] text-[var(--bg-primary)] flex items-center justify-center disabled:opacity-40 transition-all hover:shadow-[0_0_16px_rgba(200,255,0,0.3)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
