import React from 'react';
import {
  Zap,
  Workflow,
  ShieldCheck,
  BarChart3,
  GitBranch,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#8f3d2b]" />,
      title: "Hyper-Fast Execution",
      description: "Optimized runtime engine built to process tasks in milliseconds with ultra-low latency and zero bottlenecks."
    },
    {
      icon: <Workflow className="w-6 h-6 text-[#2D5A46]" />,
      title: "Automated Workflows",
      description: "Define end-to-end automated pipelines with intuitive triggers, resilient rollbacks, and smart dependencies."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#1E3A8A]" />,
      title: "Enterprise Grade Security",
      description: "End-to-end encryption, strict role-based access control (RBAC), and SOC2 compliant telemetry."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#854D0E]" />,
      title: "Real-time Telemetry",
      description: "Granular observability across your entire stack with automated anomaly detection and instant alerts."
    },
    {
      icon: <GitBranch className="w-6 h-6 text-[#6B21A8]" />,
      title: "Git-Native Sync",
      description: "Continuous synchronization with GitHub, GitLab, and Bitbucket. Branch previews created automatically."
    },
    {
      icon: <Layers className="w-6 h-6 text-[#9F1239]" />,
      title: "Modular Integrations",
      description: "Connect with over 100+ platforms including Slack, Discord, AWS, Cloudflare, and custom webhooks."
    }
  ];

  return (
    <div className="bg-[#EFE7D8]/60 border-t border-[#DDD3C1]">
      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f3d2b] mb-2">Engineered For Velocity</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">Everything required to deliver high-impact software</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#FAF6EE] border border-[#DDD3C1] hover:border-[#8f3d2b]/40 hover:shadow-lg transition duration-300 group"
            >
              <div className="p-3 w-fit rounded-xl bg-[#EDE5D5] border border-[#DDD3C1]/80 mb-5 group-hover:scale-105 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1C1917] mb-2">{feat.title}</h3>
              <p className="text-sm text-[#5C5449] leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture / How It Works */}
      <section id="architecture" className="py-20 border-t border-[#DDD3C1] bg-[#EDE5D5]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f3d2b] mb-2">Simplicity by Design</h2>
            <p className="text-3xl font-extrabold text-[#1C1917]">Three steps to effortless momentum</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 rounded-2xl bg-[#FAF6EE] border border-[#DDD3C1] shadow-xs">
              <div className="text-4xl font-extrabold text-[#8f3d2b]/25 mb-4">01</div>
              <h4 className="text-lg font-bold text-[#1C1917] mb-2">Connect Repository</h4>
              <p className="text-sm text-[#5C5449]">Link your GitHub repository in seconds. Yatna auto-detects dependencies and build profiles.</p>
            </div>
            <div className="relative p-8 rounded-2xl bg-[#FAF6EE] border border-[#DDD3C1] shadow-xs">
              <div className="text-4xl font-extrabold text-[#8f3d2b]/25 mb-4">02</div>
              <h4 className="text-lg font-bold text-[#1C1917] mb-2">Configure Pipelines</h4>
              <p className="text-sm text-[#5C5449]">Use declarative YAML or intuitive UI flows to set test suites, previews, and deploy hooks.</p>
            </div>
            <div className="relative p-8 rounded-2xl bg-[#FAF6EE] border border-[#DDD3C1] shadow-xs">
              <div className="text-4xl font-extrabold text-[#8f3d2b]/25 mb-4">03</div>
              <h4 className="text-lg font-bold text-[#1C1917] mb-2">Ship Continuously</h4>
              <p className="text-sm text-[#5C5449]">Every Git push triggers instant validation, smart cache invalidation, and lightning delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

