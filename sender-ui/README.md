# Sender UI – Interfaccia MVP

Frontend statico per il modulo cold email marketing della suite Bluelime Universe. Questa build fornisce tutte le schermate principali (solo UI) pronte per l’integrazione di Supabase, Mailcow e servizi di billing.

## Setup rapido

```bash
npm install
npm run dev # avvia in locale su http://localhost:3000
npm run lint # verifica ESLint/TypeScript
npm run build && npm run start # simulazione produzione
```

## Come Copiare Sender

Per creare una copia di questa istanza di Sender:

```bash
# Rendi eseguibile lo script (solo la prima volta)
chmod +x copy-sender.sh

# Crea una copia
./copy-sender.sh nome-nuova-istanza
```

Per dettagli completi, consulta [COPIA-SENDER.md](./COPIA-SENDER.md).

## Mappa delle schermate

| Rotta | Descrizione |
| --- | --- |
| `/` | Sign-in esperienziale con storytelling brand |
| `/dashboard` | KPI principali, campagne attive, deliverability, pipeline CRM |
| `/campaigns` | Elenco campagne, filtri, editor & workflow highlight |
| `/automations` | Canvas drag & drop (mock nodi) + blueprint scenario |
| `/crm` | Rubrica contatti, segmenti dinamici, timeline attività |
| `/mailboxes` | Gestione caselle/domìni, provisioning guidato, cluster OVH |
| `/analytics` | Statistiche deliverability, attribution, funnel |
| `/settings` | Workspace, notifiche, API keys, sicurezza |
| `/billing` | Piani, usage, metodi pagamento, add-on |
| `/support` | Help center, ticket enterprise, canali diretti |

> Tutti i dataset sono mock: vedere i commenti `TODO` per i collegamenti a Supabase/Mailcow/Stripe.

## Struttura principale

- `src/app/(app)/**`: pagine applicative condividono lo shell (`AppShell`) con sidebar + topbar responsive.
- `src/components/layout`: shell, sidebar, topbar.
- `src/components/ui`: componenti riutilizzabili (`PageHeader`, `StatCard`, `StatusPill`).
- `src/lib/utils.ts`: helper per classi (`cn`).
- `globals.css`: palette, gradienti e classi glass/frosted.

## Prossimi passi integrazione

1. **Supabase**
   - Configurare schema (workspace, users, campaigns, automations, contacts, mailboxes, billing).
   - Sostituire mock con fetch `server actions` o `use` + `React Suspense`.
   - Impostare RLS multi-tenant e funzioni per usage/billing.
2. **Mailcow / VPS OVH**
   - Creare API wrapper per warm-up status, provisioning e log deliverability.
   - Agganciare notifiche e componenti `Deliverability` / `Mailboxes`.
3. **Automazioni & Job Queue**
   - Definire modello nodi/edge (Supabase JSONB + worker BullMQ/Redis).
   - Tradurre canvas in dati reali con drag & drop (es. React Flow) quando si implementa la logica.
4. **Billing**
   - Connettere Stripe/PayPal per piani, add-on e usage-based.
   - Generare invoice via webhook e aggiornare vista `billing`.
5. **Design System**
   - Estrarre componenti in libreria condivisa della suite Bluelime (buttons, cards, form controls).

## Note design

- Palette chiara con accenti blu/indaco; background gradient + cards glass effect.
- Sidebar responsive (drawer mobile), topbar sticky con search globale.
- Tutti gli elementi interattivi hanno hover/focus states e copy orientato al cold outreach.
- Inclusi placeholder per compliance e infrastruttura OVH.

Per domande sulla prossima fase (supabase schema, orchestrazione job, integrazione Mailcow) vedere il documento principale in `/workspace/README.md` o aprire un ticket interno.
