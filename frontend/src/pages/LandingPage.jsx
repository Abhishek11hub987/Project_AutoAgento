import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Bot, BarChart3, Shield, Zap, Globe, FileText,
  Users, TrendingUp, CheckCircle2, ChevronRight,
  Brain, Sparkles, Clock, MessageSquare,
  Target, Award, Play, Mail, Phone, MapPin,
  Share2, Link2, ExternalLink, ArrowUpRight, Code2
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════ */
/*  FLOATING WIDGET                                        */
/* ═══════════════════════════════════════════════════════ */
const FloatingWidget = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`card-static p-4 ${className}`}
  >
    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════ */
/*  SECTION WRAPPER                                        */
/* ═══════════════════════════════════════════════════════ */
const Section = ({ children, id, className = '' }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="max-w-7xl mx-auto px-5 md:px-8">{children}</div>
  </section>
);

const SectionTag = ({ children }) => (
  <span className="badge badge-lime mb-4 inline-flex">
    <Sparkles className="w-3 h-3" />
    {children}
  </span>
);

/* ═══════════════════════════════════════════════════════ */
/*  NAVBAR                                                 */
/* ═══════════════════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-lime)] flex items-center justify-center">
            <Bot className="w-5 h-5 text-[var(--bg-primary)]" />
          </div>
          <span className="text-lg font-bold tracking-tight">AutoAgento</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <a href="#features" className="btn-ghost">Features</a>
          <a href="#how-it-works" className="btn-ghost">How it Works</a>
          <a href="#agents" className="btn-ghost">Agents</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="btn-secondary text-sm hidden sm:inline-flex">Sign In</Link>
          <Link to="/dashboard" className="btn-primary text-sm flex items-center gap-1.5">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════ */
