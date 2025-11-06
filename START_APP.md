# 🚀 Come Avviare l'App Sender

## ✅ Setup Completato

- ✅ File `.env` creato
- ✅ Dipendenze backend installate
- ✅ Dipendenze frontend installate

## 📋 Prerequisiti

### 1. MongoDB
L'app richiede MongoDB. Hai 2 opzioni:

**Opzione A: MongoDB Locale**
```bash
# Installa MongoDB (se non installato)
# Ubuntu/Debian:
sudo apt-get install -y mongodb

# macOS:
brew install mongodb-community

# Avvia MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

**Opzione B: MongoDB Atlas (Cloud - Gratuito)**
1. Vai su https://www.mongodb.com/cloud/atlas
2. Crea un account gratuito
3. Crea un cluster gratuito
4. Ottieni la stringa di connessione
5. Sostituisci in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sender
   ```

### 2. Stripe (Opzionale - per pagamenti)
1. Vai su https://stripe.com
2. Crea un account
3. Ottieni le chiavi di test da Dashboard
4. Aggiorna in `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_tua_chiave_segreta
   STRIPE_PUBLIC_KEY=pk_test_tua_chiave_pubblica
   ```

## 🎯 Avvio Applicazione

### Metodo 1: Avvio Separato (Consigliato per sviluppo)

**Terminale 1 - Backend:**
```bash
cd /workspace
npm start
```
Il backend sarà disponibile su: http://localhost:5000

**Terminale 2 - Frontend:**
```bash
cd /workspace/client
npm run dev
```
Il frontend sarà disponibile su: http://localhost:5173 (o porta indicata)

### Metodo 2: Avvio Simultaneo
```bash
cd /workspace
npm run dev:full
```
Avvia sia backend che frontend insieme (richiede `concurrently` installato).

## 🗄️ Popolare il Database (Opzionale)

Per creare pacchetti email di esempio:
```bash
npm run seed
```

## 🔧 Configurazione Email

Per usare la funzionalità email:

1. **Gmail** (consigliato per test):
   - Vai su https://myaccount.google.com/apppasswords
   - Abilita la verifica in 2 passaggi
   - Genera una "App Password"
   - Usa quella password nell'app (non la tua password normale)

2. **Altri provider**:
   - Configura SMTP/IMAP nell'app nella sezione Settings

## 📱 Struttura App

- **Backend API**: `http://localhost:5000/api`
  - `/api/auth/*` - Autenticazione
  - `/api/email/*` - Gestione email
  - `/api/shop/*` - Shop e acquisti

- **Frontend**: `http://localhost:5173`
  - Home page
  - Login/Register
  - Dashboard email
  - Shop

## 🐛 Troubleshooting

### Errore: "Cannot connect to MongoDB"
- Verifica che MongoDB sia in esecuzione
- Controlla la stringa di connessione in `.env`

### Errore: "Port already in use"
- Cambia la porta in `.env`: `PORT=5001`
- O ferma il processo sulla porta 5000: `lsof -ti:5000 | xargs kill`

### Errore Stripe
- Se non serve subito, puoi lasciare le chiavi di test fake
- La funzionalità di pagamento non funzionerà ma il resto dell'app sì

## 📚 Documentazione

- `README.md` - Documentazione completa
- `API.md` - Documentazione API
- `SECURITY.md` - Note sulla sicurezza
- `PROJECT_OVERVIEW.md` - Panoramica progetto

## 🎉 Buon Sviluppo!

Hai recuperato completamente la tua app. Ora puoi continuare a svilupparla!
