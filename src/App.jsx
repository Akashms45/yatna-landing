import React, { useState } from 'react'
import CurtainReveal from './CurtainReveal'
import heroImage from './assets/hero.png'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Workflow,
  GitBranch,
  Terminal,
  CheckCircle2,
  ChevronRight,
  Layers,
  Users,
  Star,
  Check
} from 'lucide-react'

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [replayCount, setReplayCount] = useState(0)

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Hyper-Fast Execution",
      description: "Optimized runtime engine built to process tasks in milliseconds with ultra-low latency and zero bottlenecks."
    },
    {
      icon: <Workflow className="w-6 h-6 text-indigo-400" />,
      title: "Automated Workflows",
      description: "Define end-to-end automated pipelines with intuitive triggers, resilient rollbacks, and smart dependencies."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Enterprise Grade Security",
      description: "End-to-end encryption, strict role-based access control (RBAC), and SOC2 compliant telemetry."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
      title: "Real-time Telemetry",
      description: "Granular observability across your entire stack with automated anomaly detection and instant alerts."
    },
    {
      icon: <GitBranch className="w-6 h-6 text-purple-400" />,
      title: "Git-Native Sync",
      description: "Continuous synchronization with GitHub, GitLab, and Bitbucket. Branch previews created automatically."
    },
    {
      icon: <Layers className="w-6 h-6 text-rose-400" />,
      title: "Modular Integrations",
      description: "Connect with over 100+ platforms including Slack, Discord, AWS, Cloudflare, and custom webhooks."
    }
  ]

  const metrics = [
    { value: "10x", label: "Faster Deployment Cycles" },
    { value: "99.99%", label: "Guaranteed Uptime SLA" },
    { value: "50k+", label: "Tasks Orchestrated Daily" },
    { value: "4.9/5", label: "Developer Satisfaction" }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      cadence: "forever free",
      description: "Ideal for individual developers and side projects.",
      features: [
        "Up to 3 active projects",
        "Community support & Discord access",
        "1,000 monthly execution minutes",
        "Standard deployment pipelines"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "$29",
      cadence: "per member / month",
      description: "Built for scaling teams requiring high throughput.",
      features: [
        "Unlimited projects & team workspaces",
        "Priority 24/7 dedicated support",
        "50,000 monthly execution minutes",
        "Custom domain & SSL provisioning",
        "Advanced RBAC & audit logging"
      ],
      popular: true,
      cta: "Start 14-Day Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      cadence: "tailored SLA",
      description: "Mission-critical infrastructure and compliance support.",
      features: [
        "Dedicated isolated infrastructure",
        "Custom contracts & invoicing",
        "Tailored SLA guarantee (99.999%)",
        "Custom SSO & SAML integrations",
        "Dedicated Solutions Architect"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Glow Highlights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/20 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-[600px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Yatna
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-white transition-colors">Docs</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setReplayCount((c) => c + 1)}
              className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-amber-200 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition cursor-pointer"
              title="Watch curtain reveal again"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Replay Reveal</span>
            </button>
            <a
              href="https://github.com/Akashms45/yatna-landing"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <button className="text-sm font-semibold px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <CurtainReveal replayKey={replayCount}>
        <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
          {/* Theatrical Stage Spotlight & Backdrop */}
          <div data-reveal-bg className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
            {/* Top Stage Spotlight Cone */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.45)_0%,rgba(168,85,247,0.2)_40%,transparent_75%)] blur-[40px]" />
            
            {/* Glowing Stage Floor Rings */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-indigo-500/20 shadow-[0_0_80px_rgba(99,102,241,0.25)]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-purple-500/25 shadow-[0_0_60px_rgba(168,85,247,0.2)]" />
            
            {/* Center Radiant Core */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-indigo-500/30 via-purple-500/25 to-pink-500/20 blur-[100px] rounded-full" />
            
            {/* Grid Pattern Floor Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b18_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b18_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
          </div>

          <div data-reveal className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Introducing Yatna 2.0 • Effort Reimagined</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>

          <h1 data-reveal className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Turn continuous effort into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              flawless digital execution
            </span>
          </h1>

          <p data-reveal className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-10 leading-relaxed">
            Yatna streamlines your engineering workflows, accelerates deployment lifecycles, and eliminates friction so your team can focus on building what matters.
          </p>

          <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5">
              <span>Start Building for Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 transition">
              Book a Live Demo
            </button>
          </div>

          {/* Live Terminal / Code Mockup */}
          <div data-reveal className="mt-16 text-left rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 ml-2 font-mono">yatna-core-cluster // main</span>
              </div>
              <div className="flex space-x-2 text-xs">
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === 'pipeline' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  pipeline.yml
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === 'terminal' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  terminal
                </button>
              </div>
            </div>
            <div className="p-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
              {activeTab === 'pipeline' ? (
                <pre className="text-slate-300">
                  <code>
                    <span className="text-indigo-400">version:</span> <span className="text-emerald-400">"2.4"</span>{'\n'}
                    <span className="text-indigo-400">project:</span> yatna-production{'\n'}
                    <span className="text-indigo-400">environment:</span> edge-global{'\n'}
                    <span className="text-indigo-400">stages:</span>{'\n'}
                    {'  '}- <span className="text-purple-400">name:</span> lint-and-test{'\n'}
                    {'    '}<span className="text-indigo-400">run:</span> npm test && npm run lint{'\n'}
                    {'  '}- <span className="text-purple-400">name:</span> build-and-optimize{'\n'}
                    {'    '}<span className="text-indigo-400">framework:</span> react-vite-tailwind{'\n'}
                    {'    '}<span className="text-indigo-400">target:</span> zero-cold-start{'\n'}
                    {'  '}- <span className="text-purple-400">name:</span> deploy{'\n'}
                    {'    '}<span className="text-indigo-400">strategy:</span> canary-rolling-update{'\n'}
                    {'    '}<span className="text-emerald-400">status:</span> <span className="text-emerald-400 font-bold">SUCCESS (took 840ms)</span>
                  </code>
                </pre>
              ) : (
                <pre className="text-emerald-400">
                  <code>
                    $ yatna sync --remote=origin --branch=main{'\n'}
                    <span className="text-slate-400">[0.12s] Connecting to secure gateway... Connected.</span>{'\n'}
                    <span className="text-slate-400">[0.35s] Validating React + Vite + Tailwind manifests... Valid.</span>{'\n'}
                    <span className="text-slate-400">[0.51s] Synchronizing Git HEAD to origin/main... Done.</span>{'\n'}
                    <span className="text-cyan-400">[0.84s] Deployment live at: https://yatna-landing.dev</span>
                  </code>
                </pre>
              )}
            </div>
          </div>
        </section>
      </CurtainReveal>

      {/* Metrics Section */}
      <section className="py-12 border-y border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {metrics.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Engineered For Scale</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Everything you need to deliver high-velocity products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition duration-300 group"
            >
              <div className="p-3 w-fit rounded-xl bg-slate-800/80 border border-slate-700/60 mb-5 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture / How it Works */}
      <section id="architecture" className="py-20 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">Simplicity by Design</h2>
            <p className="text-3xl font-bold text-white">Three steps to effortless momentum</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-4xl font-extrabold text-indigo-500/30 mb-4">01</div>
              <h4 className="text-lg font-semibold text-white mb-2">Connect Repository</h4>
              <p className="text-sm text-slate-400">Link your GitHub repository with one click. Yatna auto-detects dependencies and build profiles.</p>
            </div>
            <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-4xl font-extrabold text-purple-500/30 mb-4">02</div>
              <h4 className="text-lg font-semibold text-white mb-2">Configure Pipelines</h4>
              <p className="text-sm text-slate-400">Use declarative yaml or visual flow designers to set test suites, previews, and deploy hooks.</p>
            </div>
            <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-4xl font-extrabold text-pink-500/30 mb-4">03</div>
              <h4 className="text-lg font-semibold text-white mb-2">Ship Continuously</h4>
              <p className="text-sm text-slate-400">Every git push triggers instant validation, smart cache invalidation, and lightning delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Transparent Pricing</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Predictable plans for teams of any size</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-8 rounded-2xl bg-slate-900/70 border ${
                plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10' : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold tracking-wide text-white shadow-md">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{plan.description}</p>
                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.cadence}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((item, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900 border border-indigo-500/30 p-10 sm:p-16 text-center shadow-2xl backdrop-blur-md">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to experience effortless velocity?
          </h2>
          <p className="max-w-xl mx-auto text-slate-300 text-sm sm:text-base mb-8">
            Join thousands of developers shipping resilient software with Yatna. Start free today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-white text-slate-950 hover:bg-slate-200 transition shadow-lg">
              Get Started for Free
            </button>
            <a
              href="https://github.com/Akashms45/yatna-landing"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-slate-900/90 border border-slate-700 text-white hover:bg-slate-800 transition"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-300 text-sm">Yatna</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#features" className="hover:text-slate-400 transition">Features</a>
            <a href="#pricing" className="hover:text-slate-400 transition">Pricing</a>
            <a href="#docs" className="hover:text-slate-400 transition">Docs</a>
            <a href="https://github.com/Akashms45/yatna-landing" className="hover:text-slate-400 transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
