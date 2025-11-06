# BlueLime Universe — Parte C · Tech Stack & Architettura

> Obiettivo: massima precisione tecnica, vista end‑to‑end (frontend → backend → infra → dati → email). Diagrammi ASCII inclusi.

---

## 0) Architettura ad alto livello
```
[Browser/Client]
   ↓
[Frontend SPA: React+TS]  ←→  [CDN/Asset Cache]
   ↓                                 ↑
[API Gateway/Edge Router (Traefik)]  |
   ↓                                 |
[Backend Services (Dockerized, k8s-ready)]
  ├─ Auth & Users (OAuth/JWT)
  ├─ Leads & Scraper Orchestrator (agent Leap)
  ├─ CRM & Lists
  ├─ Campaign/Funnel Engine (scheduler+worker)
  ├─ Sender Service (SMTP/Queue → Mailcow)
  ├─ Tracking Service (pixel+link redirect)
  ├─ Marketplace/Payments
  ├─ Analytics ETL (events→warehouse)
  └─ Admin/Config
   ↓
[DB Primary: PostgreSQL]  [Cache/Queue: Redis]  [Object Storage: S3‑compatible]
   ↓
[Observability: Prometheus+Grafana, Loki, Sentry]
   ↓
[Infra: VPS Hostinger (Mailcow), Docker, Traefik, Let’s Encrypt]
```

---

## 1) Frontend
- **Librerie**: React 18 + TypeScript, Vite build, **TailwindCSS**; componenti **shadcn/ui**, icone **lucide-react**; animazioni **Framer Motion**.
- **State**: Zustand (store locali) + React Query (fetching/cache API) con invalidation per risorse.
- **Form/UX**: React Hook Form + Zod per validazione; Upload con Uppy/Dropzone.
- **Routing**: React Router, code‑splitting via lazy() e dynamic import.
- **i18n**: i18next, namespaces per moduli (Leads, CRM, Mail, Marketplace).
- **Accessibilità**: Radix primitives.
- **Build/Qualità**: ESLint+Prettier, Vitest+Testing Library; Lighthouse budget.
- **Sicurezza**: CSP strict, sanitize HTML (DOMPurify) in editor; token nel memory‑only (mai in localStorage per JWT sensibili).

**Moduli UI principali**
- **Labs**: uploader, editor trascrizioni, anteprima player, export wizard.
- **Editor Landing**: canvas drag&drop (grid), blocchi riutilizzabili, export HTML/JSON, form connector.
- **Leads**: query builder (persona/intent/geo/canale), risultati tabellari, validazione, tag/segmenti.
- **CRM**: profilo, timeline, segmenti dinamici, calendario.
- **Funnel**: canvas nodi (Trigger/Condizione/Azione), scheduling, A/B.
- **Mail**: domini/caselle, volumi, reputazione; composer semplice e template Handlebars.
- **Analytics**: KPI, coorti, attribution (query→lista→campagna→vendite).

---

## 2) API & Backend (servizi)
- **Gateway**: Traefik (reverse proxy, TLS, rate‑limit, JWT forward auth). Opzionale: API Keys per integrazioni.
- **Pattern**: micro‑servizi Docker; compatibili k8s; comunicazioni REST (JSON) + eventi asincroni (Redis Streams).
- **Auth**: JWT short‑lived (15m) + refresh token httpOnly; OAuth 2.1 (Google, GitHub) per login; RBAC ruoli: Explorer, Creator, Affiliate, VIP, Admin.
- **Validation**: Zod a livello controller, schema‑first; openapi.yaml generato.
- **File**: S3‑compatible (MinIO/S3), presigned URL.

**Servizi chiave**
1) **Leads Orchestrator**
   - Orchetra scraping via agent **Leap** (con connettori: Serper, siti target, social ove lecito).
   - Pipeline: Fetch → Parse → Normalize → Dedup → Validate (MX/syntax/catch‑all) → Enrich.
   - Rate‑limit per dominio; anti‑ban (rotazione UA/proxy, se utilizzati).

2) **CRM & Lists**
   - REST CRUD per contacts, lists, segments (filtri salvati), tasks, notes.
   - Segmenti dinamici (SQL materialized view o computed on the fly con cache).

