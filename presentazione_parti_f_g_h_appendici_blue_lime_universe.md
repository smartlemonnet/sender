# BlueLime Universe — Parti F, G, H & Appendici

---

## Macro‑Parte F — Roadmap & Milestone

### Visione 12 mesi
Obiettivo: portare BlueLime da MVP funzionale a suite GA con primi partner/affiliati e due case study pubblici.

### Q1 (Mesi 1–3) — Stabilizzazione & GA fondamentali
**Focus**: affidabilità invio, usabilità core, attivazione utenti.
- **Sender/CRM**: hardening deliverability (cap per inbox, warm‑up guidato, blacklist/suppressions), reply‑tracking stabile, calendaring CRM.
- **Editor Landing**: **GA** con 10 template, form nativo, publish 1‑click/HTML export.
- **Onboarding**: wizard DNS, checklist 5 step, sample list 200 lead convalidati.
- **Analytics base**: open/click/reply per campagna, bounce/complaint.
- **KPI Q1**: activation ≤72h ≥40%; inbox rate +8pp vs baseline; churn < 5%/m.

### Q2 (Mesi 4–6) — Prodotto esteso & automazioni
**Focus**: produzione asset e automazioni avanzate.
- **Labs standalone**: pipeline audio→testo→audiolibro/ebook; export MP3/EPUB/PDF.
- **Funnel/Automazioni**: nodi condizionali, throttling per mailbox, A/B soggetti/CTA; spintext.
- **Analytics revenue**: attribution lead→ordine; coorti base.
- **Partnership beta**: 5 micro‑agenzie UK (reseller/referral).
- **KPI Q2**: 500 utenti paganti, NPS > 35, trial→paid ≥ 10%.

### Q3 (Mesi 7–9) — Marketplace & canali di crescita
**Focus**: monetizzazione creator e scale commerciale.
- **Marketplace full**: listing, pagamenti Stripe, affiliazione interna, area corsi base.
- **Piano Vendor $497**: landing auto‑generate, email funnel base, onboarding dedicato.
- **Affiliazione pubblica**: kit media, link tracking affiliati, payout.
- **KPI Q3**: 1.200 paganti; GMV marketplace iniziale €250k; 50 partner affiliati attivi.

### Piloti & Case studies
- **UK Agencies**: 1 campagna "query→lead→booking" con report pubblico.
- **Pink Lemon**: B2C (fitness leggings) con landing, drip e vendite tracciate.

---

## Macro‑Parte G — Rischi & Mitigazioni

| Rischio | Impatto | Prob. | Mitigazione |
|---|---|---:|---|
| Deliverability (spam/bounce) | Alto | Medio | Warm‑up progressivo; cap 50/die/inbox; rotazione domini; monitor reputation; template plain‑text; opt‑out 1‑click. |
| Qualità dati (lead scarsi) | Medio | Medio | Libreria **query** curata; QA campionamento; validazione MX/catch‑all; dedup; enrichment minimo. |
| Compliance (GDPR/EAA) | Alto | Basso‑Medio | DPO process: registro trattamenti, basi legali, privacy‑by‑design; log consenso/opt‑out; email accessibili WCAG. |
| Dipendenze terze (search/validation/proxy) | Medio | Medio | Provider alternativi; caching risultati; modalità batch offline; feature flag. |
| Scalabilità infra (code invio/queue lag) | Medio | Basso | Redis Streams + consumer groups; autoscale worker; alert lag; indici DB e backpressure. |
| Roadmap slippage (dev agent) | Medio | Medio | Sprint time‑boxed; deliverable modulari; fallback manuali; freeze sulle feature non critiche. |
| Sicurezza (segreti, accessi) | Alto | Basso | Vault secrets; RBAC/ABAC; RLS Postgres; audit log; backup+DR test trimestrali. |

**Contingenza**: "kill‑switch" campagne, sospensione automatica su spike bounce>2% o complaint>0,2%.

---

## Macro‑Parte H — Team & “Ask”

### Competenze core
- **Prodotto/GT**: visione suite, UX low‑friction, metriche attivazione/retention.
- **Backend/Infra**: orchestrazione scraping, sender, tracking, ETL analytics.
- **Deliverability/Compliance**: DNS, reputation, policy GDPR/EAA.
- **Go‑to‑Market**: cold email, partnership agenzie, content playbook.

### Advisory (target)
- **Tecnico**: architetture event‑driven, data warehouse/ClickHouse.
- **Legale**: privacy europea, antispam, contrattualistica affiliati.
- **Growth**: pricing, affiliazione, marketplace readiness.

### “Ask” (Seed)
- **Round**: **€400–600k**.  
- **Uso fondi (12–15 mesi)**:  
  - 40% **Sviluppo** (Labs, Funnel avanzato, Marketplace, Analytics).  
  - 25% **Infra & deliverability** (IP, domini, validazione, monitoraggio).  
  - 25% **GTM** (partnership, contenuti, demo, affiliazione).  
  - 10% **Compliance & legale**.
- **Milestone di round**: 2.000 paganti; ARR €1.2–2.0M; 2 case study pubblici; marketplace live con GMV €500k.

---

## Appendici

### A) Esempi di query “perfette” per nicchia
- **Immobiliare investitori (Bologna)**  
`site:linkedin.com ("investitore immobiliare" OR "real estate investor") AND (Bologna OR Emilia-Romagna)`
- **Fitness creator (Italia)**  
`(site:instagram.com OR site:tiktok.com) ("allenamento" OR "workout" OR "leggings") ("@gmail.com" OR "@yahoo.com") -brand -shop`
- **SaaS B2B (UK growth roles)**  
`site:linkedin.com ("Head of Growth" OR "Demand Gen") (SaaS) (London OR Manchester)`

### B) Template email & funnel (estratto)
- **Subject**: `Abbiamo trovato 214 contatti *[niche]* a *[città]* — vuoi vederli?`
- **Body (50 righe)**: prova sociale sintetica, 1 CTA singola, link a landing con demo 30s.
- **Drip 5 email**: Day0 intro + prova → Day2 snapshot metriche → Day4 mini‑demo gif → Day7 case real → Day14 magnete V2.

### C) Schema dati CRM + pipeline invio (riassunto)
- **contacts**(email, nome, source_url, tags) ↔ **lists/segments** ↔ **campaigns/sequences** ↔ **events** (sent/open/click/reply) ↔ **revenue_attrib**.

### D) Glossario essenziale
- **Deliverability**: probabilità di finire in inbox.  
- **Scraping mirato**: raccolta dati via query specifiche per persona/intent/geo/canale.  
- **Opt‑out**: disiscrizione 1‑click tracciata.  
- **Catch‑all**: dominio che accetta qualsiasi email; validazione speciale.  
- **Throttling**: limite di invii per casella/tempo.  
- **Attribution**: collegare eventi marketing a ricavi.