/*  HERO SECTION                                           */
/* ═══════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-mesh" />
    <div className="absolute inset-0 bg-grid opacity-30" />
    <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-[var(--accent-lime)] rounded-full blur-[128px] opacity-[0.07]" />
    <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-[var(--accent-blue)] rounded-full blur-[128px] opacity-[0.07]" />

    <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column — Text */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <span className="badge badge-lime">
              <Zap className="w-3 h-3" /> Open Source AI Staffing Platform
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6"
          >
            Hire AI Employees
            <br />
            <span className="text-gradient">That Actually Work.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg"
          >
            AutoAgento gives your business a virtual office staffed with named, 
            certified AI employees — from GST filing to B2B sales research — delivering 
            real business outcomes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link to="/dashboard" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2">
              <Play className="w-4 h-4" /> How it Works
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-6 text-sm text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)]" /> 100% Free & Open Source</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)]" /> Self-hostable</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)]" /> Bring your own API keys</span>
          </motion.div>
        </div>

        {/* Right Column — Dashboard Preview */}
        <div className="relative hidden lg:flex items-center justify-center h-full w-full pl-8">
          
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            style={{ perspective: 1000 }}
            className="relative z-10 w-full max-w-[480px]"
          >
            {/* Main Window */}
            <div className="rounded-[24px] border border-white/[0.08] bg-[#161721]/95 backdrop-blur-xl shadow-[0_0_80px_rgba(200,255,0,0.03)] overflow-hidden">
              
              {/* Window Header */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-white/[0.04] bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs font-semibold text-white/30 tracking-wider">AutoAgento Dashboard</span>
              </div>
              
              {/* Agent List */}
              <div className="p-6 space-y-4">
                {[
                  { name: 'Priya', role: 'Finance', emoji: '👩‍💼' },
                  { name: 'Rahul', role: 'Sales', emoji: '👨‍💼' },
                  { name: 'Anjali', role: 'Legal', emoji: '👩‍⚖️' },
                ].map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center justify-between p-4 rounded-[20px] bg-[#222432] border border-white/[0.03] shadow-sm hover:border-white/[0.08] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-xl shadow-inner">
                        {a.emoji}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-white/90 leading-tight">{a.name}</p>
                        <p className="text-[12px] font-medium text-white/40 mt-0.5">{a.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
                      <span className="text-[11px] font-bold text-white/30">Ready</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-6 pt-1 pb-8">
                <div className="p-4 rounded-[20px] bg-[#1a1c28] border border-white/[0.04] flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-white/20" />
                  <span className="text-sm font-medium text-white/20">Chat with your agents...</span>
                </div>
              </div>
            </div>

            {/* Floating widget 1 - Open Source */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
              className="absolute -left-12 top-10 z-20 animate-float"
            >
              <div className="px-5 py-3.5 rounded-2xl bg-[#161721] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-2.5 backdrop-blur-md">
                <Code2 className="w-4 h-4 text-[#c8ff00]" />
                <span className="text-sm font-bold text-white/90">Open Source</span>
              </div>
            </motion.div>

            {/* Floating widget 2 - Data Privacy */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="absolute -right-16 bottom-24 z-20 animate-float-slow"
            >
              <div className="px-5 py-3.5 rounded-2xl bg-[#161721] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-2.5 backdrop-blur-md">
                <Shield className="w-4 h-4 text-[#00e5ff]" />
                <span className="text-sm font-bold text-white/90">Your data stays yours</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════ */
/*  FEATURES                                               */
/* ═══════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'Named AI Employees',
    desc: 'Each agent has a name, role, personality, and certifications — just like hiring a real person for your team.',
    color: 'var(--accent-lime)',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Domain Intelligence',
    desc: 'Agents understand Indian business context: GST, TDS, MCA filings, FEMA compliance, and more.',
    color: 'var(--accent-purple)',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Human-in-the-Loop',
    desc: 'Set autonomy levels and approval thresholds. No AI action goes unchecked above your comfort zone.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Real Deliverables',
    desc: 'Agents produce Excel files, PDF reports, drafted emails, and structured data — not just chat responses.',
    color: 'var(--accent-amber)',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Hinglish & Regional',
    desc: 'Chat in English, Hindi, or Hinglish. Regional language support via Bhashini integration.',
    color: 'var(--accent-emerald)',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Outcome Analytics',
    desc: 'Track tasks completed, agent performance, response times, and business outcomes in a live dashboard.',
    color: 'var(--accent-pink)',
  },
];

const Features = () => (
  <Section id="features" className="relative">
    <div className="absolute inset-0 bg-mesh opacity-50" />
    <div className="relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <SectionTag>Features</SectionTag>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Everything you need to run a
          <span className="text-gradient"> digital workforce</span>
        </h2>
        <p className="text-[var(--text-secondary)]">
          Purpose-built for Indian SMBs. Every feature designed to save you time and effort.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            className="card p-6 group cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${f.color}15`, color: f.color }}
            >
              {f.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

/* ═══════════════════════════════════════════════════════ */
/*  MEET YOUR AGENTS                                       */
/* ═══════════════════════════════════════════════════════ */
const AGENTS = [
  { name: 'Priya', role: 'Finance Executive', emoji: '👩‍💼', color: 'var(--accent-pink)', certs: ['GST Filing', 'Tally', 'Bank Reconciliation'], desc: 'Handles GST, TDS, invoicing, bank reconciliation, and financial compliance work.' },
  { name: 'Rahul', role: 'B2B Sales Researcher', emoji: '👨‍💼', color: 'var(--accent-blue)', certs: ['LinkedIn Navigator', 'Lead Enrichment'], desc: 'Finds leads, enriches contact data, drafts outbound emails, and manages your pipeline.' },
  { name: 'Anjali', role: 'Legal Assistant', emoji: '👩‍⚖️', color: 'var(--accent-purple)', certs: ['Contract Act', 'Company Law'], desc: 'Reviews contracts, flags risk clauses, and keeps compliance documents up to date.' },
  { name: 'Rohit', role: 'Data Analyst', emoji: '👨‍💻', color: 'var(--accent-emerald)', certs: ['Excel Automation', 'MIS Reports'], desc: 'Crunches spreadsheets, builds MIS reports, and automates repetitive data tasks.' },
];

const MeetAgents = () => (
  <Section id="agents" className="border-t border-[var(--border-subtle)]">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <SectionTag>Your Team</SectionTag>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Meet your <span className="text-gradient">AI Employees</span>
      </h2>
      <p className="text-[var(--text-secondary)]">
        Each agent is a specialist in their domain, ready to join your virtual office on day one.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {AGENTS.map((a, i) => (
        <motion.div
          key={i}
          className="card p-6 text-center group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div 
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl transition-transform group-hover:scale-110 duration-300"
            style={{ background: `${a.color}15` }}
          >
            {a.emoji}
          </div>
          <h3 className="text-lg font-bold mb-0.5">{a.name}</h3>
          <p className="text-xs text-[var(--text-muted)] mb-3">{a.role}</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{a.desc}</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {a.certs.map((c, ci) => (
              <span key={ci} className="badge badge-lime text-[10px]">
                <Award className="w-2.5 h-2.5" /> {c}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

/* ═══════════════════════════════════════════════════════ */
/*  HOW IT WORKS                                           */
/* ═══════════════════════════════════════════════════════ */
const STEPS = [
  { icon: <Users className="w-7 h-7" />, title: 'Pick Your Agents', desc: 'Browse the agent roster. Select specialists by domain — finance, sales, legal, or data.' },
  { icon: <MessageSquare className="w-7 h-7" />, title: 'Assign Tasks via Chat', desc: 'Chat with your agents in plain English or Hinglish. Upload files. Set deadlines and autonomy levels.' },
  { icon: <Target className="w-7 h-7" />, title: 'Get Real Outcomes', desc: 'Receive Excel sheets, filed returns, drafted contracts, and enriched lead lists — not just chat replies.' },
  { icon: <BarChart3 className="w-7 h-7" />, title: 'Track & Scale', desc: 'Monitor performance in your analytics dashboard. Scale from 1 agent to as many as you need.' },
];

const HowItWorks = () => (
  <Section id="how-it-works" className="bg-[var(--bg-secondary)] rounded-none">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <SectionTag>How it Works</SectionTag>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Up and running in <span className="text-gradient">4 simple steps</span>
      </h2>
    </div>

    <div className="grid md:grid-cols-4 gap-6">
      {STEPS.map((s, i) => (
        <motion.div
          key={i}
          className="relative text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--accent-lime)] text-[var(--bg-primary)] text-sm font-bold flex items-center justify-center z-10">
            {i + 1}
          </div>
          {i < 3 && <div className="hidden md:block absolute top-0.5 left-[calc(50%+20px)] right-[-50%] h-[2px] bg-[var(--border-subtle)]" />}
          <div className="card-static p-6 pt-10">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(200, 255, 0, 0.08)', color: 'var(--accent-lime)' }}>
              {s.icon}
            </div>
            <h3 className="text-base font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

/* ═══════════════════════════════════════════════════════ */
/*  CTA BANNER                                             */
/* ═══════════════════════════════════════════════════════ */
const CTABanner = () => (
  <Section className="border-t border-[var(--border-subtle)]">
    <motion.div 
      className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
      style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(200, 255, 0, 0.08) 100%)' }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to build your <span className="text-gradient">AI team?</span>
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
          AutoAgento is free and open source. Deploy it yourself or use our hosted version to get started instantly.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/dashboard" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary text-base px-10 py-4 inline-flex items-center gap-2">
            <Code2 className="w-5 h-5" /> View on GitHub
          </a>
        </div>
      </div>
    </motion.div>
  </Section>
);

/* ═══════════════════════════════════════════════════════ */
/*  FOOTER                                                 */
/* ═══════════════════════════════════════════════════════ */
const Footer = () => (
  <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-lime)] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[var(--bg-primary)]" />
            </div>
            <span className="text-lg font-bold">AutoAgento</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 max-w-sm">
            An open-source AI staffing platform for Indian businesses. Hire certified AI employees that handle GST filing, sales research, legal review, and data analysis.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">Navigate</h4>
          <ul className="space-y-2.5">
            <li><a href="#features" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">Features</a></li>
            <li><a href="#agents" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">Agents</a></li>
            <li><a href="#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">How it Works</a></li>
            <li><Link to="/dashboard" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        {/* Project Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">Project</h4>
          <ul className="space-y-2.5">
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">GitHub Repository</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">Report a Bug</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">Contribute</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors">MIT License</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--border-subtle)] pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} AutoAgento. Open source under MIT License. Made with 🇮🇳 in India.</p>
          <p className="flex items-center gap-1">
            Powered by <span className="text-[var(--accent-lime)] font-semibold">Gemini AI</span> + <span className="text-[var(--accent-purple)] font-semibold">Groq</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════ */
/*  MAIN LANDING PAGE EXPORT                               */
/* ═══════════════════════════════════════════════════════ */
const LandingPage = () => (
  <div className="min-h-screen bg-[var(--bg-primary)]">
    <Navbar />
    <Hero />
    <Features />
    <MeetAgents />
    <HowItWorks />
    <CTABanner />
    <Footer />
  </div>
);

export default LandingPage;
