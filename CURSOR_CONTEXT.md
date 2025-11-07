# 🎯 Context per Cursor - BlueLime Universe Sender

## 📊 Stato Attuale del Progetto

### ✅ Cosa è GIÀ fatto:
- **UI completa** (10 pagine): Dashboard, Campaigns, CRM, Automations, Mailboxes, Analytics, Billing, Settings, Support, Landing
- **Layout system**: Sidebar + Topbar responsive
- **Componenti riusabili**: page-header, stat-card, status-pill
- **Design system**: Verde lime #06FF00, dark theme
- **Tech stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **Docker setup**: Dockerfile + docker-compose.yml pronti per deploy
- **Mock data**: Tutte le pagine hanno dati fittizi placeholder

### ⏳ Cosa DEVE essere implementato (TUO LAVORO):

---

## 🎯 PRIORITÀ 1: Supabase Integration

### Database Schema da creare:

```sql
-- Users & Auth (gestito da Supabase Auth)
-- Extended user profile
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  plan_tier TEXT DEFAULT 'free', -- free, starter, pro, enterprise
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, active, paused, completed
  subject_line TEXT,
  email_body TEXT,
  target_segment TEXT,
  scheduled_at TIMESTAMP,
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  replied_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contacts (CRM)
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  job_title TEXT,
  tags TEXT[], -- array di tag
  status TEXT DEFAULT 'active', -- active, unsubscribed, bounced
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, email)
);

-- Mailboxes (caselle acquistate)
CREATE TABLE mailboxes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  domain TEXT NOT NULL,
  provider TEXT DEFAULT 'mailcow',
  status TEXT DEFAULT 'provisioning', -- provisioning, active, suspended
  daily_limit INTEGER DEFAULT 50,
  warmup_stage INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(email)
);

-- Automations (workflow canvas)
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT, -- form_submit, contact_added, email_opened
  workflow_json JSONB, -- structure del canvas
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- sent, opened, clicked, replied, bounced
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security (RLS) da abilitare:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailboxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;

-- Policies (users can only see their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own campaigns" ON campaigns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own campaigns" ON campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own campaigns" ON campaigns FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own campaigns" ON campaigns FOR DELETE USING (auth.uid() = user_id);

-- Ripeti per contacts, mailboxes, automations...
```

---

## 🎯 PRIORITÀ 2: Sostituire Mock Data con Supabase Queries

### File da modificare:

#### 1. `/sender-ui/src/app/(app)/dashboard/page.tsx`
- Rimpiazza `mockStats` con query Supabase
- Query: conteggi campaigns, contacts, mailboxes, recent analytics

#### 2. `/sender-ui/src/app/(app)/campaigns/page.tsx`
- Rimpiazza `mockCampaigns` con fetch da tabella `campaigns`
- Aggiungi paginazione
- Filtri per status

#### 3. `/sender-ui/src/app/(app)/crm/page.tsx`
- Rimpiazza `mockContacts` con fetch da tabella `contacts`
- Implementa search/filter
- Tag management

#### 4. `/sender-ui/src/app/(app)/mailboxes/page.tsx`
- Fetch da tabella `mailboxes`
- Provisioning status real-time

#### 5. `/sender-ui/src/app/(app)/analytics/page.tsx`
- Aggregazioni da tabella `analytics_events`
- Chart data processing

---

## 🎯 PRIORITÀ 3: Supabase Auth Setup

### Setup necessario:

1. **Layout modifiche** (`/sender-ui/src/app/(app)/layout.tsx`):
   - Check auth status
   - Redirect a /login se non autenticato

2. **Creare pagine auth**:
   - `/sender-ui/src/app/login/page.tsx` - form login con Supabase Auth
   - `/sender-ui/src/app/signup/page.tsx` - form registrazione

3. **Supabase client setup**:
   - `/sender-ui/src/lib/supabase.ts` - client config
   - Environment variables in `.env.local`

---

## 🎯 PRIORITÀ 4: API Routes per operazioni CRUD

### Routes da creare in `/sender-ui/src/app/api/`:

```
/api/campaigns/route.ts      → GET (list), POST (create)
/api/campaigns/[id]/route.ts → GET, PATCH, DELETE
/api/contacts/route.ts       → GET, POST
/api/contacts/[id]/route.ts  → GET, PATCH, DELETE
/api/mailboxes/route.ts      → GET, POST (provision)
/api/automations/route.ts    → GET, POST
```

Ogni route deve:
- Verificare auth (JWT)
- Applicare RLS
- Validare input
- Gestire errori

---

