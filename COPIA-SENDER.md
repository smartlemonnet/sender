# Guida: Come Copiare Sender

Questa guida spiega come creare copie dell'applicazione Sender per diversi ambienti o istanze.

## Metodo 1: Script Automatico

Utilizza lo script `copy-sender.sh` per creare rapidamente una copia:

```bash
# Rendi eseguibile lo script (solo la prima volta)
chmod +x copy-sender.sh

# Crea una copia
./copy-sender.sh nome-nuova-istanza
```

Lo script:
- Copia tutti i file da `sender-ui` alla nuova directory
- Rimuove automaticamente file sensibili (.env, .env.local, ecc.)
- Aggiorna automaticamente `package.json` con il nuovo nome
- Aggiorna il README con riferimenti al nuovo nome
- Valida il nome per prevenire problemi di sicurezza

**Nota di sicurezza**: Il nome può contenere solo lettere, numeri, trattini (-) e underscore (_).

Dopo aver eseguito lo script:

```bash
cd nome-nuova-istanza
npm install
npm run dev
```

## Metodo 2: Copia Manuale

Se preferisci copiare manualmente:

### 1. Copia la directory

```bash
cp -r sender-ui sender-ui-copy
```

### 2. Aggiorna il package.json

Modifica `sender-ui-copy/package.json` e cambia il nome:

```json
{
  "name": "sender-ui-copy",
  ...
}
```

### 3. Installa le dipendenze

```bash
cd sender-ui-copy
npm install
```

### 4. Avvia l'applicazione

```bash
npm run dev
```

## Casi d'Uso

### Ambiente di Sviluppo Separato

Crea una copia per testare modifiche senza influenzare l'istanza principale:

```bash
./copy-sender.sh sender-ui-dev
```

### Deployment su Server Diversi

Crea copie per ambienti diversi (staging, produzione):

```bash
./copy-sender.sh sender-ui-staging
./copy-sender.sh sender-ui-production
```

### Template per Nuovi Progetti

Usa Sender come template per nuovi progetti simili:

```bash
./copy-sender.sh nuovo-progetto-email
```

## Personalizzazione Post-Copia

Dopo aver creato una copia, considera di personalizzare:

1. **Titolo e Metadata** (`src/app/layout.tsx`)
2. **Colori e Branding** (`src/app/globals.css`)
3. **Configurazione** (variabili d'ambiente, `.env.local`)
4. **Database** (configurazione Supabase separata se necessario)

## Backup

Per creare un backup completo:

```bash
tar -czf sender-backup-$(date +%Y%m%d).tar.gz sender-ui/
```

Per ripristinare:

```bash
tar -xzf sender-backup-YYYYMMDD.tar.gz
```

## Note Importanti

- **Node Modules**: Le copie non includono `node_modules` (esegui `npm install`)
- **Build Artifacts**: Le copie non includono `.next` (esegui `npm run build`)
- **File Sensibili**: Lo script rimuove automaticamente file `.env` e varianti, ma verifica sempre la copia
- **Git History**: Le copie non includono la storia git (usa `git clone` per quello)
- **Validazione Nome**: Il nome può contenere solo lettere, numeri, trattini (-) e underscore (_)

## Troubleshooting

### Errore: Directory già esistente

Se vedi questo errore, la directory di destinazione esiste già. Scegli un nome diverso o rimuovi la directory esistente.

### Errore: Permessi negati

Assicurati che lo script sia eseguibile:

```bash
chmod +x copy-sender.sh
```

### Problemi con npm install

Se `npm install` fallisce, prova:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Prossimi Passi

Dopo aver creato una copia, consulta la documentazione principale:
- `/README.md` - Panoramica del progetto
- `/sender-ui/README.md` - Documentazione specifica dell'UI

Per domande o supporto, apri un issue nel repository.
