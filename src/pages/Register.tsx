import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    role: '',
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const getPasswordStrength = (val: string) => {
    if (!val) return { score: 0, label: 'Weak', color: 'var(--color-alert)' };
    let score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/[0-9!@#$%^&*]/.test(val)) score++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'var(--color-alert)', 'var(--color-warn)', '#f6c90e', 'var(--color-accent)'];

    return { score, label: labels[score] || 'Weak', color: colors[score] || 'var(--color-alert)' };
  };

  const pwStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: Record<string, boolean> = {};

    if (!formData.fname.trim()) { newErrors.fname = true; valid = false; }
    if (!formData.lname.trim()) { newErrors.lname = true; valid = false; }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = true; valid = false; }
    if (formData.password.length < 8) { newErrors.password = true; valid = false; }
    if (!formData.terms) { newErrors.terms = true; valid = false; }

    setErrors(newErrors);

    if (valid) {
      setLoading(true);
      try {
        await authService.register(formData);
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/app');
        }, 2200);
      } catch (err) {
        setLoading(false);
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-mono bg-cream text-ink">
      {/* LEFT PANEL */}
      <div className="flex-1 bg-cream flex flex-col items-center justify-center py-12 px-5 lg:px-10 relative overflow-y-auto left-panel-grid-bg">
        <div className="w-full max-w-[400px] animate-float-up">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[12px] text-muted no-underline mb-8 transition-colors hover:text-ink">← Back to IsItUp</Link>

          <div className="text-[11px] tracking-[0.1em] uppercase text-muted mb-2.5 flex items-center gap-1.5 before:content-[''] before:w-5 before:h-px before:bg-muted">Get started</div>
          <h1 className="font-serif text-[36px] font-light tracking-[-1px] leading-[1.1] text-ink mb-2">Create your<br /><em className="italic text-accent-dim">free account.</em></h1>
          <p className="text-[13px] text-muted mb-8 leading-[1.6]">Already have an account? <Link to="/login" className="text-ink underline underline-offset-3">Sign in →</Link></p>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-2.5 mb-5.5">
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F25022" d="M2 2h9v9H2z" />
                <path fill="#00A4EF" d="M2 13h9v9H2z" />
                <path fill="#7FBA00" d="M13 2h9v9h-9z" />
                <path fill="#FFB900" d="M13 13h9v9h-9z" />
              </svg>
              Continue with Microsoft
            </button>
            <button className="flex items-center justify-center gap-2 py-[11px] px-4 bg-paper border border-border rounded-md font-mono text-[12px] text-ink cursor-pointer transition-all hover:bg-paper-2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FC6D26" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.955 9.497c-.055-.165-1.921-5.911-1.921-5.911a.852.852 0 0 0-1.614 0s-1.258 3.864-1.282 3.945H4.86c-.024-.081-1.282-3.945-1.282-3.945a.852.852 0 0 0-1.614 0S.1 9.332.045 9.497c-.057.172-.016.368.106.5l11.758 8.784a.151.151 0 0 0 .18 0L23.85 9.997c.123-.132.164-.328.105-.5z" />
              </svg>
              Continue with GitLab
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5.5 text-[11px] text-muted tracking-[0.06em] uppercase before:content-[''] before:flex-1 before:h-px before:bg-border after:content-[''] after:flex-1 after:h-px after:bg-border">or register with email</div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
              <div>
                <label className="block text-[11px] tracking-[0.06em] uppercase text-muted mb-1.5">First name</label>
                <input
                  type="text" name="fname" placeholder="Alex" value={formData.fname} onChange={handleChange}
                  className={`w-full py-[11px] px-3.5 bg-paper border rounded-md font-mono text-[13px] text-ink outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,217,126,0.08)] placeholder:text-ink/30 ${errors.fname ? 'border-alert/40 bg-alert/5 focus:border-alert/40' : 'border-border focus:border-border-focus'}`}
                />
                {errors.fname && <div className="text-[11px] text-alert mt-1.5">Required.</div>}
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.06em] uppercase text-muted mb-1.5">Last name</label>
                <input
                  type="text" name="lname" placeholder="Kim" value={formData.lname} onChange={handleChange}
                  className={`w-full py-[11px] px-3.5 bg-paper border rounded-md font-mono text-[13px] text-ink outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,217,126,0.08)] placeholder:text-ink/30 ${errors.lname ? 'border-alert/40 bg-alert/5 focus:border-alert/40' : 'border-border focus:border-border-focus'}`}
                />
                {errors.lname && <div className="text-[11px] text-alert mt-1.5">Required.</div>}
              </div>
            </div>

            <div className="mb-3.5">
              <label className="block text-[11px] tracking-[0.06em] uppercase text-muted mb-1.5">Work email</label>
              <input
                type="email" name="email" placeholder="alex@company.com" value={formData.email} onChange={handleChange}
                className={`w-full py-[11px] px-3.5 bg-paper border rounded-md font-mono text-[13px] text-ink outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,217,126,0.08)] placeholder:text-ink/30 ${errors.email ? 'border-alert/40 bg-alert/5 focus:border-alert/40' : 'border-border focus:border-border-focus'}`}
              />
              {errors.email && <div className="text-[11px] text-alert mt-1.5">Please enter a valid email address.</div>}
            </div>

            <div className="mb-3.5">
              <label className="block text-[11px] tracking-[0.06em] uppercase text-muted mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} name="password" placeholder="At least 8 characters" value={formData.password} onChange={handleChange}
                  className={`w-full py-[11px] px-3.5 bg-paper border rounded-md font-mono text-[13px] text-ink outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,217,126,0.08)] placeholder:text-ink/30 ${errors.password ? 'border-alert/40 bg-alert/5 focus:border-alert/40' : 'border-border focus:border-border-focus'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-muted text-[13px] p-1 transition-colors hover:text-ink">
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {formData.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex-1 h-[3px] rounded-[2px] transition-colors duration-300" style={{ backgroundColor: i <= pwStrength.score ? pwStrength.color : 'var(--color-border)' }}></div>
                    ))}
                  </div>
                  <span className="text-[10px]" style={{ color: pwStrength.color }}>{pwStrength.label}</span>
                </div>
              )}
              {errors.password && <div className="text-[11px] text-alert mt-1.5">Password must be at least 8 characters.</div>}
            </div>

            <div className="mb-3.5">
              <label className="block text-[11px] tracking-[0.06em] uppercase text-muted mb-1.5">I'm primarily a… <span className="text-muted text-[10px] normal-case tracking-normal">(optional)</span></label>
              <div className="relative">
                <select name="role" value={formData.role} onChange={handleChange} className="w-full py-[11px] pl-3.5 pr-9 bg-paper border border-border rounded-md font-mono text-[13px] text-ink outline-none transition-all focus:bg-white focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(0,217,126,0.08)] appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%237a7870%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_14px_center]">
                  <option value="" disabled>Select your role</option>
                  <option>Independent developer</option>
                  <option>Startup founder / CTO</option>
                  <option>Engineer at a team</option>
                  <option>Agency owner / manager</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <label className="flex items-start gap-2.5 my-[18px] mb-5 text-[12px] text-muted leading-[1.6] cursor-pointer group">
              <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="hidden peer" />
              <span className="w-4 h-4 rounded shrink-0 mt-px border border-border bg-paper flex items-center justify-center text-[9px] text-transparent transition-all peer-checked:bg-ink peer-checked:border-ink peer-checked:text-accent peer-checked:animate-check-pop">✓</span>
              <span>I agree to the <a href="#" className="text-ink underline underline-offset-3">Terms of Service</a> and <a href="#" className="text-ink underline underline-offset-3">Privacy Policy</a>. No spam, ever.</span>
            </label>
            {errors.terms && <div className="text-[11px] text-alert -mt-2.5 mb-3.5">You must accept the terms to continue.</div>}

            <button type="submit" disabled={loading} className="w-full p-[13px] bg-ink text-cream font-mono text-[14px] border-none rounded-md cursor-pointer transition-all flex items-center justify-center gap-2.5 mb-4 relative overflow-hidden group hover:bg-[#1a1a24] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.04)_100%)]"></div>
              {loading ? 'Creating account…' : 'Create free account'}
              {!loading && <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>}
            </button>
          </form>

          <p className="text-[12px] text-muted text-center">
            Already have an account? <Link to="/login" className="text-ink underline underline-offset-3">Sign in</Link>
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[44%] bg-ink relative overflow-hidden flex flex-col justify-between py-12 px-8 lg:px-11 shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:28px_28px] pointer-events-none"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,217,126,0.1)_0%,transparent_65%)] -top-[100px] -left-[100px] pointer-events-none"></div>

        <Link to="/" className="relative z-10 flex items-center gap-2.5 font-serif text-[22px] font-bold text-cream no-underline tracking-[-0.5px]">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-dot"></span>
          IsItUp
        </Link>

        <div className="relative z-10 flex-1 flex flex-col justify-center py-8 lg:py-0">
          <h2 className="font-serif text-[32px] lg:text-[40px] font-light tracking-[-1.5px] leading-[1.1] text-cream mb-4">Monitor what<br />matters. Know<br />it's <em className="italic text-accent">alive.</em></h2>
          <p className="text-[14px] text-white/40 leading-[1.8] mb-10 max-w-[320px]">Set up in 90 seconds. No credit card required. Cancel any time.</p>

          <div className="hidden lg:flex flex-col gap-0 mb-12">
            {[
              { title: '3 free monitors, forever', desc: 'API and website uptime monitoring with 5-minute check intervals on the free plan.', delay: '0.05s' },
              { title: 'Instant email alerts', desc: 'Know the moment something goes down, with failure context built in.', delay: '0.1s' },
              { title: 'Full request & response logs', desc: 'Every check is logged so you can debug exactly what went wrong.', delay: '0.15s' },
              { title: '14-day Pro trial, no card needed', desc: 'Unlock 30-second checks, Slack alerts, and response body assertions for free.', delay: '0.2s' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3.5 py-4 border-b border-white/5 animate-float-up last:border-none" style={{ animationDelay: f.delay }}>
                <div className="w-[22px] h-[22px] rounded-full shrink-0 mt-px bg-accent/10 border border-accent/25 flex items-center justify-center text-[10px] text-accent">✓</div>
                <div>
                  <div className="text-[13px] text-white/80 mb-0.5">{f.title}</div>
                  <div className="text-[12px] text-white/35 leading-[1.5]">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 bg-white/5 border border-white/10 rounded-lg p-5 px-5.5">
            <div className="text-[10px] uppercase tracking-[0.1em] text-white/25 mb-3.5">Start with a plan</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-3 px-3.5 rounded-md border border-accent/25 bg-accent/10 cursor-pointer transition-all">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full shrink-0 border border-accent bg-accent/10 flex items-center justify-center relative after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-accent"></div>
                  <span className="text-[13px] text-cream">Starter</span>
                </div>
                <span className="text-[13px] text-accent">Free forever</span>
              </div>
              <div className="flex items-center justify-between p-3 px-3.5 rounded-md border border-white/5 bg-white/5 cursor-pointer transition-all hover:bg-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20 flex items-center justify-center"></div>
                  <span className="text-[13px] text-white/70">Pro</span>
                </div>
                <span className="text-[13px] text-white/35">14-day free trial</span>
              </div>
              <div className="flex items-center justify-between p-3 px-3.5 rounded-md border border-white/5 bg-white/5 cursor-pointer transition-all hover:bg-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20 flex items-center justify-center"></div>
                  <span className="text-[13px] text-white/70">Team</span>
                </div>
                <span className="text-[13px] text-white/35">14-day free trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      <div className={`fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center transition-opacity duration-500 ${showSuccess ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {showSuccess && (
          <>
            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center text-[36px] text-accent mb-6 animate-check-pop" style={{ animationDelay: '0.3s' }}>✓</div>
            <div className="font-serif text-[36px] font-light text-cream tracking-[-1px] mb-2 italic">Account created!</div>
            <p className="text-[14px] text-white/40 mt-2">Redirecting to your dashboard…</p>
          </>
        )}
      </div>
    </div>
  );
}