## 🎯 PRIORITÀ 5 (OPZIONALE): Stripe Integration

### Setup Billing:

1. Creare prodotti Stripe (Free, Starter, Pro, Enterprise)
2. Webhook handler: `/api/webhooks/stripe`
3. Modificare `/sender-ui/src/app/(app)/billing/page.tsx`:
   - Mostra piano corrente da `profiles.plan_tier`
   - Button upgrade con Stripe Checkout
4. Customer Portal link

---

## 📁 Struttura File Progetto

```
/workspaces/sender/
├── sender-ui/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/          # Protected routes
│   │   │   │   ├── dashboard/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── crm/
│   │   │   │   ├── mailboxes/
│   │   │   │   ├── automations/
│   │   │   │   ├── analytics/
│   │   │   │   ├── billing/
│   │   │   │   ├── settings/
│   │   │   │   └── support/
│   │   │   ├── api/            # Crea qui le API routes
│   │   │   ├── login/          # Da creare
│   │   │   ├── signup/         # Da creare
│   │   │   └── page.tsx        # Landing page
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   └── lib/
│   │       ├── supabase.ts     # Da creare
│   │       └── utils.ts
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
```

---

## 🔧 Environment Variables Necessarie

Crea `/sender-ui/.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe (opzionale)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=https://bluelimeuniverse.com
```

---

## 🚀 Checklist Implementazione

### Phase 1: Setup Base
- [ ] Creare progetto Supabase
- [ ] Creare schema database (tabelle + RLS)
- [ ] Setup Supabase client in `/src/lib/supabase.ts`
- [ ] Aggiungere env variables

### Phase 2: Auth
- [ ] Creare `/app/login/page.tsx`
- [ ] Creare `/app/signup/page.tsx`
- [ ] Proteggere layout app con auth check
- [ ] Logout functionality

### Phase 3: Dashboard Data
- [ ] Sostituire mock in dashboard con query Supabase
- [ ] Implementare fetching stats reali

### Phase 4: Campaigns
- [ ] API routes CRUD campaigns
- [ ] Sostituire mock campaigns
- [ ] Form creazione campagna
- [ ] Update/Delete campaigns

### Phase 5: CRM
- [ ] API routes CRUD contacts
- [ ] Import CSV contacts
- [ ] Tag management
- [ ] Search/Filter

### Phase 6: Mailboxes
- [ ] API provisioning mailbox
- [ ] Status tracking
- [ ] Integrazione Mailcow (placeholder API)

### Phase 7: Analytics
- [ ] Events tracking system
- [ ] Aggregazioni e charts
- [ ] Real-time updates

### Phase 8: Billing (opzionale)
- [ ] Setup Stripe products
- [ ] Checkout flow
- [ ] Webhook handler
- [ ] Customer portal

---

## 💡 Tips per Cursor

### Comandi utili in Cursor Chat:

```
"Crea lo schema Supabase con tutte le tabelle e RLS"

"Implementa Supabase client in /src/lib/supabase.ts"

"Sostituisci i mock data in dashboard/page.tsx con query Supabase reali"

"Crea API route per CRUD operations su campaigns"

"Implementa auth con Supabase in layout.tsx e crea pagine login/signup"

"Aggiungi form per creare nuova campaign con validazione"
```

### Pattern da seguire:
- Usa `'use client'` per componenti con interattività
- Usa Server Components per fetch dati quando possibile
- Gestisci loading states
- Gestisci errori con try/catch
- TypeScript strict mode

---

## 🎨 Design System (da mantenere)

- **Colore primario**: `#06FF00` (lime green)
- **Background**: `#0A0A0A` (dark)
- **Typography**: Font system di Tailwind
- **Spacing**: Tailwind spacing scale
- **Components**: Mantieni stile esistente

---

## 🔗 Link Utili

- Supabase Docs: https://supabase.com/docs
- Next.js App Router: https://nextjs.org/docs/app
- Tailwind CSS: https://tailwindcss.com/docs

---

## ⚠️ Note Importanti

1. **NON modificare** il design/UI esistente (colori, layout, componenti)
2. **Mantieni** la struttura file corrente
3. **Testa** ogni feature prima di committare
4. **Usa TypeScript** per type safety
5. **Commit frequenti** con messaggi chiari

---

## 🎯 Obiettivo Finale

Avere un'applicazione **funzionante** con:
- Auth completa
- Dati reali da Supabase
- CRUD operations su tutte le entità
- Dashboard con metriche reali
- Deploy pronto su VPS Hostinger

---

**Branch**: `copilot-english-version`
**Repo**: `https://github.com/smartlemonnet/sender`
