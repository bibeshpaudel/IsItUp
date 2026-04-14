import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkline } from '../components/Sparkline';
import { AnimatedDot } from '../components/AnimatedDot';
import { AnimatedCounter } from '../components/AnimatedCounter';
const upPattern = [8, 10, 12, 11, 14, 13, 12, 15, 14, 13, 16, 15, 14, 16, 18, 15, 14, 16, 17, 18];
const warnPattern = [12, 14, 13, 12, 14, 15, 13, 12, 14, 13, 12, 18, 20, 22, 20, 18, 20, 22, 20, 22];

export default function Landing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100', 'translate-y-0');
          e.target.classList.remove('opacity-0', 'translate-y-[30px]');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="font-mono bg-cream text-ink overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-[18px] px-6 lg:px-12 bg-cream/90 backdrop-blur-md border-b border-border">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 font-serif text-[20px] font-bold tracking-[-0.5px] text-ink no-underline">
          <img src="/icon-animated.svg" alt="" className="w-5 h-5" />
          IsItUp
        </Link>
        <ul className="hidden lg:flex items-center gap-8 list-none">
          <li><a href="#features" className="text-muted no-underline text-[13px] tracking-[0.02em] transition-colors hover:text-ink">Features</a></li>
          <li><a href="#how" className="text-muted no-underline text-[13px] tracking-[0.02em] transition-colors hover:text-ink">How it works</a></li>
          <li><a href="#pricing" className="text-muted no-underline text-[13px] tracking-[0.02em] transition-colors hover:text-ink">Pricing</a></li>
          <li><a href="#faq" className="text-muted no-underline text-[13px] tracking-[0.02em] transition-colors hover:text-ink">FAQ</a></li>
          <li><Link to="/docs" className="text-muted no-underline text-[13px] tracking-[0.02em] transition-colors hover:text-ink">Docs</Link></li>
        </ul>
        <div className="flex items-center gap-3">
          <Link to="/login" className="py-2 px-5 border border-border bg-transparent text-ink font-mono text-[13px] cursor-pointer rounded transition-all hover:bg-paper no-underline">Sign in</Link>
          <Link to="/register" className="py-2 px-5 bg-ink text-cream font-mono text-[13px] cursor-pointer rounded border-none transition-all hover:bg-[#1a1a24] no-underline">Start free →</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center pt-[100px] lg:pt-[120px] pb-[60px] lg:pb-[80px] px-8 lg:px-12 gap-12 lg:gap-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_600px_400px_at_80%_20%,rgba(0,217,126,0.07)_0%,transparent_70%),radial-gradient(ellipse_400px_300px_at_20%_80%,rgba(0,217,126,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-30 hero-grid-bg" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 bg-paper border border-border rounded-full text-[11px] tracking-[0.08em] text-muted mb-8 uppercase">
            <AnimatedDot className="w-[15px] h-[15px] shrink-0" />
            Real-time monitoring platform
          </div>
          <h1 className="font-serif text-[clamp(48px,6vw,80px)] font-light leading-[1.05] tracking-[-2px] text-ink mb-7">
            Know when<br />your API<br /><em className="italic text-accent-dim">goes dark.</em>
          </h1>
          <p className="text-[15px] text-muted leading-[1.8] max-w-[420px] mb-10 font-mono">
            IsItUp watches your APIs and websites around the clock. The moment something breaks, you know — with enough context to fix it fast.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/register" className="py-3.5 px-8 bg-ink text-cream font-mono text-[14px] cursor-pointer rounded-md border-none no-underline inline-flex items-center gap-2.5 transition-all hover:bg-[#1a1a24] hover:-translate-y-px">
              Start monitoring free <span>→</span>
            </Link>
            <a href="#dashboard" className="py-3.5 px-8 bg-transparent text-ink font-mono text-[14px] cursor-pointer rounded-md border border-border no-underline inline-flex items-center gap-2.5 transition-all hover:bg-paper">
              See dashboard
            </a>
          </div>
          <p className="mt-5 text-[12px] text-muted">Free forever · No credit card required · Setup in 90 seconds</p>
        </div>

        <div className="relative z-10">
          <div className="bg-ink rounded-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)] transform perspective-[1000px] -rotate-y-4 rotate-x-2 transition-transform duration-[400ms] hover:-rotate-y-1 hover:rotate-x-1">
            <div className="flex items-center justify-between py-3.5 px-5 bg-white/5 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
              </div>
              <span className="text-[11px] text-white/30 tracking-[0.08em] uppercase">Live Monitors</span>
              <div className="flex items-center gap-1.5 text-[11px] text-accent">
                <AnimatedDot className="w-[15px] h-[15px] shrink-0" />
                3 of 4 healthy
              </div>
            </div>
            <div className="p-5">
              {[
                { name: 'Production API', url: 'api.acme.com/v2/health', status: 'up', latency: '142ms', uptime: '99.98%', spark: upPattern },
                { name: 'Auth Service', url: 'auth.acme.com/token', status: 'up', latency: '89ms', uptime: '100%', spark: [12, 14, 13, 15, 14, 13, 12, 14, 15, 13, 12, 14, 15, 13, 14, 15, 12, 13, 14, 15] },
                { name: 'Payment Gateway', url: 'pay.acme.com/charge', status: 'warn', latency: '847ms', uptime: '97.2%', spark: warnPattern, warnAfter: 11 },
                { name: 'Marketing Site', url: 'acme.com', status: 'up', latency: '218ms', uptime: '99.9%', spark: [14, 13, 12, 14, 15, 13, 14, 12, 13, 15, 14, 13, 12, 14, 15, 13, 14, 12, 14, 15] },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-3.5 rounded-lg mb-2 bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${m.status === 'up' ? 'bg-accent shadow-[0_0_8px_rgba(0,217,126,0.6)]' : m.status === 'warn' ? 'bg-warn shadow-[0_0_8px_rgba(255,107,53,0.6)]' : 'bg-alert shadow-[0_0_8px_rgba(230,57,70,0.6)]'}`}></div>
                    <div>
                      <div className="text-[13px] text-white/85">{m.name}</div>
                      <div className="text-[11px] text-white/30 mt-[1px]">{m.url}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Sparkline data={m.spark} warnAfter={m.warnAfter} />
                    <div className="text-[12px] text-white/50 text-right">
                      <div className={`text-[14px] ${m.status === 'warn' ? 'text-warn' : 'text-accent'}`}>{m.latency}</div>
                      <div>latency</div>
                    </div>
                    <div className={`py-[3px] px-2.5 rounded-full text-[11px] font-medium ${m.status === 'up' ? 'bg-accent/10 text-accent' : m.status === 'warn' ? 'bg-warn/10 text-warn' : 'bg-alert/10 text-alert'}`}>
                      {m.uptime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-3.5 px-5 border-t border-white/5 flex justify-between items-center">
              <div className="text-center"><div className="text-[18px] text-accent font-serif italic">4</div><div className="text-[10px] text-white/30 uppercase tracking-[0.08em]">Monitors</div></div>
              <div className="text-center"><div className="text-[18px] text-accent font-serif italic">99.5%</div><div className="text-[10px] text-white/30 uppercase tracking-[0.08em]">Avg Uptime</div></div>
              <div className="text-center"><div className="text-[18px] text-accent font-serif italic">30s</div><div className="text-[10px] text-white/30 uppercase tracking-[0.08em]">Interval</div></div>
              <div className="text-center"><div className="text-[18px] text-accent font-serif italic">1</div><div className="text-[10px] text-white/30 uppercase tracking-[0.08em]">Incident</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="bg-ink py-3 overflow-hidden">
        <div className="flex animate-scroll-left w-max">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-accent"></span>HTTP &amp; HTTPS monitoring</div>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-warn"></span>Instant Slack alerts</div>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-accent"></span>30-second check intervals</div>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-accent"></span>Public status pages</div>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-warn"></span>Response body validation</div>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-accent"></span>Incident history &amp; logs</div>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-accent"></span>Latency trend graphs</div>
              <div className="flex items-center gap-2 px-10 text-[12px] text-white/40 whitespace-nowrap tracking-[0.06em] uppercase"><span className="w-1.5 h-1.5 rounded-full inline-block bg-warn"></span>Email &amp; webhook alerts</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <div className="bg-paper grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start py-20 lg:py-[100px] px-8 lg:px-12 opacity-0 translate-y-[30px] transition-all duration-700 fade-up">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-muted mb-6 before:content-[''] before:w-6 before:h-px before:bg-muted">The reality</div>
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-ink mb-5">Your users find bugs<br /><em className="italic text-accent-dim">before you do.</em></h2>
          <p className="text-[15px] text-muted leading-[1.8] max-w-[500px]">Downtime is expensive. Silent failures are worse. Most teams only learn about outages from support tickets, not their own tooling.</p>
          <div className="flex flex-col gap-4 mt-5">
            <div className="p-5 lg:p-6 bg-cream border border-border rounded-lg flex gap-4 items-start transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="text-[20px] shrink-0 mt-0.5">📉</div>
              <div><h4 className="text-[14px] font-medium mb-1.5 text-ink">Hours of missed revenue</h4><p className="text-[13px] text-muted leading-[1.7]">A broken checkout API goes undetected for 3 hours. You find out when sales spike to zero.</p></div>
            </div>
            <div className="p-5 lg:p-6 bg-cream border border-border rounded-lg flex gap-4 items-start transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="text-[20px] shrink-0 mt-0.5">🌀</div>
              <div><h4 className="text-[14px] font-medium mb-1.5 text-ink">Debugging without context</h4><p className="text-[13px] text-muted leading-[1.7]">By the time you know there's a problem, the logs are gone and you're flying blind.</p></div>
            </div>
            <div className="p-5 lg:p-6 bg-cream border border-border rounded-lg flex gap-4 items-start transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="text-[20px] shrink-0 mt-0.5">🔧</div>
              <div><h4 className="text-[14px] font-medium mb-1.5 text-ink">Tools built for ops teams</h4><p className="text-[13px] text-muted leading-[1.7]">Existing solutions are complex, expensive, or require a dedicated team just to set up and maintain.</p></div>
            </div>
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-muted mb-6 before:content-[''] before:w-6 before:h-px before:bg-muted">IsItUp changes this</div>
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-ink mb-5">Visibility without the <em className="italic text-accent-dim">complexity.</em></h2>
          <ul className="mt-8 list-none flex flex-col gap-0">
            <li className="flex items-start gap-3 text-[14px] text-ink leading-[1.6] py-4 border-b border-border">
              <div className="w-5 h-5 rounded-full bg-green-glow border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-accent">✓</div>
              <div><strong>Detect failures in under 60 seconds</strong><br />Check intervals as low as 30 seconds. Be the first to know, every time.</div>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-ink leading-[1.6] py-4 border-b border-border">
              <div className="w-5 h-5 rounded-full bg-green-glow border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-accent">✓</div>
              <div><strong>Full request and response logs at the moment of failure</strong><br />Every check records headers, body, and status — debug with facts, not guesses.</div>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-ink leading-[1.6] py-4 border-b border-border">
              <div className="w-5 h-5 rounded-full bg-green-glow border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-accent">✓</div>
              <div><strong>Operational in 90 seconds</strong><br />Paste a URL. Set a check interval. Done. No YAML, no agents, no config files.</div>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-ink leading-[1.6] py-4">
              <div className="w-5 h-5 rounded-full bg-green-glow border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-accent">✓</div>
              <div><strong>One platform for APIs and websites</strong><br />Monitor HTTP endpoints, validate response bodies, and track website uptime — unified.</div>
            </li>
          </ul>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="bg-cream py-20 lg:py-[100px] px-8 lg:px-12">
        <div className="flex justify-between items-end mb-[60px] flex-wrap gap-5 opacity-0 translate-y-[30px] transition-all duration-700 fade-up">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-muted mb-6 before:content-[''] before:w-6 before:h-px before:bg-muted">Capabilities</div>
            <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-ink mb-5">Everything you need.<br /><em className="italic text-accent-dim">Nothing you don't.</em></h2>
          </div>
          <p className="text-[15px] text-muted leading-[1.8] max-w-[300px]">Purpose-built for developers and small teams who need reliable monitoring without the overhead.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden opacity-0 translate-y-[30px] transition-all duration-700 fade-up">
          {[
            { num: '01', icon: '🔗', title: 'API Monitoring', desc: 'Monitor any HTTP endpoint with full method support — GET, POST, PUT, DELETE. Validate status codes, response time thresholds, and body content with custom assertions.', tags: ['GET / POST', 'Status codes', 'Body assertions', 'Auth headers'] },
            { num: '02', icon: '🌐', title: 'Uptime Monitoring', desc: 'Track availability for websites, landing pages, and web apps. Get an accurate picture of uptime percentages with historical trend data going back months.', tags: ['SSL checks', 'Redirect tracking', 'Uptime history'] },
            { num: '03', icon: '⚡', title: 'Real-Time Alerts', desc: 'Get notified the moment something breaks — via email, Slack, webhook, or PagerDuty. Configure alert thresholds, escalation rules, and quiet hours.', tags: ['Slack', 'Email', 'Webhook', 'PagerDuty'] },
            { num: '04', icon: '📋', title: 'Diagnostic Logs', desc: 'Every check is logged with full request and response data — headers, body, status, timing. Drill into a specific failure and see exactly what went wrong.', tags: ['Request headers', 'Response body', 'Timeline view'] },
            { num: '05', icon: '📈', title: 'Performance Insights', desc: 'Track latency trends over time — daily, weekly, monthly. Spot gradual degradation before it becomes a crisis. Export data for stakeholder reporting.', tags: ['p50 / p95', 'Trend graphs', 'CSV export'] },
            { num: '06', icon: '📢', title: 'Status Pages', desc: 'Publish a hosted status page — public or password-protected — so your users and clients always know what\'s happening. Custom domain support included.', tags: ['Public / Private', 'Custom domain', 'Incident posts'] },
          ].map((f, i) => (
            <div key={i} className="bg-cream p-8 lg:p-9 relative overflow-hidden transition-colors hover:bg-paper group">
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              <span className="text-[11px] text-muted tracking-[0.1em] mb-5 block">{f.num}</span>
              <span className="text-[28px] mb-4 block">{f.icon}</span>
              <h3 className="text-[17px] font-serif font-bold mb-3 text-ink tracking-[-0.3px]">{f.title}</h3>
              <p className="text-[13px] text-muted leading-[1.7]">{f.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {f.tags.map((t, j) => <span key={j} className="py-[3px] px-2.5 bg-paper border border-border rounded-full text-[11px] text-muted">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-ink text-cream py-20 lg:py-[100px] px-8 lg:px-12">
        <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-white/30 mb-6 before:content-[''] before:w-6 before:h-px before:bg-white/20">Process</div>
        <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-cream mb-5">Up and watching in<br /><em className="italic text-accent">four steps.</em></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 mt-16 relative opacity-0 translate-y-[30px] transition-all duration-700 fade-up">
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-white/10 z-0"></div>
          {[
            { num: '01', title: 'Add your endpoint', desc: 'Paste any URL — API endpoint or website. Choose your HTTP method, set custom headers or request body if needed.' },
            { num: '02', title: 'Configure checks', desc: 'Set your check interval (30s to 60min), define what "healthy" means: status code, response time, or body content match.' },
            { num: '03', title: 'Connect alerts', desc: 'Link Slack, add email recipients, or configure a webhook. Set rules for when and how you want to be notified.' },
            { num: '04', title: 'Watch it run', desc: 'IsItUp starts checking immediately. Your dashboard fills with live data. You get alerted the instant anything goes wrong.' },
          ].map((s, i) => (
            <div key={i} className="px-0 lg:px-6 relative z-10 group">
              <div className="w-10 h-10 rounded-full bg-ink border border-white/15 flex items-center justify-center text-[13px] text-white/40 mb-7 transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(0,217,126,0.2)]">{s.num}</div>
              <h3 className="font-serif text-[20px] font-bold mb-3 text-cream tracking-[-0.3px]">{s.title}</h3>
              <p className="text-[13px] text-white/40 leading-[1.7]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ALERTS DEMO */}
      <section className="bg-paper grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-[100px] px-8 lg:px-12 opacity-0 translate-y-[30px] transition-all duration-700 fade-up">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-muted mb-6 before:content-[''] before:w-6 before:h-px before:bg-muted">Alerting</div>
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-ink mb-5">Context-rich alerts<br />when it <em className="italic text-accent-dim">matters most.</em></h2>
          <p className="text-[15px] text-muted leading-[1.8] max-w-[500px]">Alerts include the monitor name, failure reason, affected endpoint, and duration — everything you need to act immediately.</p>
          <ul className="mt-8 list-none flex flex-col gap-0">
            <li className="flex items-start gap-3 text-[14px] text-ink leading-[1.6] py-4 border-b border-border">
              <div className="w-5 h-5 rounded-full bg-green-glow border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-accent">✓</div>
              <div><strong>Alert on first failure or after N consecutive failures</strong> — reduce noise from transient blips.</div>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-ink leading-[1.6] py-4 border-b border-border">
              <div className="w-5 h-5 rounded-full bg-green-glow border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-accent">✓</div>
              <div><strong>Recovery alerts included</strong> — know the moment your service comes back online.</div>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-ink leading-[1.6] py-4">
              <div className="w-5 h-5 rounded-full bg-green-glow border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-accent">✓</div>
              <div><strong>Quiet hours</strong> — suppress non-critical alerts during maintenance or off hours.</div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-cream border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
            <div className="flex items-center gap-3 py-3.5 px-4.5 border-b border-border border-l-4 border-l-alert">
              <AnimatedDot color="alert" className="w-[20px] h-[20px] shrink-0" />
              <div className="text-[13px] font-medium flex-1">🚨 Payment API — DOWN</div>
              <div className="text-[11px] text-muted">2 min ago</div>
            </div>
            <div className="py-3.5 px-4.5">
              <p className="text-[12px] text-muted leading-[1.6]">pay.acme.com/v1/charge returned HTTP 503. Response time exceeded 10s threshold.</p>
              <div className="flex gap-4 mt-2.5 flex-wrap">
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Status</span><span className="text-[13px] text-alert">503 Service Unavailable</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Response time</span><span className="text-[13px] text-ink">10,042ms</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Duration</span><span className="text-[13px] text-ink">2m 18s</span></div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border flex-wrap">
                <span className="py-[3px] px-2.5 rounded-full text-[11px] bg-paper border border-border text-muted">📧 alerts@acme.com</span>
                <span className="py-[3px] px-2.5 rounded-full text-[11px] bg-paper border border-border text-muted">💬 #incidents</span>
                <span className="py-[3px] px-2.5 rounded-full text-[11px] bg-paper border border-border text-muted">🔔 PagerDuty</span>
              </div>
            </div>
          </div>
          <div className="bg-cream border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
            <div className="flex items-center gap-3 py-3.5 px-4.5 border-b border-border border-l-4 border-l-warn">
              <div className="w-2 h-2 rounded-full shrink-0 bg-warn"></div>
              <div className="text-[13px] font-medium flex-1">⚠️ Auth Service — SLOW</div>
              <div className="text-[11px] text-muted">14 min ago</div>
            </div>
            <div className="py-3.5 px-4.5">
              <p className="text-[12px] text-muted leading-[1.6]">auth.acme.com/token response time is 847ms — above the 500ms warning threshold.</p>
              <div className="flex gap-4 mt-2.5 flex-wrap">
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Status</span><span className="text-[13px] text-ink">200 OK</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Response time</span><span className="text-[13px] text-warn">847ms</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Threshold</span><span className="text-[13px] text-ink">500ms</span></div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border flex-wrap">
                <span className="py-[3px] px-2.5 rounded-full text-[11px] bg-paper border border-border text-muted">💬 #monitoring</span>
              </div>
            </div>
          </div>
          <div className="bg-cream border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
            <div className="flex items-center gap-3 py-3.5 px-4.5 border-b border-border border-l-4 border-l-accent">
              <div className="w-2 h-2 rounded-full shrink-0 bg-accent"></div>
              <div className="text-[13px] font-medium flex-1">✅ Production API — RECOVERED</div>
              <div className="text-[11px] text-muted">1 hr ago</div>
            </div>
            <div className="py-3.5 px-4.5">
              <p className="text-[12px] text-muted leading-[1.6]">api.acme.com/v2/health is responding normally again. Incident lasted 7 minutes.</p>
              <div className="flex gap-4 mt-2.5 flex-wrap">
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Status</span><span className="text-[13px] text-accent">200 OK</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Downtime</span><span className="text-[13px] text-ink">7m 3s</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-[10px] uppercase tracking-[0.08em] text-muted">Checks failed</span><span className="text-[13px] text-ink">14</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section id="dashboard" className="bg-ink py-20 lg:py-[100px] px-8 lg:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-white/30 mb-6 before:content-[''] before:w-6 before:h-px before:bg-white/20">Dashboard</div>
            <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-cream mb-5">Everything at a<br /><em className="italic text-accent">glance.</em></h2>
          </div>
        </div>
        <div className="bg-[#111118] rounded-xl overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.4)] opacity-0 translate-y-[30px] transition-all duration-700 fade-up">
          <div className="flex items-center justify-between py-3.5 px-6 bg-white/5 border-b border-white/5 gap-5">
            <div className="font-serif text-[16px] text-cream flex items-center gap-2 shrink-0">
              <img src="/icon-animated.svg" alt="" className="w-4 h-4 shrink-0" />
              IsItUp
            </div>
            <div className="hidden sm:flex gap-1">
              <div className="py-1.5 px-3.5 rounded-md text-[12px] cursor-pointer transition-all whitespace-nowrap bg-white/5 text-cream">Monitors</div>
              <div className="py-1.5 px-3.5 rounded-md text-[12px] text-white/40 cursor-pointer transition-all whitespace-nowrap hover:bg-white/5 hover:text-white/80">Incidents</div>
              <div className="py-1.5 px-3.5 rounded-md text-[12px] text-white/40 cursor-pointer transition-all whitespace-nowrap hover:bg-white/5 hover:text-white/80">Logs</div>
              <div className="py-1.5 px-3.5 rounded-md text-[12px] text-white/40 cursor-pointer transition-all whitespace-nowrap hover:bg-white/5 hover:text-white/80">Status Page</div>
              <div className="py-1.5 px-3.5 rounded-md text-[12px] text-white/40 cursor-pointer transition-all whitespace-nowrap hover:bg-white/5 hover:text-white/80">Settings</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-[11px] text-white/30">Last check: 18s ago</div>
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[11px] text-white/50">AK</div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[500px]">
            <div className="hidden lg:block border-r border-white/5 py-5">
              <div className="px-4 mb-6">
                <div className="text-[10px] uppercase tracking-[0.1em] text-white/25 mb-2.5 px-2">Overview</div>
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-md text-[12px] cursor-pointer transition-all mb-0.5 bg-white/10 text-cream"><span className="text-[14px]">📊</span> Dashboard</div>
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-md text-[12px] text-white/50 cursor-pointer transition-all mb-0.5 hover:bg-white/5 hover:text-white/80"><span className="text-[14px]">🔔</span> Incidents</div>
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-md text-[12px] text-white/50 cursor-pointer transition-all mb-0.5 hover:bg-white/5 hover:text-white/80"><span className="text-[14px]">📋</span> Logs</div>
              </div>
              <div className="px-4 mb-6">
                <div className="text-[10px] uppercase tracking-[0.1em] text-white/25 mb-2.5 px-2">Monitors</div>
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-md text-[12px] text-white/50 cursor-pointer transition-all mb-0.5 hover:bg-white/5 hover:text-white/80"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-accent"></div>Production API</div>
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-md text-[12px] text-white/50 cursor-pointer transition-all mb-0.5 hover:bg-white/5 hover:text-white/80"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-accent"></div>Auth Service</div>
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-md text-[12px] text-white/50 cursor-pointer transition-all mb-0.5 hover:bg-white/5 hover:text-white/80"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-warn"></div>Payment Gateway</div>
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-md text-[12px] text-white/50 cursor-pointer transition-all mb-0.5 hover:bg-white/5 hover:text-white/80"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-accent"></div>Marketing Site</div>
                <div className="flex items-center gap-1.5 py-2 px-3 rounded-md text-[11px] text-white/25 cursor-pointer transition-all mt-1 hover:bg-white/5 hover:text-white/80"><span>＋</span>Add monitor</div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/5 border border-white/5 rounded-lg py-4.5 px-5 transition-colors hover:bg-white/10">
                  <div className="text-[10px] uppercase tracking-[0.08em] text-white/30 mb-2.5">Monitors</div>
                  <div className="font-serif text-[28px] font-light text-cream tracking-[-0.5px]">4</div>
                  <div className="text-[11px] mt-1 text-accent">3 healthy · 1 degraded</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg py-4.5 px-5 transition-colors hover:bg-white/10">
                  <div className="text-[10px] uppercase tracking-[0.08em] text-white/30 mb-2.5">Avg Uptime (30d)</div>
                  <div className="font-serif text-[28px] font-light text-cream tracking-[-0.5px]">99.5%</div>
                  <div className="text-[11px] mt-1 text-accent">↑ 0.3% vs last month</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg py-4.5 px-5 transition-colors hover:bg-white/10">
                  <div className="text-[10px] uppercase tracking-[0.08em] text-white/30 mb-2.5">Avg Latency</div>
                  <div className="font-serif text-[28px] font-light text-cream tracking-[-0.5px]">324ms</div>
                  <div className="text-[11px] mt-1 text-warn">↑ 82ms vs yesterday</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg py-4.5 px-5 transition-colors hover:bg-white/10">
                  <div className="text-[10px] uppercase tracking-[0.08em] text-white/30 mb-2.5">Open Incidents</div>
                  <div className="font-serif text-[28px] font-light text-cream tracking-[-0.5px]">1</div>
                  <div className="text-[11px] mt-1 text-warn">Payment Gateway</div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-[12px] text-white/50 uppercase tracking-[0.08em]">All Monitors</div>
                <button className="py-1 px-3.5 bg-accent/10 border border-accent/20 rounded text-[11px] text-accent cursor-pointer font-mono transition-all hover:bg-accent/20">+ Add Monitor</button>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-white/5 border border-white/5 transition-all cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-accent shadow-[0_0_8px_rgba(0,217,126,0.6)]"></div>
                    <div><div className="text-[13px] text-white/80">Production API</div><div className="text-[11px] text-white/25 mt-0.5">api.acme.com/v2/health · GET · 30s</div></div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Sparkline data={Array(16).fill(10)} isSmall />
                    <div className="text-[12px] text-accent">99.98%</div>
                    <div className="text-[12px] text-white/40">142ms</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-white/5 border border-white/5 transition-all cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-accent shadow-[0_0_8px_rgba(0,217,126,0.6)]"></div>
                    <div><div className="text-[13px] text-white/80">Auth Service</div><div className="text-[11px] text-white/25 mt-0.5">auth.acme.com/token · POST · 1min</div></div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Sparkline data={Array(16).fill(10)} isSmall />
                    <div className="text-[12px] text-accent">100%</div>
                    <div className="text-[12px] text-white/40">89ms</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-white/5 border border-warn/20 transition-all cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-warn shadow-[0_0_8px_rgba(255,107,53,0.6)]"></div>
                    <div><div className="text-[13px] text-white/80">Payment Gateway</div><div className="text-[11px] text-white/25 mt-0.5">pay.acme.com/charge · POST · 30s</div></div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Sparkline data={Array(16).fill(10)} isSmall warnAfter={10} />
                    <div className="text-[12px] text-warn">97.2%</div>
                    <div className="text-[12px] text-warn">847ms</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-white/5 border border-white/5 transition-all cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-accent shadow-[0_0_8px_rgba(0,217,126,0.6)]"></div>
                    <div><div className="text-[13px] text-white/80">Marketing Site</div><div className="text-[11px] text-white/25 mt-0.5">acme.com · GET · 5min</div></div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Sparkline data={Array(16).fill(10)} isSmall />
                    <div className="text-[12px] text-accent">99.9%</div>
                    <div className="text-[12px] text-white/40">218ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-cream py-20 lg:py-[100px] px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-muted mb-6">Pricing</div>
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-ink mb-5">Pay for what you <em className="italic text-accent-dim">actually use.</em></h2>
          <p className="text-[15px] text-muted leading-[1.8] max-w-[500px] mx-auto text-center">Start free. Scale when you're ready. No lock-in, no surprise fees.</p>
          <div className="flex items-center gap-3 justify-center mt-6">
            <span className={`text-[13px] ${!annual ? 'text-ink' : 'text-muted'}`}>Monthly</span>
            <div className="w-11 h-6 bg-ink rounded-full relative cursor-pointer shrink-0" onClick={() => setAnnual(!annual)}>
              <div className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-accent transition-all duration-300 ${annual ? 'left-[23px]' : 'left-[3px]'}`}></div>
            </div>
            <span className={`text-[13px] ${annual ? 'text-ink' : 'text-muted'}`}>Annual</span>
            <span className="py-0.5 px-2.5 bg-accent/10 border border-accent/20 rounded-full text-[11px] text-accent">Save 20%</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-[1000px] mx-auto">
          <div className="p-10 lg:px-8 border border-border rounded-xl bg-cream relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] opacity-0 translate-y-[30px] fade-up">
            <span className="text-[12px] tracking-[0.1em] uppercase text-muted mb-5 block">Starter</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[20px] text-muted mt-2">$</span>
              <span className="font-serif text-[56px] font-light tracking-[-2px] text-ink leading-none">0</span>
              <span className="text-[13px] text-muted">/ month</span>
            </div>
            <p className="text-[13px] text-muted leading-[1.6] mb-7 pb-7 border-b border-border">Perfect for personal projects and exploring IsItUp. No credit card required.</p>
            <ul className="list-none flex flex-col gap-3 mb-9">
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-ink">3 monitors</span></div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-ink">5-minute</span> check intervals</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Email alerts</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-ink">7-day</span> log history</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Basic uptime reporting</div></li>
            </ul>
            <Link to="/register" className="w-full p-3 rounded-md font-mono text-[13px] cursor-pointer border border-border bg-transparent text-ink transition-all text-center block no-underline hover:bg-paper">Get started free</Link>
          </div>
          <div className="p-10 lg:px-8 border border-transparent rounded-xl bg-ink text-cream relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] opacity-0 translate-y-[30px] fade-up">
            <div className="absolute top-5 right-5 py-1 px-3 bg-accent text-ink text-[10px] font-medium rounded-full uppercase tracking-[0.06em]">Most popular</div>
            <span className="text-[12px] tracking-[0.1em] uppercase text-white/40 mb-5 block">Pro</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[20px] text-white/35 mt-2">$</span>
              <AnimatedCounter value={annual ? 15 : 19} className="font-serif text-[56px] font-light tracking-[-2px] text-cream leading-none inline-block" />
              <span className="text-[13px] text-white/40">/ month</span>
            </div>
            <p className="text-[13px] text-white/40 leading-[1.6] mb-7 pb-7 border-b border-white/10">For developers and small teams who need reliable, fast monitoring with full diagnostics.</p>
            <ul className="list-none flex flex-col gap-3 mb-9">
              <li className="flex items-start gap-2.5 text-[13px] text-white/40 leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-cream">25 monitors</span></div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/40 leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-cream">30-second</span> check intervals</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/40 leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Slack, email &amp; webhook alerts</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/40 leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-cream">90-day</span> log history</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/40 leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Response body assertions</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/40 leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Status page (1 page)</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/40 leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Latency trend graphs</div></li>
            </ul>
            <Link to="/register" className="w-full p-3 rounded-md font-mono text-[13px] cursor-pointer border-none bg-accent text-ink transition-all text-center block font-medium no-underline hover:bg-[#00f090]">Start Pro free for 14 days</Link>
          </div>
          <div className="p-10 lg:px-8 border border-border rounded-xl bg-cream relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] opacity-0 translate-y-[30px] fade-up">
            <span className="text-[12px] tracking-[0.1em] uppercase text-muted mb-5 block">Team</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[20px] text-muted mt-2">$</span>
              <AnimatedCounter value={annual ? 47 : 59} className="font-serif text-[56px] font-light tracking-[-2px] text-ink leading-none inline-block" />
              <span className="text-[13px] text-muted">/ month</span>
            </div>
            <p className="text-[13px] text-muted leading-[1.6] mb-7 pb-7 border-b border-border">For agencies and growing teams managing multiple clients and critical systems.</p>
            <ul className="list-none flex flex-col gap-3 mb-9">
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-ink">Unlimited monitors</span></div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-ink">15-second</span> check intervals</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>All channels + PagerDuty</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div><span className="text-ink">1-year</span> log history</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Unlimited status pages</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>Team members &amp; roles</div></li>
              <li className="flex items-start gap-2.5 text-[13px] text-muted leading-[1.4]"><div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-[9px] text-accent">✓</div><div>API access + CSV export</div></li>
            </ul>
            <Link to="/register" className="w-full p-3 rounded-md font-mono text-[13px] cursor-pointer border border-border bg-transparent text-ink transition-all text-center block no-underline hover:bg-paper">Start Team trial</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream py-20 lg:py-[100px] px-8 lg:px-12">
        <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-muted mb-6 before:content-[''] before:w-6 before:h-px before:bg-muted opacity-0 translate-y-[30px] fade-up">FAQ</div>
        <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-ink mb-5 opacity-0 translate-y-[30px] fade-up">Questions we <em className="italic text-accent-dim">actually get.</em></h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 mt-16">
          <div className="lg:sticky lg:top-[120px] h-fit opacity-0 translate-y-[30px] fade-up">
            <p className="text-[14px] text-muted leading-[1.8] mb-6">Still have questions? We're real people — reach us at <strong className="text-ink">hello@isitup.dev</strong></p>
            <a href="#" className="py-3.5 px-8 bg-transparent text-ink font-mono text-[14px] cursor-pointer rounded-md border border-border no-underline inline-flex items-center gap-2.5 transition-all hover:bg-paper">Read the docs →</a>
          </div>
          <div className="lg:col-span-2 opacity-0 translate-y-[30px] fade-up">
            {[
              { q: 'How fast will I be alerted when something goes down?', a: 'On Pro and Team plans, monitors run every 30 or 15 seconds. If a check fails, we send your alert immediately — typically within 45 seconds of the first failure. You can also configure alerts to trigger only after 2–3 consecutive failures to reduce noise from transient errors.' },
              { q: 'What kinds of monitors can I create?', a: 'You can monitor any public HTTP/HTTPS endpoint — REST APIs, websites, GraphQL endpoints, webhooks. Specify the HTTP method (GET, POST, PUT, etc.), add custom headers, include a request body, and define exactly what a healthy response looks like.' },
              { q: 'Can I monitor internal or private APIs?', a: 'Currently IsItUp monitors from our cloud infrastructure, so your endpoint needs to be reachable from the public internet. You can use authentication headers (Bearer tokens, API keys, Basic Auth) to access protected endpoints. Private network monitoring via an agent is on our roadmap.' },
              { q: 'What happens to my data after the retention period?', a: 'Logs older than your plan\'s retention period are automatically deleted. On Team plans you get 1 year of history. You can export your log data to CSV at any time before it rolls off.' },
              { q: 'Can I cancel anytime?', a: 'Yes — no contracts or commitments. Cancel anytime from your account settings and you won\'t be charged again. Your monitors stay active until the end of your current billing period.' },
              { q: 'Do you offer a free trial for paid plans?', a: 'Yes. Pro and Team plans both include a 14-day free trial with full access to all features. No credit card required to start your trial.' },
            ].map((faq, i) => (
              <div key={i} className={`border-b border-border ${openFaq === i ? 'open' : ''}`}>
                <button className="w-full py-5 flex items-center justify-between bg-transparent border-none cursor-pointer font-mono text-[14px] text-ink text-left gap-4 hover:text-accent-dim" onClick={() => toggleFaq(i)}>
                  {faq.q}
                  <span className={`text-[18px] transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-45 text-accent' : 'text-muted'}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-[350ms] ease-in-out text-[13px] text-muted leading-[1.8] ${openFaq === i ? 'max-h-[200px] pb-5' : 'max-h-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[120px] px-8 lg:px-12 bg-paper text-center relative overflow-hidden opacity-0 translate-y-[30px] fade-up">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_50%,rgba(0,217,126,0.06)_0%,transparent_70%)]"></div>
        <div className="inline-flex items-center justify-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-muted mb-6 relative">Get started</div>
        <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light tracking-[-1.5px] leading-[1.1] text-ink mb-5 mx-auto relative">Stop finding out<br /><em className="italic text-accent-dim">too late.</em></h2>
        <p className="text-[15px] text-muted leading-[1.8] max-w-[500px] mx-auto text-center mb-10 relative">Set up your first monitor in 90 seconds. Free, forever, no credit card needed.</p>
        <div className="flex justify-center gap-4 flex-wrap relative">
          <Link to="/register" className="py-3.5 px-8 bg-ink text-cream font-mono text-[14px] cursor-pointer rounded-md border-none no-underline inline-flex items-center gap-2.5 transition-all hover:bg-[#1a1a24] hover:-translate-y-px">Create free account →</Link>
          <a href="#" className="py-3.5 px-8 bg-transparent text-ink font-mono text-[14px] cursor-pointer rounded-md border border-border no-underline inline-flex items-center gap-2.5 transition-all hover:bg-paper">See a live demo</a>
        </div>
        <p className="mt-4 text-[12px] text-muted relative">Free tier includes 3 monitors · 5-minute checks · Email alerts</p>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-white/40 pt-[60px] pb-10 px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-[18px] text-cream mb-3.5 flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 hover:text-white transition-colors">
              <img src="/icon-animated.svg" alt="" className="w-4 h-4 inline-block" />
              IsItUp
            </button>
            <p className="text-[13px] leading-[1.7] max-w-[280px]">Cloud-based monitoring for developers and teams who care about reliability. API and website uptime monitoring, real-time alerts, and diagnostics in one platform.</p>
          </div>
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.1em] text-white/60 mb-5">Product</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Features</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Pricing</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Changelog</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Status</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.1em] text-white/60 mb-5">Developers</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Documentation</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">API Reference</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Integrations</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Open Source</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.1em] text-white/60 mb-5">Company</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">About</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Blog</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Privacy</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">Terms</a></li>
              <li><a href="#" className="text-[13px] text-white/35 no-underline transition-colors hover:text-white/80">hello@isitup.dev</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex justify-between items-center flex-wrap gap-3">
          <p className="text-[12px]">© 2026 IsItUp. All rights reserved.</p>
          <div className="flex items-center gap-1.5 py-1 px-3.5 bg-accent/10 border border-accent/15 rounded-full text-[12px] text-accent">
            <AnimatedDot className="w-[15px] h-[15px] shrink-0" />
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}
