'use client';

import Link from "next/link";

// TODO: Collegare form di accesso con Supabase Auth / SSO Bluelime.
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_top,rgba(56,189,248,0.12),rgba(15,23,42,0.05)_62%,rgba(15,23,42,0.92))]" />
      <div className="relative flex min-h-screen flex-col justify-between">
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-blue-600 text-white shadow-lg">
              <span>BL</span>
            </div>
            <div>
              <p className="text-slate-200">Bluelime Universe</p>
              <p className="text-xl text-white">Sender Platform</p>
            </div>
          </div>
          <button className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/35 hover:text-white">
            Richiedi Demo
          </button>
        </header>

        <main className="flex flex-1 flex-col-reverse items-center gap-10 px-6 pb-16 pt-6 md:flex-row md:items-stretch md:gap-16 md:px-12 lg:px-20">
          <div className="flex w-full flex-col justify-center gap-6 md:w-1/2">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200">
              Cold Email Engine
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Orchestrare campagne, domini e caselle in un unico control center.
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Un&apos;interfaccia visiva pensata per i marketer che vivono di outreach: automazioni drag & drop, CRM integrato e provisioning di mailbox su misura.
            </p>
            <dl className="grid w-full gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 sm:grid-cols-3">
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.28em] text-slate-400">Warm-up</dt>
                <dd className="text-lg font-semibold text-white">Autonomo</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.28em] text-slate-400">Caselle</dt>
                <dd className="text-lg font-semibold text-white">Scalabilità illimitata</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.28em] text-slate-400">Suite</dt>
                <dd className="text-lg font-semibold text-white">Bluelime Universe</dd>
              </div>
            </dl>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_35px_60px_-40px_rgba(15,23,42,0.6)] backdrop-blur-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                Accesso riservato
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-white">Accedi al Control Center</h2>
              <p className="mt-2 text-sm text-slate-300">
                Usa le tue credenziali Bluelime oppure richiedi un invito dal team amministratore.
              </p>

              <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                  >
                    Business email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="squad@azienda.com"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-sky-300/80 focus:bg-white/15"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-sky-300/80 focus:bg-white/15"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/15 bg-transparent text-sky-400 focus:ring-sky-500"
                    />
                    Ricordami
                  </label>
                  <button
                    type="button"
                    className="font-semibold text-slate-200 underline-offset-4 hover:text-white hover:underline"
                  >
                    Recupera accesso
                  </button>
                </div>

                <Link
                  href="/dashboard"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110"
                >
                  Entra in Dashboard
                </Link>
              </form>

              <p className="mt-6 text-center text-xs text-slate-400">
                Non hai ancora un accesso? <span className="font-semibold text-slate-200">Contatta il team Bluelime</span>
              </p>
            </div>
          </div>
        </main>

        <footer className="flex flex-col gap-2 px-8 pb-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bluelime Universe. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-slate-200">Politiche Anti-Spam</button>
            <button className="hover:text-slate-200">Condizioni d&apos;uso</button>
            <button className="hover:text-slate-200">Status infrastruttura</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
