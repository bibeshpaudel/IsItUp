import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkline } from '../components/Sparkline';
import { authService } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: { email?: boolean; password?: boolean } = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = true;
      valid = false;
    }
    if (!password) {
      newErrors.password = true;
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setLoading(true);
      try {
        await authService.login(email, password);
        setShowSuccess(true);
        setTimeout(() => {
          navigate(`${import.meta.env.BASE_URL}app`);
        }, 2000);
      } catch (err) {
        setLoading(false);
        alert('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-mono bg-ink text-ink overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-full lg:w-[52%] bg-ink relative overflow-hidden flex flex-col justify-between py-10 px-6 lg:px-12 shrink-0 min-h-[500px] lg:min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:28px_28px] pointer-events-none"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,217,126,0.12)_0%,transparent_70%)] -bottom-[100px] -right-[100px] pointer-events-none"></div>
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/15 to-transparent animate-scan pointer-events-none z-10"></div>

        <Link to="/" className="relative z-20 flex items-center gap-2.5 font-serif text-[22px] font-bold text-cream no-underline tracking-[-0.5px]">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-dot"></span>
          IsItUp
        </Link>

        <div className="relative z-20 flex-1 flex flex-col justify-center gap-0 py-10">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot"></span>
            Live monitor feed
          </div>

          {[
            { name: 'Production API', url: 'api.acme.com/v2/health', status: 'up', latency: '142ms', uptime: '99.98%', delay: '0.05s' },
            { name: 'Auth Service', url: 'auth.acme.com/token', status: 'up', latency: '89ms', uptime: '100%', delay: '0.1s' },
            { name: 'Payment Gateway', url: 'pay.acme.com/charge', status: 'warn', latency: '847ms', uptime: '97.2%', delay: '0.15s' },
            { name: 'Marketing Site', url: 'acme.com', status: 'up', latency: '218ms', uptime: '99.9%', delay: '0.2s' },
            { name: 'Staging API', url: 'staging-api.acme.com/health', status: 'up', latency: '305ms', uptime: '99.7%', delay: '0.25s' },
            { name: 'Webhook Receiver', url: 'hooks.acme.com/ingest', status: 'down', latency: 'timeout', uptime: 'DOWN', delay: '0.3s', borderNone: true },
          ].map((m, i) => (
            <div key={i} className={`flex items-center gap-3.5 py-[13px] border-b border-white/5 animate-float-up ${m.borderNone ? 'border-none' : ''}`} style={{ animationDelay: m.delay }}>
              <div className={`w-[7px] h-[7px] rounded-full shrink-0 ${m.status === 'up' ? 'bg-accent shadow-[0_0_6px_rgba(0,217,126,0.7)]' : m.status === 'warn' ? 'bg-warn' : 'bg-alert shadow-[0_0_6px_rgba(230,57,70,0.6)] animate-pulse-dot'}`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-white/70">{m.name}</div>
                <div className="text-[11px] text-white/25">{m.url}</div>
              </div>
              <div className="flex items-center gap-3.5">
                <Sparkline data={Array(14).fill(10)} isSmall isDown={m.status === 'down'} warnAfter={m.status === 'warn' ? 8 : undefined} />
                <div className={`text-[12px] ${m.status === 'down' ? 'text-alert' : m.status === 'warn' ? 'text-warn' : 'text-white/35'}`}>{m.latency}</div>
                <div className={`py-0.5 px-2 rounded-full text-[10px] tracking-[0.04em] ${m.status === 'up' ? 'bg-accent/10 text-accent' : m.status === 'warn' ? 'bg-warn/10 text-warn' : 'bg-alert/10 text-alert'}`}>{m.uptime}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex relative z-20 gap-0 border border-white/5 rounded-lg overflow-hidden">
          <div className="flex-1 p-4 px-5 border-r border-white/5 text-center">
            <span className="font-serif text-[22px] font-light italic text-accent block mb-1">4,200+</span>
            <span className="text-[10px] uppercase tracking-[0.08em] text-white/30">Monitors</span>
          </div>
          <div className="flex-1 p-4 px-5 border-r border-white/5 text-center">
            <span className="font-serif text-[22px] font-light italic text-accent block mb-1">&lt;45s</span>
            <span className="text-[10px] uppercase tracking-[0.08em] text-white/30">Avg alert</span>
          </div>
          <div className="flex-1 p-4 px-5 text-center">
            <span className="font-serif text-[22px] font-light italic text-accent block mb-1">99.97%</span>
            <span className="text-[10px] uppercase tracking-[0.08em] text-white/30">Platform uptime</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-cream flex flex-col items-center justify-center py-12 px-6 lg:px-10 relative overflow-y-auto right-panel-grid-bg">
        <div className="w-full max-w-[380px] animate-float-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-[11px] tracking-[0.1em] uppercase text-muted mb-2.5 flex items-center gap-1.5 before:content-[''] before:w-5 before:h-px before:bg-muted">Welcome back</div>
          <h1 className="font-serif text-[36px] font-light tracking-[-1px] leading-[1.1] text-ink mb-2">Sign in to<br /><em className="italic text-accent-dim">your monitors.</em></h1>
          <p className="text-[13px] text-muted mb-9 leading-[1.6]">Don't have an account? <Link to="/register" className="text-ink underline underline-offset-3">Create one free →</Link></p>

          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F25022" d="M2 2h9v9H2z" />
                <path fill="#00A4EF" d="M2 13h9v9H2z" />
                <path fill="#7FBA00" d="M13 2h9v9h-9z" />
                <path fill="#FFB900" d="M13 13h9v9h-9z" />
              </svg>
              Microsoft
            </button>
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FC6D26" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.955 9.497c-.055-.165-1.921-5.911-1.921-5.911a.852.852 0 0 0-1.614 0s-1.258 3.864-1.282 3.945H4.86c-.024-.081-1.282-3.945-1.282-3.945a.852.852 0 0 0-1.614 0S.1 9.332.045 9.497c-.057.172-.016.368.106.5l11.758 8.784a.151.151 0 0 0 .18 0L23.85 9.997c.123-.132.164-.328.105-.5z" />
              </svg>
              GitLab
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6 text-[11px] text-muted tracking-[0.06em] uppercase before:content-[''] before:flex-1 before:h-px before:bg-border after:content-[''] after:flex-1 after:h-px after:bg-border">or sign in with email</div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-[11px] tracking-[0.06em] uppercase text-muted mb-1.5">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: false }); }}
                  className={`w-full py-[11px] px-3.5 bg-paper border rounded-md font-mono text-[13px] text-ink outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,217,126,0.08)] placeholder:text-ink/30 ${errors.email ? 'border-alert/40 bg-alert/5 focus:border-alert/40' : 'border-border focus:border-border-focus'}`}
                />
              </div>
              {errors.email && <div className="text-[11px] text-alert mt-1.5">Please enter a valid email address.</div>}
            </div>

            <div className="mb-4">
              <label className="block text-[11px] tracking-[0.06em] uppercase text-muted mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: false }); }}
                  className={`w-full py-[11px] px-3.5 bg-paper border rounded-md font-mono text-[13px] text-ink outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,217,126,0.08)] placeholder:text-ink/30 ${errors.password ? 'border-alert/40 bg-alert/5 focus:border-alert/40' : 'border-border focus:border-border-focus'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-muted text-[13px] p-1 transition-colors hover:text-ink">
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <div className="text-[11px] text-alert mt-1.5">Password is required.</div>}
            </div>

            <div className="flex items-center justify-between mb-6 text-[12px]">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="hidden peer" />
                <span className="w-4 h-4 rounded border border-border bg-paper flex items-center justify-center shrink-0 transition-all text-[9px] text-transparent peer-checked:bg-ink peer-checked:border-ink peer-checked:text-accent">✓</span>
                <span className="text-muted">Remember me</span>
              </label>
              <a href="#" className="text-muted no-underline transition-colors hover:text-ink">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="w-full p-3 bg-ink text-cream font-mono text-[14px] border-none rounded-md cursor-pointer transition-all flex items-center justify-center gap-2.5 mb-5 relative overflow-hidden group hover:bg-[#1a1a24] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.04)_100%)]"></div>
              {loading ? 'Signing in…' : 'Sign in'}
              {!loading && <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>}
            </button>
          </form>

          <p className="text-[12px] text-muted text-center mt-1">
            New to IsItUp? <Link to="/register" className="text-ink underline underline-offset-3">Create a free account</Link>
          </p>
        </div>
      </div>

      {/* Success Toast */}
      <div className={`fixed top-6 right-6 bg-ink text-cream py-3.5 px-5 rounded-lg text-[13px] flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[999] ${showSuccess ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        Signed in — redirecting to dashboard…
      </div>
    </div>
  );
}
