import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const plans = [
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
  ];

  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f3d2b] mb-2">Predictable Pricing</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">Fair plans for teams of any scale</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between p-8 rounded-2xl bg-[#FAF6EE] border transition duration-300 ${
              plan.popular
                ? 'border-[#8f3d2b] shadow-xl ring-2 ring-[#8f3d2b]/20'
                : 'border-[#DDD3C1] shadow-xs hover:border-[#8f3d2b]/40'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#8f3d2b] text-xs font-semibold tracking-wide text-white shadow-xs">
                Most Popular
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-[#1C1917] mb-1">{plan.name}</h3>
              <p className="text-xs text-[#5C5449] mb-6">{plan.description}</p>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-extrabold text-[#1C1917]">{plan.price}</span>
                <span className="text-xs text-[#7A7061]">{plan.cadence}</span>
              </div>
              <div className="space-y-3 mb-8">
                {plan.features.map((item, fIdx) => (
                  <div key={fIdx} className="flex items-center space-x-2.5 text-xs text-[#4A4238]">
                    <Check className="w-4 h-4 text-[#8f3d2b] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`w-full py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${
                plan.popular
                  ? 'bg-[#8f3d2b] hover:bg-[#6d281c] text-white shadow-md'
                  : 'bg-[#1C1917] hover:bg-[#332E2A] text-[#F7F0E3]'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Warm CTA Banner */}
      <div className="rounded-3xl bg-[#EDE5D5] border border-[#DDD3C1] p-10 sm:p-14 text-center shadow-lg">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] mb-4">
          Ready to experience effortless velocity?
        </h3>
        <p className="max-w-xl mx-auto text-[#5C5449] text-sm sm:text-base mb-8 leading-relaxed">
          Join thousands of developers shipping resilient software with Yatna. Start your free trial today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-[#1C1917] text-[#F7F0E3] hover:bg-[#332E2A] transition shadow-md cursor-pointer">
            Get Started Free
          </button>
          <a
            href="https://github.com/Akashms45/yatna-landing"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-[#FAF6EE] border border-[#DDD3C1] text-[#1C1917] hover:bg-white transition cursor-pointer"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

