# Sender – MVP UI Scope

Questa iterazione riguarda **solo la progettazione dell'interfaccia (frontend statico)** del modulo cold email marketing. Le funzionalità saranno collegate successivamente.

## Mappa delle schermate MVP
- **Auth & Onboarding**: login/signup, selezione piano iniziale, wizard di configurazione dominio.
- **Dashboard**: metriche principali (email inviate, aperture, reply, deliverability) e shortcut verso campagne/CRM/automazioni.
- **Campaigns**: elenco campagne, nuova campagna con editor drag & drop email (placeholder) e setup invio.
- **Automations Canvas**: interfaccia visuale con nodi drag & drop per creare flussi (solo UI, senza logica).
- **CRM**: liste contatti, dettagli contatto, tag/segmenti, pipeline semplice.
- **Mailboxes**: gestione caselle acquistabili, stato provisioning, collegamento a Mailcow (placeholder).
- **Analytics & Reports**: viste tabellari/grafiche per performance invii e deliverability.
- **Billing & Plans**: scelta piano, limiti, gestione metodi pagamento (placeholder Stripe).
- **Settings**: profilo utente, domini, chiavi API, preferenze integrazione Bluelime suite.

## Obiettivi di progettazione
- UI moderna, elegante e coerente con il design system Bluelime.
- Layout responsive (desktop prioritario, mobile considerato per viste principali).
- Componenti riutilizzabili (dashboard cards, tabelle, modali, sidebar, topbar).
- Segnaposto evidenti per future integrazioni Supabase/Mailcow/Stripe.

## Prossimi step
1. Bootstrappare progetto frontend (Next.js + Tailwind + shadcn/ui).
2. Implementare layout generale (sidebar, header, breadcrumb, shell).
3. Popolare schermate chiave con dati fittizi e stati vuoti.
4. Documentare collegamenti futuri verso backend/Supabase.

## Copia di Sender

Per creare una copia dell'applicazione Sender (per ambienti diversi, backup, o template):

```bash
# Rendi eseguibile lo script (solo la prima volta)
chmod +x copy-sender.sh

# Crea una copia
./copy-sender.sh nome-nuova-istanza
```

Consulta [COPIA-SENDER.md](./COPIA-SENDER.md) per la guida completa sulla copia e il deployment.

## Stato attuale (Nov 2025)
- ✅ Progetto Next.js creato (`/sender-ui`) con layout completo e tutte le schermate MVP.
- ✅ Dati mock e placeholder `TODO` per collegamenti Supabase/Mailcow/Stripe.
- ✅ Documentazione aggiornata in `sender-ui/README.md` con mappa rotte e roadmap integrazioni.
- ✅ Script e documentazione per creare copie dell'applicazione (`copy-sender.sh`, `COPIA-SENDER.md`).
- ⏳ Fase successiva: modellare schema Supabase e sostituire i mock con query reali + servizi backend.
