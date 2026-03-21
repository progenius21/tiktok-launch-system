const CHECKOUT_URL = "https://tiktoklaunchsystem.lemonsqueezy.com/checkout";

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      className="w-5 h-5 ml-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}

function CTAButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`inline-flex items-center justify-center font-bold rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 text-white transition-all duration-200 animate-pulse-glow shadow-lg hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] ${
        large
          ? "px-10 py-5 text-xl"
          : "px-8 py-4 text-lg"
      }`}
    >
      Get Instant Access — $149
      <ArrowRight />
    </a>
  );
}

const whatIsInside = [
  {
    icon: "🌐",
    title: "VPN Setup System",
    description:
      "Step-by-step VPN configuration to position your TikTok account in the US market—where virality happens fastest and app installs convert at the highest rate.",
  },
  {
    icon: "🎬",
    title: "Viral Slide-Style TikTok Framework",
    description:
      "The exact content formula for building slide-style TikToks that stop the scroll, build desire, and drive viewers straight to your app store listing.",
  },
  {
    icon: "🤖",
    title: "VA Execution Playbook",
    description:
      "Hire and train a virtual assistant to run the entire content engine for you. Full SOPs, scripts, and quality-control checklists included.",
  },
  {
    icon: "💬",
    title: "Private Founder Community",
    description:
      "Ask questions, share wins, and get direct feedback from other app founders running the same system. Real people, real results, no fluff.",
  },
];

const proofStats = [
  { number: "10K+", label: "Users from a single channel" },
  { number: "$0", label: "Paid to any ad network" },
  { number: "$149", label: "One-time investment" },
  { number: "1", label: "System. Repeatable on any app." },
];

