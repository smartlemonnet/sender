import Link from "next/link";
import { Sparkles, Zap, Target, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-slate-50">
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#06FF00]/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#06FF00] to-emerald-600 text-black shadow-lg shadow-[#06FF00]/25">
              <span className="text-lg font-bold">BL</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">BlueLime</p>
              <p className="text-xl font-bold tracking-tight text-white">Universe</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden text-sm font-semibold text-slate-300 transition hover:text-white sm:block"
            >
              Sign In
            </Link>
            <button className="rounded-xl border border-[#06FF00]/30 bg-[#06FF00]/10 px-5 py-2.5 text-sm font-semibold text-[#06FF00] transition hover:border-[#06FF00]/50 hover:bg-[#06FF00]/20">
              Request Demo
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#06FF00]/20 bg-[#06FF00]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#06FF00]">
                <Sparkles className="h-3.5 w-3.5" />
                The All-in-One Digital Marketing Suite
              </span>
              
              <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                From Idea to Revenue.{" "}
                <span className="bg-gradient-to-r from-[#06FF00] to-emerald-400 bg-clip-text text-transparent">
                  In One Flow.
                </span>
              </h1>
              
              <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
                <span className="font-semibold text-white">Create digital products</span>, publish on marketplace, 
                find targeted audiences and <span className="font-semibold text-white">launch cold email campaigns</span> — 
                all integrated. Zero external tools, maximum control.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] to-emerald-500 px-8 py-4 text-base font-semibold text-black shadow-lg shadow-[#06FF00]/25 transition hover:shadow-[#06FF00]/40"
                >
                  Start Free
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
                <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
                  <Zap className="h-5 w-5" />
                  Watch Video
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#06FF00]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#06FF00]" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#06FF00]" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Visual */}
        <section className="px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                The workflow that{" "}
                <span className="bg-gradient-to-r from-[#06FF00] to-emerald-400 bg-clip-text text-transparent">
                  revolutionizes marketing
                </span>
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                While they force you to use 10 different tools, we integrate everything
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Step 1: Labs */}
              <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 transition hover:border-[#06FF00]/30 hover:bg-white/10">
                <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#06FF00]/10 text-lg font-bold text-[#06FF00]">
                  1
                </div>
                <div className="mt-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">Labs</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Create digital products (audio, ebooks, courses) with AI. From idea to sellable product in hours.
                  </p>
                  <div className="mt-4">
                    <a href="https://market.bluelime.cool" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#06FF00] hover:underline">
                      View Labs →
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 2: Marketplace */}
              <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 transition hover:border-[#06FF00]/30 hover:bg-white/10">
                <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#06FF00]/10 text-lg font-bold text-[#06FF00]">
                  2
                </div>
                <div className="mt-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">Marketplace</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Publish and sell. Stripe integrated, vendor dashboard, automatic affiliation. Landing pages included.
                  </p>
                  <div className="mt-4">
                    <a href="https://market.bluelime.cool" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#06FF00] hover:underline">
                      View Marketplace →
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 3: Leads */}
              <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 transition hover:border-[#06FF00]/30 hover:bg-white/10">
                <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#06FF00]/10 text-lg font-bold text-[#06FF00]">
                  3
                </div>
                <div className="mt-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                    <Target className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">Leads</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Advanced scraping FB/IG/LinkedIn. Targeted queries, unlimited email validation. Cold but qualified lists.
                  </p>
                  <div className="mt-4">
                    <a href="https://bluelimeleads.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#06FF00] hover:underline">
                      View BlueLimeLeads →
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 4: Sender */}
              <div className="group relative rounded-3xl border border-[#06FF00]/20 bg-gradient-to-b from-[#06FF00]/10 to-transparent p-8 transition hover:border-[#06FF00]/40 hover:bg-[#06FF00]/20">
                <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#06FF00] text-lg font-bold text-black">
                  4
                </div>
                <div className="mt-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#06FF00]/20 text-[#06FF00]">
                    <Zap className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">Sender</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Ethical cold email campaigns. Own Mailcow, auto warm-up, drag&drop funnels, complete analytics.
                  </p>
                  <div className="mt-4">
                    <Link href="/dashboard" className="text-xs font-semibold text-[#06FF00] hover:underline">
                      Enter Sender →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow Arrow */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300">
                <span>Idea</span>
                <ArrowRight className="h-4 w-4 text-[#06FF00]" />
                <span>Product</span>
                <ArrowRight className="h-4 w-4 text-[#06FF00]" />
                <span>Audience</span>
                <ArrowRight className="h-4 w-4 text-[#06FF00]" />
                <span className="text-[#06FF00]">Revenue</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
              <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
                They overcomplicate your life.<br />
                <span className="bg-gradient-to-r from-[#06FF00] to-emerald-400 bg-clip-text text-transparent">
                  We simplify it.
                </span>
              </h2>

              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {/* Traditional Way */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-red-400">❌ The Traditional Way</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">•</span>
                      <span>10+ separate tools to pay and manage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">•</span>
                      <span>Fragile integrations that break</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">•</span>
                      <span>Scattered data, incomparable metrics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">•</span>
                      <span>Complex setups, steep learning curve</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">•</span>
                      <span>Monthly costs that add up ($500+/month)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">•</span>
                      <span>Deliverability out of control</span>
                    </li>
                  </ul>
                </div>

                {/* BlueLime Way */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#06FF00]">✓ The BlueLime Way</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#06FF00]" />
                      <span className="font-medium">One platform, everything integrated</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#06FF00]" />
                      <span className="font-medium">Native end-to-end workflow</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#06FF00]" />
                      <span className="font-medium">Unified analytics: lead → revenue</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#06FF00]" />
                      <span className="font-medium">5-minute setup, guided onboarding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#06FF00]" />
                      <span className="font-medium">Transparent pricing, no surprises</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#06FF00]" />
                      <span className="font-medium">Own email infrastructure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Ready to simplify your marketing?
            </h2>
            <p className="mt-6 text-lg text-slate-300">
              Join the early adopters who are already building the future of digital marketing.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] to-emerald-500 px-10 py-5 text-lg font-semibold text-black shadow-lg shadow-[#06FF00]/25 transition hover:shadow-[#06FF00]/40"
              >
                Start Now
                <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
                Book Personalized Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-8 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#06FF00] to-emerald-600 text-black">
                  <span className="font-bold">BL</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">BlueLime Universe</p>
                  <p className="text-xs text-slate-500">© {new Date().getFullYear()} All rights reserved</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
                <button className="hover:text-slate-300">Anti-Spam Policy</button>
                <button className="hover:text-slate-300">Privacy Policy</button>
                <button className="hover:text-slate-300">Terms of Service</button>
                <button className="hover:text-slate-300">Status</button>
                <a href="https://market.bluelime.cool" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">Marketplace</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