3) **Campaign/Funnel Engine**
   - Graph model dei **nodi** (trigger/condizioni/azioni) persistito.
   - **Scheduler**: calcola job (es. invia 50/die/casella) → mette su **queue**.
   - **Workers** idempotenti con retry/backoff.

4) **Sender Service**
   - SMTP client verso **Mailcow** (per dominio/casella) con **per‑mailbox throttle**.
   - Gestione bounce/complaint via webhook IMAP/SMTP feedback → aggiorna stati lead.
   - Template engine **Handlebars/MJML→HTML**.

5) **Tracking Service**
   - **Open pixel** (1×1), **click redirect** (short link con firma).
   - Eventi firmati (HMAC) → coda → **events** table.

6) **Marketplace/Payments**
   - Prodotti, ordini, payout; Stripe (Checkout/Webhooks), pagamenti EU‑ready.

7) **Analytics ETL**
   - Consuma eventi, arricchisce (dim campaign/list/lead), aggrega in warehouse (Postgres o DuckDB/ClickHouse per volumi alti).

---

## 3) Data Layer
- **Primario**: **PostgreSQL** 14/15.
- **Cache**: **Redis** (keys TTL, rate‑limit, sessioni server‑side, code/Streams).
- **Ricerca**: trigram/GIN per email/nome; opzionale Elasticsearch/OpenSearch per ricerche full‑text/pivot grandi.
- **File**: MinIO/S3 per asset (cover, export, attachment).

**Schema (estratto, pseudo‑DDL)**
```sql
-- Leads/CRM
TABLE contacts (
  id uuid pk, email citext unique, first_name text, last_name text,
  phone text, source_url text, tags text[], created_at timestamptz,
  gdpr_status text, owner_id uuid
);
TABLE lists (id uuid pk, name text, created_by uuid);
TABLE list_items (list_id uuid fk, contact_id uuid fk, added_at timestamptz, primary key(list_id, contact_id));
TABLE segments (id uuid pk, name text, query jsonb, owner_id uuid);

-- Campaign/Funnel
TABLE campaigns (id uuid pk, name text, list_id uuid fk, status text, created_at timestamptz);
TABLE sequences (id uuid pk, campaign_id uuid fk, graph jsonb);
TABLE messages (id uuid pk, campaign_id uuid fk, subject text, body_html text, body_text text, template_id uuid,
  sender_mailbox_id uuid, scheduled_at timestamptz, status text);

-- Sending/Infra
TABLE domains (id uuid pk, fqdn text unique, spf_ok bool, dkim_ok bool, dmarc_ok bool);
TABLE mailboxes (id uuid pk, domain_id uuid fk, address citext unique, daily_cap int, warmup bool, reputation int);
TABLE send_log (id uuid pk, message_id uuid fk, contact_id uuid fk, mailbox_id uuid fk, status text, ts timestamptz, smtp_code text);
TABLE bounces (id uuid pk, contact_id uuid fk, reason text, ts timestamptz);

-- Tracking/Analytics
TABLE events (
  id bigserial pk, type text, contact_id uuid, campaign_id uuid,
  metadata jsonb, ts timestamptz, signature text
);
TABLE revenue_attrib (
  id bigserial pk, order_id uuid, contact_id uuid, campaign_id uuid,
  amount_cents int, currency text, ts timestamptz
);

-- Marketplace
TABLE products (id uuid pk, title text, type text, price_cents int, vendor_id uuid);
TABLE orders (id uuid pk, product_id uuid fk, buyer_id uuid, amount_cents int, status text, ts timestamptz);
```

**Eventi standard (tracking)**
- `email.sent`, `email.delivered`, `email.opened`, `email.clicked`, `email.replied`,
- `contact.unsubscribed`, `contact.bounced`, `campaign.started/paused/completed`,
- `order.paid`, `order.refunded`.

---