const faqs = [
  {
    q: "Do I need to be a TikTok expert?",
    a: "No. The system is designed so anyone can follow it—and eventually hand it off to a VA entirely. You don't need followers or prior TikTok experience.",
  },
  {
    q: "What kind of apps does this work for?",
    a: "Any consumer or B2B SaaS app with a clear use case. The framework works best when your app solves a specific, relatable pain point—which you can communicate in a 30-second slide video.",
  },
  {
    q: "How fast can I expect results?",
    a: "Most founders following the system start seeing consistent daily installs within 2–4 weeks of posting. Reaching 10K users depends on your posting consistency and niche.",
  },
  {
    q: "Is this a one-time payment?",
    a: "Yes. $149 gets you lifetime access to the guide, playbook, and community. No subscriptions, no upsells.",
  },
  {
    q: "What if I'm not in the US?",
    a: "That's exactly what the VPN setup module covers. You can target the US market from anywhere in the world.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080810] text-[#f0f0f8] overflow-x-hidden">
      {/* Ambient background blobs */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-600/6 blur-[100px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 w-full border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight gradient-text">
            TikTok Launch System
          </span>
          <a
            href={CHECKOUT_URL}
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30 hover:text-white transition-all duration-150"
          >
            Get Access →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Trusted by indie app founders worldwide
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
          0 to{" "}
          <span className="gradient-text">10,000 Users.</span>
          <br />
          <span className="text-white/90">Zero Ad Spend.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          The proven TikTok system that takes your app from invisible to
          unstoppable—organically. No algorithms gamed. No money burned. Just a
          repeatable content engine that works.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <CTAButton large />
        </div>

        <p className="text-sm text-white/30">
          One-time payment · Instant access · Lifetime community
        </p>

        {/* Hero visual — placeholder for TikTok screenshot grid */}
        <div className="mt-16 relative">
          <div className="gradient-border rounded-2xl bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-white/30 mb-6 font-semibold">
              Real view counts from the system
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { views: "1.2M", label: "App demo reel" },
                { views: "840K", label: "Feature walkthrough" },
                { views: "2.1M", label: "Pain-point hook" },
                { views: "670K", label: "Founder story" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white/5 border border-white/10 p-4 text-center flex flex-col items-center justify-center aspect-[9/14] sm:aspect-auto sm:py-8 gap-2"
                >
                  <span className="text-2xl sm:text-3xl font-black gradient-text">
                    {item.views}
                  </span>
                  <span className="text-xs text-white/40 leading-tight">
                    {item.label}
                  </span>
                  <div className="w-10 h-1.5 rounded-full bg-violet-500/40 mt-1" />
                </div>
              ))}
            </div>
            <p className="text-xs text-white/20 mt-4 italic">
              * Replace with actual TikTok screenshots for maximum social proof
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {proofStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-black gradient-text">
                {stat.number}
              </span>
              <span className="text-sm text-white/40">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
              You built something great.{" "}
              <span className="text-white/40">Nobody knows it exists.</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                You&apos;ve shipped the app. The product works. But organic search is
                slow, paid ads are expensive, and cold outreach barely moves the
                needle.
              </p>
              <p>
                Meanwhile, some founder with the same type of app is pulling{" "}
                <strong className="text-white/80">millions of views</strong> on
                TikTok and stacking thousands of downloads every week—without
                spending a cent.
              </p>
              <p>
                The difference isn&apos;t luck. It&apos;s a system. And you can have it
                for{" "}
                <strong className="text-white/80">$149</strong>.
              </p>
            </div>
          </div>
          <div className="gradient-border rounded-2xl bg-white/[0.03] p-6 space-y-4">
            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest">
              What changes with this system
            </p>
            {[
              "Stop burning budget on Facebook/Google ads",
              "Go from 0 to 10K real users organically",
              "Build a content engine that runs without you",
              "Enter the US market from anywhere in the world",
              "Turn 10K users into meaningful MRR",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section
        id="inside"
        className="relative z-10 border-t border-white/5 bg-white/[0.02]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Everything inside the{" "}
              <span className="gradient-text">TikTok Launch System</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              A complete, step-by-step operating system—from first video to
              10,000 users.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {whatIsInside.map((item) => (
              <div
                key={item.title}
                className="gradient-border rounded-2xl bg-white/[0.03] p-6 flex gap-4 hover:bg-white/[0.05] transition-colors duration-200"
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / testimonials placeholder */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Founders running the system
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Real results from real people who followed the exact framework.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              name: "Alex M.",
              role: "SaaS founder",
              quote:
                "Hit 10K users in 6 weeks. My app was invisible before this. The VPN setup alone unlocked a completely different level of reach.",
            },
            {
              name: "Jordan T.",
              role: "Indie app developer",
              quote:
                "I handed this off to a VA after week 2. Now the channel runs itself and I&apos;m still getting daily installs while I code.",
            },
            {
              name: "Sam R.",
              role: "Mobile app founder",
              quote:
                "Spent $0 on ads. The slide format works insanely well. One video hit 800K views and converted for weeks.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="gradient-border rounded-2xl bg-white/[0.03] p-6 flex flex-col gap-4"
            >
              <p className="text-white/70 text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing / CTA */}
      <section
        id="pricing"
        className="relative z-10 border-t border-white/5 bg-white/[0.02]"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            One price. Lifetime access.
          </h2>
          <p className="text-white/50 mb-12 max-w-lg mx-auto">
            The $149 pays for itself the moment your first 100 users convert
            into subscribers.
          </p>

          <div className="gradient-border rounded-2xl bg-white/[0.03] p-8 sm:p-10 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl sm:text-6xl font-black text-white">
                $149
              </span>
            </div>
            <p className="text-white/40 text-sm mb-8">
              One-time · No subscription · Instant access
            </p>

            <div className="space-y-3 text-left mb-10">
              {[
                "VPN Setup System for US market targeting",
                "Viral Slide-Style TikTok Framework",
                "VA Execution Playbook (full SOPs included)",
                "Private Founder Community (lifetime access)",
                "Future updates at no extra cost",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <CTAButton large />

            <p className="text-xs text-white/30 mt-5">
              Secure checkout via Lemon Squeezy · Instant delivery
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <h2 className="text-3xl font-black text-center mb-12">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="gradient-border rounded-xl bg-white/[0.03] p-6"
            >
              <h3 className="font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-violet-950/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
            Your app deserves{" "}
            <span className="gradient-text">10,000 users</span>.
            <br />
            Let&apos;s get them.
          </h2>
          <p className="text-white/50 mb-10 max-w-lg mx-auto">
            Stop waiting for word of mouth. One proven system. Zero ad spend.
            Real users.
          </p>
          <CTAButton large />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <span className="font-semibold gradient-text">TikTok Launch System</span>
          <span>© {new Date().getFullYear()} · All rights reserved</span>
        </div>
      </footer>
    </main>
  );
}