## 4) Email Infrastructure (MailFlow)
- **Mail server**: **Mailcow (dockerized)** su **VPS Hostinger** con **IP dedicato**.
- **DNS**: SPF include, DKIM per dominio, DMARC policy `p=none/quarantine→reject` progressivo.
- **Warm‑up**: volumi crescenti (es. 25→50→100/die) per casella, seed interni.
- **Rotazione**: multi‑dominio/casella; caps giornalieri (es. 50/die/inbox) controllati dal **Scheduler**.
- **Safety**: blocklist interna, soppressioni (bounces, complaints, unsub) a livello di **contact** e **dominio**.
- **Composer**: MJML→HTML + **Handlebars** (slot dinamici), versione **plain‑text** obbligatoria.

**Flusso invio**
```
Campaign → Sequence Graph → Jobs → Redis Stream → Sender Worker → SMTP (Mailcow)
       ↘ stats ↙                         ↘ feedback (bounces/complaints) ↙
                         Tracking Service (pixel/click) → events
```

---

## 5) Sicurezza, Compliance, Privacy
- **Auth**: JWT short‑lived + refresh httpOnly; rotazione chiavi (JWKS) e clock skew handling.
- **RBAC**: ruoli perimetrati; **ABAC** su risorse (owner_id/tenant_id).
- **GDPR**: base legale, **opt‑out** one‑click, diritto all’oblio (delete/anonymize), registro trattamento.
- **DLP**: hashing email per ambienti di test; mascheramento in log.
- **RLS** su Postgres per tabelle multi‑tenant.
- **Secrets**: .env in vault (doppler/1password), mount read‑only; mai commit.
- **Backups**: snapshot **PG** (giornaliero+WAL), S3 cross‑region; **disaster recovery** runbook.

---

## 6) Observability & Affidabilità
- **Metrics**: Prometheus (exporter per app/DB), Grafana dashboard: deliverability, queue lag, error rate.
- **Logs**: Loki (strutturati JSON), correlazione `request_id`/`job_id`.
- **Tracing**: OpenTelemetry → Jaeger/Tempo.
- **Alerts**: volumi anomali, bounce rate > X%, queue lag > Y, DNS fail, CPU/Mem.
- **SLO**: API p95 < 250ms; delivery loop lag < 60s; uptime 99.5%.

---

## 7) Performance & Scalabilità
- **Horizontal scaling** dei worker (campaign/sender/tracking) via più repliche.
- **Backpressure** con Redis Streams e consumer groups.
- **DB**: indici su email, (campaign_id, ts), GIN su jsonb `events.metadata`.
- **Cache**: chiavi per segmenti caldi; TTL coordinati con invalidation event‑driven.
- **Statici**: CDN per asset e bundle; HTTP/2, compressione brotli.

---

## 8) CI/CD & DevEx
- **Repo**: monorepo (pnpm workspaces) o polyrepo; conventional commits.
- **CI**: GitHub Actions (lint/test/build; prisma migrate; docker build/push).
- **CD**: Deploy con Docker Compose su VPS; opzionale k8s (k3s) con Helm.
- **Preview**: branch‑based previews (Vercel/Netlify per frontend).
- **Qualità**: test unit e integrazione; smoke e2e Playwright (UI critiche: editor, funnel, invio test).

---

## 9) Connettori esterni (oggi/domani)
- **Search**: Serper; future: API LinkedIn partner/Google Custom Search (ove consentito).
- **Email validation**: integrazioni pluggable (TrueMail/etc.).
- **Payments**: Stripe.
- **Analytics**: Webhooks verso terzi; export pianificati (CSV/JSON).

---

## 10) Diagramma Flussi Dati (dettaglio)
```
[Query Builder] → [Scraper Orchestrator] → [Normalizer] → [Validator] → [contacts/lists]
                                                           ↓
                                        [segments] ← [tagger/enricher]
                                                           ↓
                   [campaigns/sequences] → [scheduler] → [queue] → [sender]
                                                           ↓            ↓
                                         [tracking pixel/click] ← [recipient]
                                                           ↓
                                                    [events] → [ETL] → [analytics]
```

---

## 11) Roadmap Tecnica (estratto)
- **Q1**: funnel engine GA (retry/idempotenza), tracking HMAC v2, segmenti dinamici materializzati.
- **Q2**: warehouse ClickHouse, real‑time dashboards, rule‑based lead scoring.
- **Q3**: integrazione Labs standalone + generazione asset AI on‑prem, canali aggiuntivi (SMS/Webhook).

